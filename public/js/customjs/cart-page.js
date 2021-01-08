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
    $("div.attr-nav")[0].classList.add("hidden");
    var couponBtn = document.getElementById("coupon-submit");
    couponBtn.addEventListener("click", CouponSubmit);
    updateTotalCartPage();
}

function updateTotalCartPage() {
    var cartItemContainer = document.getElementsByClassName("cart")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-item");
    var subtotal = 0;
    var grandtotal = 0;
    var couponDiscount = +document.getElementById("coupon-value").innerHTML;
    var shipping = 0;
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

    grandtotal = subtotal - couponDiscount + shipping;
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
function CouponSubmit() {
    var couponCode = document.getElementById("coupon-input").value;
    var couponE = document.getElementById("coupon-value");
    const checkMsg = document.getElementById("check-message");
    fetch("/discount/check", {
        method: "POST",
        body: JSON.stringify({ code: couponCode }),
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((discount) => {
            if (discount.log == "failed") {
                checkMsg.innerHTML = "Invalid discount code";
                checkMsg.style.color = "#ff0000";
                return;
            }
            var startDate = StringToDate(discount.startDate);
            var endDate = StringToDate(discount.endDate);
            var today = new Date();
            if (today < startDate) {
                checkMsg.innerHTML = "Code not take affect yes";
                checkMsg.style.color = "#ff0000";
                return;
            }
            if (today > endDate) {
                checkMsg.innerHTML = "Out of date code";
                checkMsg.style.color = "#ff0000";
                return;
            }
            couponE.innerHTML = discount.value;
            checkMsg.innerHTML = "Sucess";
            checkMsg.style.color = "#0f9d58";
            updateTotalCartPage();
        });
}
function StringToDate(string) {
    var dateparts = string.split("/");
    return new Date(+dateparts[2], dateparts[1] - 1, +dateparts[0]);
}
