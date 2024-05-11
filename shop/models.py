from django.db import models
import datetime
# Create your models here.

class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    product_des = models.CharField(max_length=300)
    category = models.CharField(max_length=50, default="")
    subcategory = models.CharField(max_length=50, default="")
    price = models.IntegerField(default=0)
    pub_date = models.DateField()
    image = models.ImageField(upload_to="shop/images", default="")


    def __str__(self):
        return self.product_name
    

class Contacts(models.Model):
    contact_id = models.AutoField(primary_key=True)
    contact_name = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=50, default="")
    status = models.BooleanField(default=False)
    pub_date = models.DateField(default=datetime.date.today)  # Set default value to current date
    message = models.CharField(max_length=500, default="")

    def __str__(self):
        return self.contact_name