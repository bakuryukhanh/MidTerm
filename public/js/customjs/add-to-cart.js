if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    // for (var i = 0; i < removeCartItemButtons.length; i++) {
    //     var button = removeCartItemButtons[i];
    //     button.addEventListener("click", removeCartItem);
    // }

    // var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     var input = quantityInputs[i];
    //     input.addEventListener("change", quantityChanged);
    // }

    var addToCartButtons = document.getElementsByClassName("add-cart");
    if (addToCartButtons.length == 0) {
        return;
    }
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }
    updateCartTotal();

    // document
    //     .getElementsByClassName("btn-purchase")[0]
    //     .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
    alert("Thank you for your purchase");
    var cartItems = document.getElementsByClassName("cart-list")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-img")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("li");
    cartRow.classList.add("cart-row");
    var quantity = 1;
    var cartItems = document.getElementsByClassName("cart-list")[0];
    var cartRows = cartItems.getElementsByClassName("cart-row");
    for (var i = 0; i < cartRows.length; i++) {
        var name = cartRows[i].getElementsByClassName("cart-item-title")[0]
            .innerText;
        if (name == title) {
            quantity = cartRows[i].getElementsByClassName("quantity")[0]
                .innerText;
            quantity = parseInt(quantity) + 1;
            cartRows[i].getElementsByClassName(
                "quantity"
            )[0].innerHTML = quantity;
            return;
        }
    }

    var cartRowContents = `

                                            <a href="#" class="photo">
                                                <img
                                                    src= ${imageSrc}
                                                    class="cart-thumb"
                                                    alt=""
                                                />
                                            </a>
                                            <h6>
                                                <a
                                                    href="#"
                                                    class="cart-item-title"
                                                >
                                                    ${title}
                                                </a>
                                            </h6>
                                            <p>
                                                <span class="quantity">${quantity}</span>
                                                x -
                                                <span class="price">
                                                    ${price}
                                                </span>
                                            </p>
`;

    cartRow.innerHTML = cartRowContents;
    cartItems.prepend(cartRow);
    // cartRow
    //     .getElementsByClassName("btn-danger")[0]
    //     .addEventListener("click", removeCartItem);
    // cartRow
    //     .getElementsByClassName("cart-quantity-input")[0]
    //     .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-list")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var badgeElement = document.getElementsByClassName("badge")[0];
    var badge = 0;
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("price")[0];
        var quantityElement = cartRow.getElementsByClassName("quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.innerText);
        badge += quantity;
        total = total + price * quantity;
    }
    badgeElement.innerHTML = badge;
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
        "$" + total;

    var cart = [];
    for (var i = 0; i < cartRows.length; i++) {
        var item = {};
        var cartRow = cartRows[i];
        var title = cartRow.getElementsByClassName("cart-item-title")[0]
            .innerText;
        var priceElement = cartRow.getElementsByClassName("price")[0];
        var quantityElement = cartRow.getElementsByClassName("quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.innerText);
        var imgSrc = cartRow.getElementsByClassName("cart-thumb")[0].src;
        item.title = title;
        item.price = price;
        item.quantity = quantity;
        item.imgSrc = imgSrc;
        cart.push(item);
    }

    fetch("/shop", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
}
