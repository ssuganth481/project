from django.urls import path
from .views import api_home, login_view, register_view, save_profile, get_profile, analyze_page, save_page_description

urlpatterns = [
    path('', api_home),
    path('login/', login_view),
    path('register/', register_view),
    path('save-profile/', save_profile),
    path('profile/', get_profile),
    path('analyze-page/', analyze_page),
    path('save-page-description/', save_page_description),
]
