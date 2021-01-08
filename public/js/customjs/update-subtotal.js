if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", updateSubTotal);
} else {
    updateSubTotal();
}
function updateSubTotal() {
    var prices = document.getElementsByClassName("price");
    var qtys = document.getElementsByClassName("table-qty");
    var subTotal = document.getElementsByClassName("subtotal");
    for (let i = 0; i < prices.length; i++) {
        var price = +prices[i].innerHTML.replace("$", "");
        var qty = +qtys[i].innerHTML || qtys[i].nodeValue;
        subTotal[i].innerHTML = price * qty + "đ";
    }
}
