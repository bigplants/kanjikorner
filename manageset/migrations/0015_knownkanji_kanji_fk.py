# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-11-23 12:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manageset', '0014_sets_master_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='knownkanji',
            name='kanji_fk',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='kanji_fk', to='manageset.Kanji'),
        ),
    ]
