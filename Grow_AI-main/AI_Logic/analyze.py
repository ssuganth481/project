import base64
import json
import re
import os
import time
import random
from groq import Groq
from dotenv import load_dotenv

from prompts import build_analyze_screenshot_prompt, build_insights_prompt

load_dotenv()

API_KEYS = [
    os.getenv("GROQ_API_KEY_1"),
    os.getenv("GROQ_API_KEY_2"),
    os.getenv("GROQ_API_KEY_3"),
    os.getenv("GROQ_API_KEY_4"),
    os.getenv("GROQ_API_KEY_5"),
]

current_key_index = 0


def get_client():
    return Groq(api_key=API_KEYS[current_key_index])


def rotate_key():
    global current_key_index
    current_key_index = (current_key_index + 1) % len(API_KEYS)
    print(f"🔄 Switching to API key {current_key_index + 1}")


def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(match.group())
    except:
        return None


def analyze_screenshot(image_path):
    try:
        with open(image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode("utf-8")

        ext = image_path.split(".")[-1].lower()
        mime = "image/png" if ext == "png" else "image/jpeg"
        prompt = build_analyze_screenshot_prompt()

        client = get_client()
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{image_data}"}}
                ]
            }]
        )
        return extract_json(response.choices[0].message.content)

    except Exception as e:
        print("⚠️ Screenshot analysis error:", e)
        rotate_key()
        return None


def analyze_insights_screenshot(image_path):
    try:
        with open(image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode("utf-8")

        ext = image_path.split(".")[-1].lower()
        mime = "image/png" if ext == "png" else "image/jpeg"
        prompt = build_insights_prompt()

        client = get_client()
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{image_data}"}}
                ]
            }]
        )
        return extract_json(response.choices[0].message.content)

    except Exception as e:
        print("⚠️ Insights analysis error:", e)
        rotate_key()
        return None
