# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('record', '0002_auto_20150802_0655'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='to_download',
            field=models.NullBooleanField(),
        ),
    ]
