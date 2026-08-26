import sys
import os
import importlib.util
import time
import requests
import json
import re
import xml.etree.ElementTree as ET

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import Insight, Prediction, Content
from .serializers import InsightSerializer, PredictionSerializer, ContentSerializer

_ai_logic_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'AI_Logic'))
sys.path.insert(0, _ai_logic_path)

# Load generator
_gen_path = os.path.join(_ai_logic_path, 'generator.py')
_spec = importlib.util.spec_from_file_location('generator', _gen_path)
_gen = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_gen)
generate_content_ai = _gen.generate_content

# Load analyzer
_ana_path = os.path.join(_ai_logic_path, 'analyze.py')
_ana_spec = importlib.util.spec_from_file_location('analyze', _ana_path)
_ana = importlib.util.module_from_spec(_ana_spec)
_ana_spec.loader.exec_module(_ana)
analyze_screenshot_ai = _ana.analyze_screenshot
analyze_insights_ai = _ana.analyze_insights_screenshot

# Load hook generator
_gen_hooks = _gen.generate_hooks


@api_view(['POST'])
def get_hooks(request):
    topic = request.data.get('topic', '')
    if not topic:
        return Response({'error': 'Topic is required.'}, status=status.HTTP_400_BAD_REQUEST)
    result = _gen_hooks(topic)
    if not result:
        return Response({'error': 'Failed to generate hooks.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(result)


@api_view(['POST'])
def generate_content(request):
    topic = request.data.get("topic", "")
    content_type = request.data.get("content_type", "post")
    aspect_ratio = request.data.get("aspect_ratio", "1:1")
    context = request.data.get("context", "").strip() or None
    username = request.data.get("username", "")

    # fetch user profile for personalization
    brand_name = niche = target_audience = posting_goal = page_description = ""
    try:
        from django.contrib.auth.models import User
        from core.models import UserProfile
        user_obj = User.objects.get(username=username)
        profile = UserProfile.objects.get(user=user_obj)
        brand_name = profile.brand_name
        niche = profile.niche
        target_audience = profile.target_audience
        posting_goal = profile.posting_goal
        page_description = profile.page_description
    except:
        pass

    data, file_path_a, file_path_b, data_b = generate_content_ai(topic, content_type, "Professional", aspect_ratio, context, brand_name, niche, target_audience, posting_goal, page_description)
    data_b = data_b or data  # fallback to same data if None

    if not data:
        return Response({"error": "AI generation failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    Content.objects.create(
        username=username,
        topic=topic,
        hook=data.get("hook", ""),
        caption=data.get("caption", ""),
        hashtags=" ".join([f"#{t.strip('#')}" for t in data.get("hashtags", [])]),
        content_type=content_type,
        file_url=request.build_absolute_uri(settings.MEDIA_URL + os.path.basename(file_path_a)) if file_path_a and os.path.exists(file_path_a) else '',
        file_url_b=request.build_absolute_uri(settings.MEDIA_URL + os.path.basename(file_path_b)) if file_path_b and os.path.exists(file_path_b) else ''
    )

    def build_url(file_path):
        if file_path and os.path.exists(file_path):
            filename = os.path.basename(file_path)
            return request.build_absolute_uri(settings.MEDIA_URL + filename)
        return None

    # run prediction on both versions in parallel
    prediction_a = {}
    prediction_b = {}

    def run_pred_a():
        if file_path_a and os.path.exists(file_path_a):
            pred = analyze_screenshot_ai(file_path_a)
            if pred: prediction_a.update(pred)

    def run_pred_b():
        if file_path_b and os.path.exists(file_path_b):
            pred = analyze_screenshot_ai(file_path_b)
            if pred: prediction_b.update(pred)

    import threading
    t1 = threading.Thread(target=run_pred_a)
    t2 = threading.Thread(target=run_pred_b)
    t1.start()
    t2.start()
    t1.join(timeout=30)
    t2.join(timeout=30)

    return Response({
        "hook": data.get("hook", ""),
        "caption": data.get("caption", ""),
        "hashtags": data.get("hashtags", []),
        "content": data.get("content", ""),
        "content_type": content_type,
        "file_url_a": build_url(file_path_a),
        "file_url_b": build_url(file_path_b),
        "prediction_a": prediction_a or None,
        "prediction_b": prediction_b or None,
        "hook_b": data_b.get("hook", ""),
        "caption_b": data_b.get("caption", ""),
        "hashtags_b": data_b.get("hashtags", []),
    })


@api_view(['GET', 'POST'])
def insights(request):
    if request.method == 'GET':
        all_insights = Insight.objects.all().order_by('-created_at')
        serializer = InsightSerializer(all_insights, many=True)
        return Response(serializer.data)

    image = request.FILES.get('image')
    if not image:
        return Response({'error': 'Image is required.'}, status=status.HTTP_400_BAD_REQUEST)

    temp_path = os.path.join(_ai_logic_path, 'output', 'temp_insight.' + image.name.split('.')[-1])
    with open(temp_path, 'wb') as f:
        for chunk in image.chunks():
            f.write(chunk)

    ai_result = analyze_insights_ai(temp_path)

    if not ai_result:
        return Response({'error': 'AI analysis failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    username = request.POST.get('username', '')
    image.seek(0)
    insight = Insight.objects.create(
        username=username,
        image=image,
        avg_reach=ai_result.get('avg_reach') or 0,
        avg_likes=ai_result.get('avg_likes') or 0,
        avg_comments=ai_result.get('avg_comments') or 0,
        avg_shares=ai_result.get('avg_shares') or 0,
        avg_saves=ai_result.get('avg_saves') or 0,
        engagement_rate=ai_result.get('engagement_rate') or 0.0,
        follower_growth=ai_result.get('follower_growth', ''),
        best_performing_content=ai_result.get('best_performing_content', ''),
        worst_performing_content=ai_result.get('worst_performing_content', ''),
        posting_pattern=ai_result.get('posting_pattern', ''),
        audience_summary=ai_result.get('audience_summary', ''),
        growth_tips=ai_result.get('growth_tips', ''),
        overall_health=ai_result.get('overall_health', ''),
        health_score=ai_result.get('health_score') or 0,
    )
    serializer = InsightSerializer(insight)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def predict_performance(request):
    image = request.FILES.get('image')
    if not image:
        return Response({'error': 'Image is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Save image temporarily to disk so AI can read it
    temp_path = os.path.join(_ai_logic_path, 'output', 'temp_predict.' + image.name.split('.')[-1])
    with open(temp_path, 'wb') as f:
        for chunk in image.chunks():
            f.write(chunk)

    ai_result = analyze_screenshot_ai(temp_path)

    if not ai_result:
        return Response({'error': 'AI analysis failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    score = ai_result.get('reach_score', 50)
    reach_potential = ai_result.get('reach_potential', '')
    result = reach_potential if reach_potential else ('High' if score >= 70 else 'Low')

    username = request.POST.get('username', '')
    image.seek(0)
    prediction = Prediction.objects.create(
        username=username,
        image=image,
        score=score,
        result=result,
        reach_potential=reach_potential,
        estimated_reach=ai_result.get('estimated_reach', ''),
        will_reach=ai_result.get('will_reach', ''),
        what_is_good=ai_result.get('what_is_good', ''),
        what_is_bad=ai_result.get('what_is_bad', ''),
        improvements=ai_result.get('improvements', ''),
        better_caption=ai_result.get('better_caption', ''),
        better_hashtags=' '.join([f"#{t.strip('#')}" for t in ai_result.get('better_hashtags', [])]),
    )

    serializer = PredictionSerializer(prediction)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def content_history(request):
    from django.utils import timezone
    from datetime import timedelta
    filter_by = request.GET.get('filter', 'all')
    username = request.GET.get('username', '')
    queryset = Content.objects.filter(username=username).order_by('-created_at')
    if filter_by == 'week':
        queryset = queryset.filter(created_at__gte=timezone.now() - timedelta(days=7))
    elif filter_by == 'month':
        queryset = queryset.filter(created_at__gte=timezone.now() - timedelta(days=30))
    serializer = ContentSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def clear_content_history(request):
    username = request.GET.get('username', '')
    Content.objects.filter(username=username).delete()
    return Response({'success': True})


@api_view(['GET'])
def insights_history(request):
    username = request.GET.get('username', '')
    queryset = Insight.objects.filter(username=username).order_by('-created_at')
    serializer = InsightSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def clear_insights_history(request):
    username = request.GET.get('username', '')
    Insight.objects.filter(username=username).delete()
    return Response({'success': True})


@api_view(['GET'])
def predictions_history(request):
    username = request.GET.get('username', '')
    queryset = Prediction.objects.filter(username=username).order_by('-created_at')
    serializer = PredictionSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def clear_predictions_history(request):
    username = request.GET.get('username', '')
    Prediction.objects.filter(username=username).delete()
    return Response({'success': True})


_trending_cache = {'data': None, 'ts': 0}

DEFAULT_TRENDING_TOPICS = [
    {"topic": "AI Content Creation", "hashtags": ["#AIContent", "#ContentCreator", "#AITools", "#DigitalMarketing", "#GrowthHacking"]},
    {"topic": "Instagram Reels Growth", "hashtags": ["#ReelsViral", "#InstagramGrowth", "#ReelsTips", "#SocialMediaStrategy", "#ContentStrategy"]},
    {"topic": "Creator Economy", "hashtags": ["#CreatorEconomy", "#MonetizeYourPassion", "#SideHustle", "#PersonalBranding", "#InfluencerTips"]},
    {"topic": "Digital Nomad Lifestyle", "hashtags": ["#DigitalNomad", "#RemoteWork", "#WorkFromAnywhere", "#NomadLife", "#TravelTech"]},
    {"topic": "Viral Video Hooks", "hashtags": ["#VideoHooks", "#ViralTips", "#HookIdeas", "#ShortFormContent", "#VideoMarketing"]},
    {"topic": "Personal Branding Tips", "hashtags": ["#PersonalBrand", "#BrandBuilding", "#LinkedInGrowth", "#ThoughtLeadership", "#BrandStrategy"]},
    {"topic": "Fitness & Micro Workouts", "hashtags": ["#FitnessTrends", "#QuickWorkout", "#HealthyLiving", "#WellnessJourney", "#FitTok"]},
    {"topic": "Sustainable Living Hacks", "hashtags": ["#EcoFriendly", "#SustainableLiving", "#ZeroWaste", "#GreenLiving", "#EcoHacks"]},
    {"topic": "Faceless YouTube & Reels", "hashtags": ["#FacelessChannel", "#Automation", "#PassiveIncome", "#ReelsHacks", "#OnlineBusiness"]},
    {"topic": "Modern Tech Innovations", "hashtags": ["#TechTrends", "#Innovation", "#FutureOfTech", "#EmergingTech", "#SmartTools"]},
    {"topic": "Aesthetic Photography", "hashtags": ["#PhotographyTips", "#PhotoEditing", "#LightroomPresets", "#VisualAesthetics", "#InstaPhoto"]},
    {"topic": "Small Business Marketing", "hashtags": ["#SmallBizTips", "#EntrepreneurLife", "#MarketingStrategy", "#ShopSmall", "#BusinessGrowth"]},
    {"topic": "Mental Wellness & Focus", "hashtags": ["#Mindfulness", "#MentalHealthMatters", "#SelfCareSunday", "#DailyRoutine", "#InnerPeace"]},
    {"topic": "Smart Home Tech", "hashtags": ["#SmartHome", "#TechGadgets", "#CoolTech", "#ModernLiving", "#GadgetLovers"]},
    {"topic": "Storytelling Marketing", "hashtags": ["#BrandStorytelling", "#CopywritingTips", "#EngagingContent", "#AudienceConnection", "#ContentMarketing"]},
]

def _make_hashtags(topic):
    clean = re.sub(r'[^\w\s]', '', str(topic))
    words = clean.replace('-', ' ').replace('_', ' ').split()
    tags = ['#' + ''.join([w.capitalize() for w in words])] if words else ['#Trending']
    for w in words:
        if len(w) > 2:
            tag = '#' + w.capitalize()
            if tag not in tags:
                tags.append(tag)
    generic = ['#Trending', '#Viral', '#Instagram', '#ExplorePage', '#ForYou', '#InstaGood']
    for g in generic:
        if len(tags) >= 5:
            break
        if g not in tags:
            tags.append(g)
    return tags[:5]

def _fetch_rss_topics():
    urls = [
        'https://trends.google.com/trending/rss?geo=US',
        'https://trends.google.com/trending/rss?geo=IN',
        'https://trends.google.com/trending/rss?geo=GB'
    ]
    for url in urls:
        try:
            res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}, timeout=5)
            if res.status_code == 200:
                root = ET.fromstring(res.content)
                topics = [item.findtext('title').strip() for item in root.findall('./channel/item') if item.findtext('title')]
                if topics:
                    return topics[:15]
        except Exception:
            continue
    return []

def _groq_call(prompt):
    key = os.getenv('GROQ_API_KEY') or os.getenv('GROQ_API_KEY_1')
    if not key or key.startswith('your-'):
        return []
    try:
        from groq import Groq
        client = Groq(api_key=key)
        for model in ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']:
            try:
                res = client.chat.completions.create(
                    model=model,
                    messages=[{'role': 'user', 'content': prompt}],
                    temperature=0.7,
                    timeout=6
                )
                text = res.choices[0].message.content.strip()
                text = re.sub(r'^```[a-z]*\n?', '', text, flags=re.MULTILINE)
                text = re.sub(r'```$', '', text.strip())
                match = re.search(r'\[.*\]', text, re.DOTALL)
                if match:
                    return json.loads(match.group())
            except Exception:
                continue
    except Exception:
        pass
    return []

@api_view(['GET'])
def trending(request):
    now = time.time()
    force = request.GET.get('force') == 'true'
    if not force and _trending_cache['data'] and now - _trending_cache['ts'] < 1800:
        return Response(_trending_cache['data'])

    try:
        topics = _fetch_rss_topics()

        if topics:
            results = [
                {'rank': i + 1, 'topic': t, 'hashtags': _make_hashtags(t)}
                for i, t in enumerate(topics)
            ]
        else:
            # Try AI fallback if key is configured
            prompt = """List the top 15 trending social media topics globally right now with 5 Instagram hashtags each.
Return ONLY a valid JSON array. Format:
[{"topic": "Topic Name", "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]}, ...]"""
            data = _groq_call(prompt)
            if data and isinstance(data, list):
                results = [
                    {'rank': i + 1, 'topic': str(item.get('topic', '')).strip(), 'hashtags': item.get('hashtags') or _make_hashtags(item.get('topic', ''))}
                    for i, item in enumerate(data[:15]) if item.get('topic')
                ]
            else:
                # Built-in curated fallback topics
                results = [
                    {'rank': i + 1, 'topic': item['topic'], 'hashtags': item['hashtags']}
                    for i, item in enumerate(DEFAULT_TRENDING_TOPICS)
                ]

        _trending_cache['data'] = results
        _trending_cache['ts'] = now
        return Response(results)
    except Exception as e:
        # If anything fails, always return default curated trending list
        fallback = [
            {'rank': i + 1, 'topic': item['topic'], 'hashtags': item['hashtags']}
            for i, item in enumerate(DEFAULT_TRENDING_TOPICS)
        ]
        _trending_cache['data'] = fallback
        _trending_cache['ts'] = now
        return Response(fallback)


@api_view(['GET'])
def dashboard(request):
    from django.db.models import Avg, Max
    username = request.GET.get('username', '')

    total_content = Content.objects.filter(username=username).count()
    total_insights = Insight.objects.filter(username=username).count()
    total_predictions = Prediction.objects.filter(username=username).count()

    last_insight = Insight.objects.filter(username=username).order_by('-created_at').first()
    last_prediction = Prediction.objects.filter(username=username).order_by('-created_at').first()

    insight_stats = Insight.objects.filter(username=username).aggregate(
        avg_engagement=Avg('engagement_rate'),
        avg_reach=Avg('avg_reach'),
        avg_health=Avg('health_score'),
    )

    prediction_stats = Prediction.objects.filter(username=username).aggregate(
        avg_score=Avg('score'),
        best_score=Max('score'),
    )

    recent_content = Content.objects.filter(username=username).order_by('-created_at')[:5].values('topic', 'created_at')
    recent_predictions = Prediction.objects.filter(username=username).order_by('-created_at')[:5].values('score', 'result', 'reach_potential', 'created_at')
    recent_insights = Insight.objects.filter(username=username).order_by('-created_at')[:5].values('avg_reach', 'engagement_rate', 'overall_health', 'health_score', 'created_at')

    return Response({
        "total_content": total_content,
        "total_insights": total_insights,
        "total_predictions": total_predictions,
        "avg_engagement_rate": round(insight_stats['avg_engagement'] or 0, 2),
        "avg_reach": round(insight_stats['avg_reach'] or 0),
        "avg_health_score": round(insight_stats['avg_health'] or 0),
        "avg_prediction_score": round(prediction_stats['avg_score'] or 0),
        "best_prediction_score": prediction_stats['best_score'] or 0,
        "last_insight": InsightSerializer(last_insight).data if last_insight else None,
        "last_prediction": PredictionSerializer(last_prediction).data if last_prediction else None,
        "recent_content": list(recent_content),
        "recent_predictions": list(recent_predictions),
        "recent_insights": list(recent_insights),
    })
