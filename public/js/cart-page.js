if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", cartPageReady);
} else {
    cartPageReady();
}
function cartPageReady() {
    var removeButtons = document.getElementsByClassName("remove-btn");
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener("click", removeButtonsClicked);
    }

    var quantityInputs = document.getElementsByClassName("qty");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    updateTotalCartPage();
}

function updateTotalCartPage() {
    var cartItemContainer = document.getElementsByClassName("cart")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-item");
    var subtotal = 0;
    var discount = 10;
    var grandtotal = 0;
    var couponDiscount = 10;
    var shipping = 0;

    console.log("update");
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];

        var priceElement = cartRow.getElementsByClassName("price")[0];
        var quantityElement = cartRow.getElementsByClassName("qty")[0];
        var totalElement = cartRow.getElementsByClassName("total")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        var total = price * quantity;
        total = Math.round(total * 100) / 100;
        totalElement.innerText = "$" + total;
        console.log(totalElement);
        subtotal = subtotal + total;
    }
    subtotal = Math.round(subtotal * 100) / 100;
    var subtotalElement = document.getElementsByClassName("subtotal")[0];
    subtotalElement.innerHTML = "$" + subtotal;

    grandtotal = subtotal - discount - couponDiscount + shipping;
    var grandtotalElement = document.getElementsByClassName("grandtotal")[0];
    grandtotalElement.innerHTML = "$" + grandtotal;

    var cart = [];
    for (var i = 0; i < cartRows.length; i++) {
        var item = {};
        var cartRow = cartRows[i];
        var title = cartRow.getElementsByClassName("item-title")[0].innerText;
        var priceElement = cartRow.getElementsByClassName("price")[0];
        var quantityElement = cartRow.getElementsByClassName("qty")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);
        var imgSrc = cartRow.getElementsByClassName("item-img")[0].src;
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
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotalCartPage();
}
function removeButtonsClicked(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateTotalCartPage();
}
