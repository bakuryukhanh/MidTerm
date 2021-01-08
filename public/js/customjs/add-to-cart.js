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

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-img")[0].src;
    var whytext = shopItem.getElementsByClassName("why-text")[0];
    var E = whytext.getElementsByTagName("a")[0];
    var parts = E.href.split("/");
    var id = parts[4];
    addItemToCart(id, title, price, imageSrc);
    updateCartTotal();
}
