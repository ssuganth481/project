from groq import Groq
import json
import re
import os
import time
import random
import requests
import textwrap
import threading
from dotenv import load_dotenv

from prompts import build_content_prompt, build_hook_prompt

from PIL import Image, ImageDraw, ImageFont
from moviepy import ImageClip, concatenate_videoclips, AudioFileClip

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
CACHE_DIR = os.path.join(BASE_DIR, "cache_images")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(CACHE_DIR, exist_ok=True)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

# import Gemini generator
try:
    from gemini import generate_ai_gemini
except Exception as e:
    print("Gemini import failed:", e)
    generate_ai_gemini = None


POST_SIZES = {
    '1:1':  (1080, 1080),
    '4:5':  (1080, 1350),
    '16:9': (1080, 608),
}

REEL_SIZES = {
    '9:16': (720, 1280),
    '4:5':  (720, 900),
}

PEXELS_ORIENTATION = {
    '1:1':  'square',
    '4:5':  'portrait',
    '16:9': 'landscape',
    '9:16': 'portrait',
}


def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(match.group())
    except:
        return None


def generate_pollinations_image(prompt, filename, size=(1080, 1080)):
    path = os.path.join(CACHE_DIR, filename)
    enhanced = f"{prompt}, high quality, professional photography, Instagram style, 4k, vibrant colors"
    encoded = requests.utils.quote(enhanced)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={size[0]}&height={size[1]}&nologo=true&enhance=true"
    try:
        res = requests.get(url, timeout=60)
        if res.status_code == 200 and len(res.content) > 10000:
            with open(path, "wb") as f:
                f.write(res.content)
            img = Image.open(path)
            img.verify()
            # reopen after verify to confirm it's a real image
            img = Image.open(path).convert("RGB")
            if img.size[0] > 100 and img.size[1] > 100:
                return path
    except Exception as e:
        print("Pollinations error:", e)
    return None


def generate_hooks(topic):
    prompt = build_hook_prompt(topic)
    for model in ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"]:
        for attempt in range(3):
            try:
                response = client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.9
                )
                return extract_json(response.choices[0].message.content)
            except Exception as e:
                time.sleep(min(30, (attempt + 1) * 3 + random.uniform(1, 2)))
    return None


def fetch_image(topic, name, orientation="square", image_prompt=None):
    path = os.path.join(CACHE_DIR, name)
    # use AI-generated image_prompt if available, else fall back to topic
    search_base = image_prompt if image_prompt else topic
    short = " ".join(search_base.split()[:5])
    queries = [short, f"{short} professional", " ".join(topic.split()[:3])]

    for query in queries:
        try:
            headers = {"Authorization": PEXELS_API_KEY}
            page = random.randint(1, 3)
            res = requests.get(
                f"https://api.pexels.com/v1/search?query={query}&per_page=15&page={page}&orientation={orientation}",
                headers=headers, timeout=10
            )
            photos = res.json().get("photos", [])
            if not photos:
                continue

            random.shuffle(photos)
            photo = photos[0]
            img_url = photo["src"]["large2x"]

            img_res = requests.get(img_url, timeout=15)
            if img_res.status_code == 200:
                with open(path, "wb") as f:
                    f.write(img_res.content)
                Image.open(path).verify()
                return path
        except:
            continue

    return None


def generate_ai(topic, ctype, tone="Professional", brand_name="", niche="", target_audience="", posting_goal="", page_description=""):
    prompt = build_content_prompt(topic, ctype, tone, brand_name, niche, target_audience, posting_goal, page_description)
    models = ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"]

    for model in models:
        for attempt in range(5):
            try:
                response = client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=random.uniform(0.7, 1.0)
                )
                return extract_json(response.choices[0].message.content)
            except Exception as e:
                wait = min(60, (attempt + 1) * 5 + random.uniform(1, 3))
                time.sleep(wait)

    return None


