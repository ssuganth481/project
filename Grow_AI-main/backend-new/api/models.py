from django.db import models

class Insight(models.Model):
    username = models.CharField(max_length=150, default='')
    image = models.ImageField(upload_to='insights/')
    avg_reach = models.IntegerField(null=True, blank=True)
    avg_likes = models.IntegerField(null=True, blank=True)
    avg_comments = models.IntegerField(null=True, blank=True)
    avg_shares = models.IntegerField(null=True, blank=True)
    avg_saves = models.IntegerField(null=True, blank=True)
    engagement_rate = models.FloatField(null=True, blank=True)
    follower_growth = models.CharField(max_length=100, blank=True, default='')
    best_performing_content = models.TextField(blank=True, default='')
    worst_performing_content = models.TextField(blank=True, default='')
    posting_pattern = models.TextField(blank=True, default='')
    audience_summary = models.TextField(blank=True, default='')
    growth_tips = models.TextField(blank=True, default='')
    overall_health = models.CharField(max_length=20, blank=True, default='')
    health_score = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Content(models.Model):
    username = models.CharField(max_length=150, default='')
    topic = models.CharField(max_length=255)
    hook = models.TextField()
    caption = models.TextField()
    hashtags = models.TextField()
    content_type = models.CharField(max_length=10, default='post')
    file_url = models.TextField(blank=True, default='')
    file_url_b = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)


class Prediction(models.Model):
    username = models.CharField(max_length=150, default='')
    image = models.ImageField(upload_to='predictions/')
    score = models.IntegerField()
    result = models.CharField(max_length=50)
    reach_potential = models.CharField(max_length=50, blank=True, default='')
    estimated_reach = models.CharField(max_length=100, blank=True, default='')
    will_reach = models.TextField(blank=True, default='')
    what_is_good = models.TextField(blank=True, default='')
    what_is_bad = models.TextField(blank=True, default='')
    improvements = models.TextField(blank=True, default='')
    better_caption = models.TextField(blank=True, default='')
    better_hashtags = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)