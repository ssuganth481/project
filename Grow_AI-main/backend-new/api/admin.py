from django.contrib import admin
from .models import Insight, Content, Prediction

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ['username', 'topic', 'content_type', 'created_at']
    list_filter = ['content_type']
    search_fields = ['username', 'topic']

@admin.register(Insight)
class InsightAdmin(admin.ModelAdmin):
    list_display = ['username', 'avg_reach', 'engagement_rate', 'overall_health', 'created_at']
    search_fields = ['username']

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ['username', 'score', 'result', 'reach_potential', 'created_at']
    search_fields = ['username']
