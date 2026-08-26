from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'brand_name', 'niche', 'target_audience', 'posting_goal', 'onboarding_done', 'created_at']
    list_filter = ['niche', 'posting_goal', 'onboarding_done']
    search_fields = ['user__username', 'brand_name']
