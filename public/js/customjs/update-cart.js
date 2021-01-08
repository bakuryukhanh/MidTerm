if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", updateCartTotal);
} else {
    updateCartTotal();
}

function addItemToCart(id, title, price, imageSrc, qty = 1) {
    var cartRow = document.createElement("li");
    cartRow.classList.add("cart-row");
    var quantity = qty;
    var cartItems = document.getElementsByClassName("item-list")[0];
    var cartRows = cartItems.getElementsByClassName("cart-row");
    for (var i = 0; i < cartRows.length; i++) {
        var name = cartRows[i].getElementsByClassName("cart-item-title")[0]
            .innerText;
        if (name == title) {
            quantity = cartRows[i].getElementsByClassName("quantity")[0]
                .innerText;
            quantity = parseInt(quantity) + qty;
            cartRows[i].getElementsByClassName(
                "quantity"
            )[0].innerHTML = quantity;
            return;
        }
    }

    var cartRowContents = `

                                            <a href="/shop/${id}" class="photo">
                                                <img
                                                    src= ${imageSrc}
                                                    class="cart-thumb"
                                                    alt=""
                                                />
                                            </a>
                                            <h6>
                                                <a
                                                    href="/shop/${id}"
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
function removeCartItem(href) {
    var cartItemContainer = document.getElementsByClassName("cart-list")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var itemHref = cartRow
            .getElementsByTagName("a")[0]
            .getAttribute("href");
        if (itemHref == href) cartRow.remove();
    }
    updateCartTotal();
}
function clearCart() {
    var cartItemContainer = document.getElementsByClassName("item-list")[0];
    cartItemContainer.innerHTML = "";
    updateCartTotal();
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
    if (badge != 0) {
        badgeElement.classList.remove("hidden");
    } else {
        badgeElement.classList.add("hidden");
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
        var id = cartRow
            .getElementsByTagName("a")[0]
            .getAttribute("href")
            .split("/")[2];
        item.id = id;
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
