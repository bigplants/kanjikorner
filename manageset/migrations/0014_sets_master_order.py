# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-11-23 10:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageset', '0013_auto_20160501_1729'),
    ]

    operations = [
        migrations.AddField(
            model_name='sets',
            name='master_order',
            field=models.IntegerField(null=True),
        ),
    ]