def draw_wrapped_text(draw, text, x, y, font, fill, max_width, line_spacing=10):
    lines = textwrap.wrap(text, width=max_width)
    for line in lines:
        draw.text((x + 2, y + 2), line, fill=(0, 0, 0), font=font)
        draw.text((x, y), line, fill=fill, font=font)
        bbox = font.getbbox(line) if hasattr(font, 'getbbox') else (0, 0, 0, 40)
        y += (bbox[3] - bbox[1]) + line_spacing
    return y


def strip_hashtags(text):
    return re.sub(r'#\w+', '', text).strip()


def get_text_params(W, H):
    hook_size = max(28, int(W * 0.048))  # slightly smaller for better fit
    body_size = max(24, int(W * 0.032))
    if H < W:  # landscape
        hook_size = max(24, int(H * 0.08))
        body_size = max(16, int(H * 0.05))
    # chars per line based on avg char width ~0.5 * font_size
    hook_max_width = max(15, int((W - 80) / (hook_size * 0.5)))
    body_max_width = max(20, int((W - 80) / (body_size * 0.48)))
    text_start_y = int(H * 0.45) if H < W else int(H * 0.65)
    return hook_size, body_size, hook_max_width, body_max_width, text_start_y


def apply_text(draw, data, W, H, font_hook, font_body, hook_max_width, body_max_width, text_start_y):
    hook = strip_hashtags(str(data.get("hook", "")))
    content = strip_hashtags(str(data.get("content", "")))
    max_text_bottom = int(H * 0.95)
    y = draw_wrapped_text(draw, hook, 40, text_start_y, font_hook, (255, 255, 255), max_width=hook_max_width, line_spacing=6)
    if y < max_text_bottom:
        draw_wrapped_text(draw, content, 40, y + 8, font_body, (220, 220, 220), max_width=body_max_width, line_spacing=4)


def create_post(data, topic, aspect_ratio='1:1'):
    W, H = POST_SIZES.get(aspect_ratio, (1080, 1080))
    orientation = PEXELS_ORIENTATION.get(aspect_ratio, 'square')
    image_prompt = data.get('image_prompt', None)

    img_path = fetch_image(topic, f"post_{random.randint(1000,9999)}.jpg", orientation, image_prompt)
    if img_path:
        bg = Image.open(img_path).resize((W, H)).convert("RGB")
    else:
        bg = Image.new("RGB", (W, H), (20, 20, 20))
        bd = ImageDraw.Draw(bg)
        colors = [(255, 80, 80), (255, 140, 0), (80, 200, 120), (0, 150, 255), (180, 0, 255)]
        step = W // len(colors)
        for i, c in enumerate(colors):
            bd.rectangle([i * step, 0, (i + 1) * step, H], fill=c)

    gradient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gradient)
    for y in range(H):
        alpha = int(max(0, (y - H * 0.3) / (H * 0.7)) * 240)
        gd.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    bg = Image.alpha_composite(bg.convert("RGBA"), gradient).convert("RGB")

    draw = ImageDraw.Draw(bg)

    # scale font sizes relative to image size
    hook_size, body_size, hook_max_width, body_max_width, text_start_y = get_text_params(W, H)
    try:
        font_hook = ImageFont.truetype("arialbd.ttf", hook_size)
        font_body = ImageFont.truetype("arial.ttf", body_size)
    except:
        font_hook = font_body = ImageFont.load_default()

    # gradient top bar
    bar = Image.new("RGB", (W, 7))
    bd2 = ImageDraw.Draw(bar)
    for x in range(W):
        r = int(255 + (193 - 255) * x / W)
        g = int(0 + (53 - 0) * x / W)
        b = int(128 + (132 - 128) * x / W)
        bd2.line([(x, 0), (x, 7)], fill=(r, g, b))
    bg.paste(bar, (0, 0))

    hook = strip_hashtags(str(data.get("hook", "")))
    content = strip_hashtags(str(data.get("content", "")))

    # draw brand text at top
    brand_text = data.get("brand_text", "")
    if brand_text:
        try:
            font_brand = ImageFont.truetype("arialbd.ttf", max(18, int(W * 0.022)))
        except:
            font_brand = ImageFont.load_default()
        draw.text((40, 20), brand_text.upper(), fill=(255, 255, 255, 200), font=font_brand)

    # start text at 45% for landscape, 68% for portrait/square
    max_text_bottom = int(H * 0.95)
    y = draw_wrapped_text(draw, hook, 40, text_start_y, font_hook, (255, 255, 255), max_width=hook_max_width, line_spacing=6)
    if y < max_text_bottom:
        draw_wrapped_text(draw, content, 40, y + 8, font_body, (220, 220, 220), max_width=body_max_width, line_spacing=4)

    import time as _time
    path = os.path.join(OUTPUT_DIR, f"post_{int(_time.time())}.png")
    bg.save(path)
    return path


