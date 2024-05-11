// Function to update cart count in the DOM
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    // var count = 0;
    var totalItems = 0;
    if (cart !== null) {
        // Iterate over each item in the cart and sum up the quantities
        Object.values(cart).forEach(function (item) {
            totalItems += item.quantity;
        });
        count = totalItems
    }
    document.getElementById("cart").innerHTML = totalItems;
}
updateCartCount();

// function updateCartCount() {
//     var cart = JSON.parse(localStorage.getItem("cart"));
//     var count = 0;
//     if (cart !== null) {
//       count = Object.keys(cart).length;
//     }
//     document.getElementById("cart").innerHTML = count;
//   }

// Check if cart exists in localStorage and update cart count initially
if (localStorage.getItem("cart") == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem("cart"));
    updateCartCount(); // Update cart count initially
}

// // home page add to cart button

// if (localStorage.getItem('cart') == null)
// {var cart = {}}
// else{
//     cart = JSON.parse(localStorage.getItem('cart'))
//     document.getElementById("cart").innerHTML = Object.keys(cart).length;
// }

// Function to add items to cart
function addToCart(
    productId,
    productName,
    quantity,
    description,
    price,
    productImage
) {
    // Retrieve existing cart data from local storagedelToCart
    let cartData = JSON.parse(localStorage.getItem("cart")) || {};

    // Check if the product is already in the cart
    if (cartData[productId]) {
        // Update quantity if product already exists
        cartData[productId].quantity += quantity;
    } else {
        // Add new product to the cart
        cartData[productId] = {
            productName: productName,
            quantity: quantity,
            description: description,
            price: price,
            productImage: productImage, // Add product image to cart data
        };
    }

    // Store updated cart data back in local storage
    console.log(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
}

// Click event for adding items to cart
$(".cart").click(function () {
    var productId = $(this).data("product-id");
    var productName = $(this).data("product-name");
    var productDes = $(this).data("product-des");
    var productPrice = $(this).data("product-price");
    var productImage = $(this).attr("data-product-image"); // Use attr() instead of data()
    console.log("The cart add button clicked");
    addToCart(productId, productName, 1, productDes, productPrice, productImage);
    updateCartCount(); // Update cart count after cart is updated
});

// $(document).on("click", ".cart", function (event) {
//     event.preventDefault();
//     // Your code here
// });

// render productrs detail at cart page
function renderCartItems() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var cartContainer = document.getElementById("cart-container");

    if (cart !== null) {
        // var totalItems = 0;
        // // Iterate over each item in the cart and sum up the quantities
        // Object.values(cart).forEach(function (item) {
        //     totalItems += item.quantity;
        // });
        // Clear previous content
        cartContainer.innerHTML = "";

        // Iterate over each item in the cart
        Object.keys(cart).forEach(function (productId) {
            var productData = cart[productId];
            console.log(productData);
            var productHtml = `
                <div  class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="cart-card-cart" data-id="${productId}">
                                    <img src="/media/${productData.productImage}"
                                        class="img-fluid rounded-3" alt="Shopping item"
                                        style="width: 85px;">
                                </div>
                                <div class="ms-3 mx-3 cart-card-cart" data-id="${productId}">
                                    <h5>${productData.productName}</h5>
                                    <p class="small mb-0">${productData.description}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 50px;">
                                    <h5 class="fw-normal mb-0">${productData.quantity}</h5>
                                </div>
                                <div style="width: 80px;">
                                    <h5 class="mb-0">Rs ${productData.price}</h5>
                                </div>
                                <a href="#!" class="delete-item" data-id="${productId}" style="color: #000000;">
    <i data-id="${productId}" class="bi bi-trash3-fill"></i>
</a>

                            </div>
                        </div>
                    </div>
                </div>
            `;
            // Append product HTML to the container
            cartContainer.innerHTML += productHtml;


            // Get all elements with class "cart-card-cart"
            var elements = document.getElementsByClassName("cart-card-cart");

            // Loop through each element and apply the style
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.cursor = "pointer";
            }
            cartHead()
        });
    }
}

renderCartItems();




function cartHead() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart !== null) {
        var totalItems = 0;
        // Iterate over each item in the cart and sum up the quantities
        Object.values(cart).forEach(function (item) {
            totalItems += item.quantity;
        });
        document.getElementById("total-count").innerHTML =
            "You have " + Object.keys(cart).length + " products in your cart";
        document.getElementById("total-products").innerHTML =
            "Total Items: " + totalItems;
    }

}




// delete the item from cart:
// Add click event to delete-item icons
$(document).on('click', '.delete-item', function (event) {
    event.preventDefault();

    // Get productId from the data-id attribute of the clicked trash icon
    var productId = $(this).data('id');

    // Remove the closest card element from the DOM
    $(this).closest('.card').remove();

    // Update local storage by removing the item
    removeFromLocalStorage(productId);
    showDeleteAlert()
});

// Function to remove item from local storage
function removeFromLocalStorage(productId) {
    var cartData = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the product exists in the cart
    if (cartData[productId]) {
        delete cartData[productId]; // Remove the product from cartData
        localStorage.setItem('cart', JSON.stringify(cartData)); // Update local storage
        cartHead()
        updateCartCount();
        console.log(cartData)
    }
}










//  cart to product view


$(document).ready(function () {
    // Add click event to cart cards
    $('.cart-card-cart').click(function () {
        // Get the product ID from the data-id attribute
        var productId = $(this).data('id');

        // Get the CSRF token value from the HTML
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();

        // Create a form element dynamically
        var form = $('<form action="/shop/prodview/" method="POST"></form>');
        form.append('<input type="hidden" name="myid" value="' + productId + '">');
        form.append('<input type="hidden" name="csrfmiddlewaretoken" value="' + csrfToken + '">');

        // Append the form to the body and submit it
        $('body').append(form);
        form.submit();
    });
});




// Function to show the delete alert
function showDeleteAlert() {
    $('#deleteAlert').addClass('show');
}



function clearcart(){
    console.log("Clear cart clicked")
    localStorage.removeItem("cart")
    updateCartCount()
    renderCartItems()
}