# Generated by Django 2.0.1 on 2018-01-11 16:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UrlMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('short_url', models.CharField(max_length=64, unique=True)),
                ('full_url', models.TextField(db_index=True)),
            ],
        ),
    ]
