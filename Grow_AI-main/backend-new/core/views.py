from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import UserProfile

@csrf_exempt
def api_home(request):
    if request.method == "GET":
        return JsonResponse({"message": "API is working"})
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            message = data.get("message", "")
            return JsonResponse({"you_sent": message, "reply": "Got your message"})
        except Exception as e:
            return JsonResponse({"error": str(e)})

@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        if not username or not password:
            return JsonResponse({"error": "Username and password are required."}, status=400)
        user = authenticate(username=username, password=password)
        if user is not None:
            from django.utils import timezone
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])
            profile, _ = UserProfile.objects.get_or_create(user=user)
            return JsonResponse({
                "success": True,
                "username": user.username,
                "onboarding_done": profile.onboarding_done
            })
        return JsonResponse({"error": "Invalid username or password."}, status=401)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def register_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        if not username or not password:
            return JsonResponse({"error": "Username and password are required."}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists."}, status=400)
        if len(password) < 6:
            return JsonResponse({"error": "Password must be at least 6 characters."}, status=400)
        user = User.objects.create_user(username=username, password=password)
        UserProfile.objects.create(user=user)
        return JsonResponse({"success": True, "username": user.username, "onboarding_done": False})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def save_profile(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        user = User.objects.get(username=username)
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.brand_name = data.get("brand_name", "").strip()
        profile.niche = data.get("niche", "other")
        profile.target_audience = data.get("target_audience", "general")
        profile.posting_goal = data.get("posting_goal", "grow_followers")
        profile.onboarding_done = True
        profile.save()
        return JsonResponse({"success": True})
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_profile(request):
    username = request.GET.get('username', '')
    try:
        user = User.objects.get(username=username)
        profile, _ = UserProfile.objects.get_or_create(user=user)
        return JsonResponse({
            'username': user.username,
            'brand_name': profile.brand_name,
            'niche': profile.niche,
            'target_audience': profile.target_audience,
            'posting_goal': profile.posting_goal,
            'onboarding_done': profile.onboarding_done,
            'instagram_url': profile.instagram_url,
            'page_description': profile.page_description,
            'date_joined': user.date_joined.strftime('%B %d, %Y'),
            'last_login': user.last_login.strftime('%B %d, %Y %I:%M %p') if user.last_login else 'Never',
        })
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def analyze_page(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        url = data.get("url", "").strip()
        if not url:
            return JsonResponse({"error": "URL is required."}, status=400)

        import sys, os
        ai_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'AI_Logic'))
        if ai_path not in sys.path:
            sys.path.insert(0, ai_path)
        from gemini import analyze_instagram_page

        result = analyze_instagram_page(url)
        if not result:
            # fallback to Groq
            import sys as _sys
            if ai_path not in _sys.path:
                _sys.path.insert(0, ai_path)
            from groq import Groq as _Groq
            from prompts import build_page_analysis_prompt as _build_prompt
            import re as _re, json as _json
            _groq_key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_API_KEY_1")
            if _groq_key and not _groq_key.startswith('your-'):
                _client = _Groq(api_key=_groq_key)
                _prompt = _build_prompt(url)
                _resp = _client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": _prompt}]
                )
                _text = _resp.choices[0].message.content
                _match = _re.search(r"\{.*\}", _text, _re.DOTALL)
                if _match:
                    result = _json.loads(_match.group())
        if not result:
            return JsonResponse({"error": "Analysis failed."}, status=500)
        return JsonResponse({"success": True, "result": result})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def save_page_description(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        url = data.get("url", "").strip()
        description = data.get("description", "").strip()
        user = User.objects.get(username=username)
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.instagram_url = url
        profile.page_description = description
        profile.save()
        return JsonResponse({"success": True})
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
