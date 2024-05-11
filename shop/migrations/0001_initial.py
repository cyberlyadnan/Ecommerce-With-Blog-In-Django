# Generated by Django 5.0.4 on 2024-04-27 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=50)),
                ('product_des', models.CharField(max_length=300)),
                ('pub_date', models.DateField()),
            ],
        ),
    ]