def create_pollinations_post(data, topic, aspect_ratio='1:1'):
    W, H = POST_SIZES.get(aspect_ratio, (1080, 1080))
    image_prompt = data.get('image_prompt', None)
    ai_prompt = image_prompt if image_prompt else f"{topic}, social media post"
    img_path = generate_pollinations_image(ai_prompt, f"poll_post_{random.randint(1000,9999)}.jpg", (W, H))

    if img_path and os.path.exists(img_path):
        bg = Image.open(img_path).resize((W, H)).convert("RGB")
    else:
        bg = Image.new("RGB", (W, H), (15, 15, 35))
        bd = ImageDraw.Draw(bg)
        for y in range(H):
            alpha = int(y / H * 60)
            bd.line([(0, y), (W, y)], fill=(20 + alpha, 10 + alpha//2, 50 + alpha))

    gradient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gradient)
    for y in range(H):
        alpha = int(max(0, (y - H * 0.3) / (H * 0.7)) * 240)
        gd.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    bg = Image.alpha_composite(bg.convert("RGBA"), gradient).convert("RGB")
    draw = ImageDraw.Draw(bg)

    hook_size, body_size, hook_max_width, body_max_width, text_start_y = get_text_params(W, H)
    try:
        font_hook = ImageFont.truetype("arialbd.ttf", hook_size)
        font_body = ImageFont.truetype("arial.ttf", body_size)
    except:
        font_hook = font_body = ImageFont.load_default()

    bar = Image.new("RGB", (W, 7))
    bd2 = ImageDraw.Draw(bar)
    for x in range(W):
        r = int(255 + (193 - 255) * x / W)
        g = int(0 + (53 - 0) * x / W)
        b = int(128 + (132 - 128) * x / W)
        bd2.line([(x, 0), (x, 7)], fill=(r, g, b))
    bg.paste(bar, (0, 0))

    apply_text(draw, data, W, H, font_hook, font_body, hook_max_width, body_max_width, text_start_y)

    # draw brand text
    brand_text = data.get("brand_text", "")
    if brand_text:
        try:
            font_brand = ImageFont.truetype("arialbd.ttf", max(18, int(W * 0.022)))
        except:
            font_brand = ImageFont.load_default()
        draw.text((40, 20), brand_text.upper(), fill=(255, 255, 255, 200), font=font_brand)

    import time as _time
    path = os.path.join(OUTPUT_DIR, f"post_b_{int(_time.time())}.png")
    bg.save(path)
    return path


def create_reel(data, topic, aspect_ratio='9:16'):
    W, H = REEL_SIZES.get(aspect_ratio, (720, 1280))
    orientation = PEXELS_ORIENTATION.get(aspect_ratio, 'portrait')

    scenes = data.get("scenes", [])
    if not scenes:
        content = str(data.get("content", ""))
        scenes = [s.strip() for s in content.split(".") if s.strip()][:3]

    # build gradient once and reuse
    gradient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gradient)
    for y in range(H):
        alpha = int(max(0, (y - H * 0.4) / (H * 0.6)) * 200)
        gd.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))

    try:
        font_scene = ImageFont.truetype("arialbd.ttf", 52)
        font_hook = ImageFont.truetype("arial.ttf", 32)
    except:
        font_scene = font_hook = ImageFont.load_default()

    clips = []

    for i, scene_text in enumerate(scenes):
        img_path = fetch_image(topic, f"scene_{i}.jpg", orientation)

        if img_path:
            img = Image.open(img_path).resize((W, H)).convert("RGB")
        else:
            img = Image.new("RGB", (W, H), (10, 10, 10))

        img = Image.alpha_composite(img.convert("RGBA"), gradient).convert("RGB")
        draw = ImageDraw.Draw(img)

        draw.text((32, H // 2 - 90), f"{i+1}.", fill=(249, 83, 198), font=font_scene)
        draw_wrapped_text(draw, scene_text, 30, H // 2 - 30, font_scene, (255, 255, 255), max_width=24, line_spacing=8)

        if i == len(scenes) - 1:
            hook = data.get("hook", "")
            draw_wrapped_text(draw, hook, 30, H - 220, font_hook, (255, 230, 0), max_width=38, line_spacing=6)

        file = os.path.join(OUTPUT_DIR, f"scene_{i}.jpg")  # jpg is faster to write than png
        img.save(file, quality=88)

        clip = ImageClip(file).with_duration(3)  # 3s per scene instead of 4s
        clips.append(clip)

    video = concatenate_videoclips(clips, method="compose")

    bgm_path = os.path.join(BASE_DIR, "bg.mp3")
    try:
        if os.path.exists(bgm_path):
            audio = AudioFileClip(bgm_path).with_duration(video.duration).with_volume_scaled(0.4)
            video = video.with_audio(audio)
    except Exception as e:
        print("BGM skipped:", e)

    import time as _time
    path = os.path.join(OUTPUT_DIR, f"reel_{int(_time.time())}.mp4")
    video.write_videofile(
        path,
        fps=24,                          # 24fps instead of 30
        codec="libx264",
        audio_codec="aac",
        preset="ultrafast",              # fastest encoding preset
        ffmpeg_params=["-crf", "28"],    # slightly lower quality = much faster
        threads=4,                       # use multiple CPU threads
        logger=None                      # suppress verbose output
    )
    return path


def generate_content(topic, content_type, tone="Professional", aspect_ratio=None, context=None, brand_name="", niche="", target_audience="", posting_goal="", page_description=""):
    full_topic = f"{topic} - {context}" if context else topic

    # Version A — Groq
    data_a = generate_ai(full_topic, content_type, tone, brand_name, niche, target_audience, posting_goal, page_description)
    if not data_a:
        return None, None, None, None

    # Version B — Gemini with fallback to Groq
    data_b = None
    if generate_ai_gemini:
        data_b, fallback = generate_ai_gemini(full_topic, content_type, tone, brand_name, niche, target_audience, posting_goal)
        if fallback or not data_b:
            print("Gemini failed, falling back to Groq for Version B")
            data_b = generate_ai(full_topic, content_type, tone, brand_name, niche, target_audience, posting_goal)
    if not data_b:
        data_b = data_a  # last resort

    if content_type == "reel":
        file_path = create_reel(data_a, full_topic, aspect_ratio or '9:16')
        return data_a, file_path, None, None

    # run both post versions in parallel
    result_a = {}
    result_b = {}

    def run_a():
        result_a['path'] = create_post(data_a, full_topic, aspect_ratio or '1:1')

    def run_b():
        result_b['path'] = create_pollinations_post(data_b, full_topic, aspect_ratio or '1:1')

    t_a = threading.Thread(target=run_a)
    t_b = threading.Thread(target=run_b)
    t_a.start()
    t_b.start()
    t_a.join()
    t_b.join()

    return data_a, result_a.get('path'), result_b.get('path'), data_b
