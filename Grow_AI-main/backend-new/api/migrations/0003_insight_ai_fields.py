from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_prediction_ai_fields'),
    ]

    operations = [
        migrations.AddField(model_name='insight', name='avg_shares', field=models.IntegerField(blank=True, null=True)),
        migrations.AddField(model_name='insight', name='avg_saves', field=models.IntegerField(blank=True, null=True)),
        migrations.AddField(model_name='insight', name='follower_growth', field=models.CharField(blank=True, default='', max_length=100)),
        migrations.AddField(model_name='insight', name='best_performing_content', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='insight', name='worst_performing_content', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='insight', name='posting_pattern', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='insight', name='audience_summary', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='insight', name='growth_tips', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='insight', name='overall_health', field=models.CharField(blank=True, default='', max_length=20)),
        migrations.AddField(model_name='insight', name='health_score', field=models.IntegerField(blank=True, null=True)),
    ]
