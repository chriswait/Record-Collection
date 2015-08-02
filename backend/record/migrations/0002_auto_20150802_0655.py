# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('record', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='listening_notes',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='listening_notes',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='notes',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='track',
            name='listening_notes',
            field=models.TextField(null=True),
        ),
    ]
