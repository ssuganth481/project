from google import genai
import json
import re
import os
from dotenv import load_dotenv

from prompts import build_content_prompt, build_page_analysis_prompt

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)


def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(match.group())
    except:
        return None


def generate_ai_gemini(topic, ctype, tone="Professional", brand_name="", niche="", target_audience="", posting_goal=""):
    prompt = build_content_prompt(topic, ctype, tone, brand_name, niche, target_audience, posting_goal)
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        result = extract_json(response.text)
        if result:
            return result, False
    except Exception as e:
        print(f"Gemini error: {e}")
    return None, True


def analyze_instagram_page(url):
    prompt = build_page_analysis_prompt(url)
    # try gemini-2.0-flash first, then gemini-1.5-flash
    for model in ["gemini-2.0-flash", "gemini-1.5-flash"]:
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt
            )
            result = extract_json(response.text)
            if result:
                return result
        except Exception as e:
            print(f"Gemini {model} page analysis error: {e}")
            continue
    return None
