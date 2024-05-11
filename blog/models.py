from django.db import models

class Blog(models.Model):
    blog_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=300,default="")
    content = models.TextField()
    category = models.CharField(max_length=50, default="")
    subcategory = models.CharField(max_length=50, default="")
    published_date = models.DateField()
    thumbnail = models.ImageField(upload_to="blog/images", default="")
    author_name = models.CharField(max_length=200,default="")
    author_image = models.ImageField(upload_to="blog/images", default="")


    def __str__(self):
        return self.title
