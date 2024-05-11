from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Product, Contacts
from django.db.models import Q
from django.contrib import messages
from math import ceil
from django.http import JsonResponse
import json
import datetime
# Create your views here.

def index(request):
    products = Product.objects.all()
    n = len(products)
    nSlides = n//3 + ceil((n/3)-(n//3))
    params = {"no_of_slides":nSlides, "range": range(nSlides), "products":products}
    return render(request,"shop/index.html",params)





def about(request):
    return render(request, "shop/about.html")
    # return HttpResponse("This Is the AboutUs Page ")








def contact(request):
    if request.method == "POST":
        contact_name = request.POST.get("contact_name")
        email = request.POST.get("email")
        message = request.POST.get("message")
        
        # Create a new Contact object and save it
        new_contact = Contacts(
            contact_name=contact_name,
            email=email,
            pub_date = datetime.date.today(),
            message=message
        )
        new_contact.save()

        # Show success message
        messages.success(request, "Message sent successfully!")
    return render(request, "shop/contact.html")









def tracker(request):
    return render(request,"shop/tracker.html")










def search(request):
        query = request.POST.get('query', 'No Result Found')  # Get the search query from the request

        # Perform the search operation on the Product model
        # products = Product.objects.filter(product_name__icontains=query)
        products = Product.objects.filter(
            Q(product_name__icontains=query) |
            Q(product_des__icontains=query) |
            Q(category__icontains=query) |  # Assuming category is a field in your Product model
            Q(subcategory__icontains=query)  # Assuming subcategory is a field in your Product model
        ).distinct()  # Use distinct() to avoid duplicate results
        context = {
                'products':products,
                "range": range(len(products))
            }
        return render(request, 'shop/search.html', context)




def prodview(request):
    product_id = request.POST.get("myid")

    if product_id:
        product = get_object_or_404(Product, id=product_id)
        return render(request, "shop/prodview.html", {'product': product})
    else:
        return HttpResponse("Product ID not provided.")







def cart(request):
    return render(request, "shop/cart.html")






def product(request):
    return render(request,"shop/products.html")





def checkout(request):
    return HttpResponse("This Is the CheckOut Page ")

