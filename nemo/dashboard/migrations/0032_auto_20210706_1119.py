# Generated by Django 3.2.5 on 2021-07-06 16:19

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0031_alter_contact_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='Type_payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('description', models.TextField()),
            ],
            options={
                'db_table': 'type_payment',
            },
        ),
        migrations.AddField(
            model_name='detalleventa',
            name='state_payment',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(0, 'El valor minimo es 0')]),
        ),
        migrations.CreateModel(
            name='Abono_venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mont', models.DecimalField(decimal_places=2, max_digits=9)),
                ('description', models.TextField()),
                ('type_payment', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.type_payment')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.venta')),
            ],
            options={
                'db_table': 'abono_venta',
            },
        ),
    ]