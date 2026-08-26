from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='instagram_url',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='page_description',
            field=models.TextField(blank=True, default=''),
        ),
    ]
