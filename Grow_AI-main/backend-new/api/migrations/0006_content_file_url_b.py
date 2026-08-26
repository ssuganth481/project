from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_content_username_insight_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='file_url_b',
            field=models.TextField(blank=True, default=''),
        ),
    ]
