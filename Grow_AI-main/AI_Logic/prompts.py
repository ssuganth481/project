def build_page_analysis_prompt(url):
    return f"""
You are an expert Instagram growth strategist.

Analyze this Instagram account: {url}

Return ONLY valid JSON. No explanation. No markdown.

Format:
{{
  "account_name": "name of the account",
  "about": "what this account is about in 2-3 sentences",
  "content_type": "what kind of content they post",
  "target_audience": "who their audience is",
  "niche": "their content niche",
  "tone": "their content tone (professional/casual/funny etc)",
  "content_ideas": [
    "content idea 1",
    "content idea 2",
    "content idea 3",
    "content idea 4",
    "content idea 5"
  ],
  "recommended_post_types": "what types of posts would work best for this account",
  "growth_suggestion": "one key suggestion to grow this account"
}}

Rules:
- Be specific based on what you know about this account
- If you don't know the account, analyze based on the URL username
- content_ideas must be specific and actionable
- Keep all responses concise and practical
"""


def build_hook_prompt(topic):
    return f"""
You are a viral Instagram content creator.

Generate 10 different viral hooks for the topic: "{topic}"

Return ONLY valid JSON. No explanation. No markdown.

Format:
{{
  "hooks": [
    {{"style": "Question", "hook": "hook text here"}},
    {{"style": "Shocking Fact", "hook": "hook text here"}},
    {{"style": "Motivational", "hook": "hook text here"}},
    {{"style": "Storytelling", "hook": "hook text here"}},
    {{"style": "Funny", "hook": "hook text here"}},
    {{"style": "Challenge", "hook": "hook text here"}},
    {{"style": "Controversial", "hook": "hook text here"}},
    {{"style": "How To", "hook": "hook text here"}},
    {{"style": "List", "hook": "hook text here"}},
    {{"style": "Emotional", "hook": "hook text here"}}
  ]
}}

Rules:
- each hook must be scroll-stopping and under 15 words
- make them punchy, bold and attention grabbing
- keep all hooks related to: {topic}
"""


def build_insights_prompt():
    return """You are an expert Instagram growth analyst.

Look at this Instagram insights screenshot carefully.

Extract all visible metrics and provide a full growth analysis.

Return ONLY valid JSON. No explanation. No markdown.

Format:
{
  "avg_reach": 0,
  "avg_likes": 0,
  "avg_comments": 0,
  "avg_shares": 0,
  "avg_saves": 0,
  "engagement_rate": 0.0,
  "follower_growth": "e.g. +120 this week",
  "best_performing_content": "description of what content type is performing best",
  "worst_performing_content": "description of what is underperforming",
  "posting_pattern": "observation about posting frequency and timing",
  "audience_summary": "brief summary of audience demographics if visible",
  "growth_tips": "3-5 specific actionable tips to grow based on these insights",
  "overall_health": "Poor / Average / Good / Excellent",
  "health_score": 75
}

Rules:
- Extract real numbers from the screenshot, use 0 if not visible
- engagement_rate is a float out of 100 (e.g. 4.5)
- health_score is out of 100 based on overall account performance
- overall_health must be one of: Poor / Average / Good / Excellent
- growth_tips must be specific to what you see in the screenshot
- be honest and data-driven"""


def build_analyze_screenshot_prompt():
    return """You are an expert Instagram growth strategist.

Look at this Instagram post image carefully.

Analyze it and predict:
1. Will this post get high reach or not?
2. What is good and bad about it?
3. How to improve it?

Return ONLY valid JSON. No explanation. No markdown.

Format:
{
  "reach_score": 78,
  "reach_potential": "High",
  "estimated_reach": "10,000 - 50,000 people",
  "will_reach": "Yes this post will get high reach",
  "what_is_good": "what works well in this post",
  "what_is_bad": "what is hurting the reach",
  "improvements": "specific tips to improve this post",
  "better_caption": "a fully rewritten improved caption with emojis",
  "better_hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"]
}

Rules:
- reach_score is out of 100
- reach_potential is one of: Low / Medium / High / Viral
- be honest and specific about what you see in the image
- better_caption must be ready to copy-paste on Instagram
- better_hashtags must be relevant and trending (no # symbol)"""


def build_content_prompt(topic, content_type, tone="Professional", brand_name="", niche="", target_audience="", posting_goal="", page_description=""):
    brand_line = f'Brand name: "{brand_name}" — use this as the brand identity.' if brand_name else ""
    niche_line = f'Niche: {niche}' if niche else ""
    audience_line = f'Target audience: {target_audience}' if target_audience else ""
    goal_line = f'Posting goal: {posting_goal}' if posting_goal else ""
    page_line = f'Instagram page context: {page_description}' if page_description else ""
    context_block = "\n".join(filter(None, [brand_line, niche_line, audience_line, goal_line, page_line]))

    return f"""
You are a top-tier Instagram content strategist who creates viral, highly specific content.

Create a viral {content_type} about "{topic}" in a {tone} tone.
{f'User context:{chr(10)}{context_block}' if context_block else ''}

Return ONLY valid JSON. No explanation. No markdown.

Format:
{{
  "hook": "one ultra-specific scroll-stopping line directly about {topic}",
  "content": "1-2 punchy sentences max, specific to {topic}, no fluff",
  "caption": "short Instagram caption (max 3 lines) with 1-2 emojis and a strong CTA",
  "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"],
  "scenes": ["scene 1 short text", "scene 2 short text", "scene 3 short text"],
  "image_prompt": "a highly specific visual scene for {topic} — describe exact setting, mood, colors, people, objects",
  "brand_text": "{brand_name if brand_name else topic} — short 3-5 word tagline"
}}

Rules:
- hook must be SPECIFIC to "{topic}" — never generic motivational lines
- content must be max 2 sentences, punchy and direct — NO hashtags
- caption must be SHORT (max 3 lines), include a CTA like 'DM us', 'Apply now', 'Link in bio'
- hook and content must NEVER contain hashtags
- hashtags must be niche and relevant to "{topic}" (10-15 tags, no # symbol)
- scenes are only used for reel (3 short punchy lines each directly about {topic})
- image_prompt must describe a SPECIFIC visual scene relevant to "{topic}" with mood, setting, lighting
- brand_text must use the brand name if provided
- NEVER use generic phrases like 'unlock your potential' or 'level up your life'
"""
