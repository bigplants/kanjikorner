# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-12-02 16:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manageset', '0016_auto_20161125_1536'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wordmeanings',
            name='word',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='the_meanings', to='manageset.Words'),
        ),
        migrations.AlterField(
            model_name='wordpos',
            name='word',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thepos', to='manageset.Words'),
        ),
    ]
