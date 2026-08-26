from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(model_name='prediction', name='reach_potential', field=models.CharField(blank=True, default='', max_length=50)),
        migrations.AddField(model_name='prediction', name='estimated_reach', field=models.CharField(blank=True, default='', max_length=100)),
        migrations.AddField(model_name='prediction', name='will_reach', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='prediction', name='what_is_good', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='prediction', name='what_is_bad', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='prediction', name='improvements', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='prediction', name='better_caption', field=models.TextField(blank=True, default='')),
        migrations.AddField(model_name='prediction', name='better_hashtags', field=models.TextField(blank=True, default='')),
    ]
