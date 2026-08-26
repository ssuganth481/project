from django.db import models
from django.contrib.auth.models import User

NICHE_CHOICES = [
    ('fitness', 'Fitness & Health'),
    ('tech', 'Technology'),
    ('food', 'Food & Cooking'),
    ('fashion', 'Fashion & Style'),
    ('education', 'Education'),
    ('business', 'Business & Entrepreneurship'),
    ('travel', 'Travel'),
    ('entertainment', 'Entertainment'),
    ('beauty', 'Beauty & Skincare'),
    ('other', 'Other'),
]

GOAL_CHOICES = [
    ('grow_followers', 'Grow Followers'),
    ('increase_engagement', 'Increase Engagement'),
    ('promote_business', 'Promote Business'),
    ('build_brand', 'Build Personal Brand'),
    ('drive_sales', 'Drive Sales'),
]

AUDIENCE_CHOICES = [
    ('teens', 'Teens (13-17)'),
    ('young_adults', 'Young Adults (18-24)'),
    ('adults', 'Adults (25-34)'),
    ('professionals', 'Professionals (35+)'),
    ('general', 'General Audience'),
]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    brand_name = models.CharField(max_length=100, blank=True, default='')
    niche = models.CharField(max_length=50, choices=NICHE_CHOICES, default='other')
    target_audience = models.CharField(max_length=50, choices=AUDIENCE_CHOICES, default='general')
    posting_goal = models.CharField(max_length=50, choices=GOAL_CHOICES, default='grow_followers')
    onboarding_done = models.BooleanField(default=False)
    instagram_url = models.CharField(max_length=255, blank=True, default='')
    page_description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.niche}"