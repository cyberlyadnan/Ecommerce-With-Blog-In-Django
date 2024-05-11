from django.http import HttpResponse
from django.shortcuts import render
from shop.models import Product
from django.shortcuts import render



def index(request):
    # data = Product.objects.all()
    # data = Product.objects.get(product_name="Leather Wallet with RFID Blocking")
    # print(data)
    # print(data)
    # Pass the data to the template
    # return render(request, 'index.html', {'data': data})
    # return render(request,"/index.html")
    return HttpResponse("<h1>This is the Home PAge Of Our Project</h1>"
                        "<hr>"
                        "<button><a href='/shop'>Shop</a></button>"
                        "<hr>"
                        "<button><a href='/blog'>Blog</a></button>")
#