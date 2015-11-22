# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('record', '0004_record_downloaded'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='rating',
        ),
        migrations.RemoveField(
            model_name='record',
            name='rating',
        ),
        migrations.RemoveField(
            model_name='track',
            name='rating',
        ),
    ]
