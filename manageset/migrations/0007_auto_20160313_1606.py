# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-13 16:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageset', '0006_auto_20160313_1550'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sentenceowner',
            name='name',
            field=models.CharField(default=b' ', max_length=50, null=True),
        ),
    ]
