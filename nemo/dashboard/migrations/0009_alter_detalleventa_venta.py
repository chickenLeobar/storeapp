# Generated by Django 3.2.4 on 2021-06-16 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0008_auto_20210616_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalleventa',
            name='venta',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.venta'),
        ),
    ]
