# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('discogs_id', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=200)),
                ('listening_notes', models.TextField()),
                ('rating', models.IntegerField(null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('discogs_id', models.IntegerField(null=True)),
                ('title', models.CharField(max_length=200)),
                ('year', models.IntegerField(null=True)),
                ('thumb', models.URLField()),
                ('notes', models.TextField()),
                ('listening_notes', models.TextField()),
                ('rating', models.IntegerField(null=True)),
                ('artists', models.ManyToManyField(to='record.Artist')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('duration', models.CharField(max_length=200)),
                ('position', models.CharField(max_length=20)),
                ('listening_notes', models.TextField()),
                ('rating', models.IntegerField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='record',
            name='tracklist',
            field=models.ManyToManyField(to='record.Track'),
        ),
        migrations.AddField(
            model_name='collection',
            name='records',
            field=models.ManyToManyField(to='record.Record'),
        ),
    ]
