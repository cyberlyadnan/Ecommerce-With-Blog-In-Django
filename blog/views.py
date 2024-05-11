from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from .models import Blog

# Create your views here.

def index(request):
    blogs = Blog.objects.all()[:6]
    print("this is the index function trggered")
    return render(request,"blog/index.html", {"blogs":blogs})


def blogview(request, blog_id): 
    try:
        categories = Blog.objects.values_list('category', flat=True).distinct()
        newest_blogs = Blog.objects.order_by('-published_date')[:5]
        newest_blogs_market = Blog.objects.order_by('-published_date')[:3]
        blog = Blog.objects.get(pk=blog_id)
        return render(request, "blog/blogview.html", {'blog': blog,'categories': categories,'newest_blogs': newest_blogs,'newest_blogs_market':newest_blogs_market})
    except Blog.DoesNotExist:
        return HttpResponse("Blog not found")





