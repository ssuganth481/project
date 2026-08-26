from rest_framework import serializers
from .models import Insight, Content, Prediction

class InsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insight
        fields = ['id', 'image', 'avg_reach', 'avg_likes', 'avg_comments', 'avg_shares',
                  'avg_saves', 'engagement_rate', 'follower_growth', 'best_performing_content',
                  'worst_performing_content', 'posting_pattern', 'audience_summary',
                  'growth_tips', 'overall_health', 'health_score', 'created_at']


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['id', 'image', 'score', 'result', 'reach_potential', 'estimated_reach',
                  'will_reach', 'what_is_good', 'what_is_bad', 'improvements',
                  'better_caption', 'better_hashtags', 'created_at']