# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('record', '0003_record_to_download'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='downloaded',
            field=models.NullBooleanField(),
        ),
    ]
