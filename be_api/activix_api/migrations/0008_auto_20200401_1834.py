# Generated by Django 3.0.5 on 2020-04-01 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activix_api', '0007_auto_20200401_1831'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='useractivity',
            options={},
        ),
        migrations.AlterField(
            model_name='useractivity',
            name='userActivityID',
            field=models.AutoField(max_length=11, primary_key=True, serialize=False),
        ),
    ]