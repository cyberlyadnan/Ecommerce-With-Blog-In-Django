# Generated by Django 5.0.4 on 2024-05-02 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contacts',
            fields=[
                ('contact_id', models.AutoField(primary_key=True, serialize=False)),
                ('contact_name', models.CharField(default='', max_length=50)),
                ('email', models.CharField(default='', max_length=50)),
                ('status', models.BooleanField(default=False)),
                ('pub_date', models.DateField()),
                ('message', models.CharField(default='', max_length=500)),
            ],
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
    ]