var cartElement = document.getElementsByClassName("cart")[0];
var productTitle = cartElement.getElementsByClassName("title");
var productPrice = cartElement.getElementsByClassName("price");
var productQuantity = cartElement.getElementsByClassName("quantity");
var productSubtotal = cartElement.getElementsByClassName("subtotal");
var total = document.getElementById("total");
var discount = document.getElementById("discount");
var grandtotal = document.getElementById("grand-total");
var checkoutBtn = document.getElementById("checkout");
const form = document.getElementsByClassName("customer-infor")[0];
var bill = { productList: [] };
checkoutBtn.addEventListener("click", (event) => checkout(event));
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", update);
} else {
    update();
}
function update() {
    var totalprice = 0;
    for (let i = 0; i < productSubtotal.length; i++) {
        var subtotal =
            parseInt(productQuantity[i].innerHTML) *
            parseFloat(productPrice[i].innerHTML);
        productSubtotal[i].innerHTML = Math.round(subtotal * 100) / 100;
        var product = {};
        product.name = productTitle[i].innerHTML;
        product.quantity = parseInt(productQuantity[i].innerHTML);
        product.price = parseFloat(productPrice[i].innerHTML);
        bill.productList.push(product);
        totalprice += Math.round(subtotal * 100) / 100;
    }
    bill.shipping = 0;
    total.innerHTML = Math.round(totalprice * 100) / 100;
    grandtotal.innerHTML =
        Math.round((totalprice - parseFloat(discount.innerHTML)) * 100) / 100;
    bill.total =
        Math.round((totalprice - parseFloat(discount.innerHTML)) * 100) / 100;
    bill.discount = parseFloat(discount.innerHTML);
}
function checkout(event) {
    event.preventDefault();
    const today = new Date();
    bill.date =
        today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
    bill.total = parseFloat(document.getElementById("grand-total").innerHTML);
    bill.customerName = document.getElementById("name").value;
    bill.customerEmail = document.getElementById("email").value;
    bill.customerPhone = document.getElementById("phone").value;
    bill.customerAddress = document.getElementById("address").value;
    bill.ship = 0;
    if (
        (bill.customerName == "") |
        (bill.customerEmail == "") |
        (bill.customerPhone == "") |
        (bill.customerAddress == "")
    ) {
        var dialog = $("#dialog")[0];
        dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
                                <div class="modal-dialog">
                                
                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <p style="color:red;font-weight=bold;text-align:center">ERROR</p>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                    <p style="color:red;font-size:24px;font-weight=bold;text-align:center">Please fill all the fields</p>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                                
                                </div>
                            </div>`;
        $("#myModal").modal("show");
    } else {
        fetch("", {
            method: "POST",
            body: JSON.stringify(bill),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.log == "success") {
                    var dialog = $("#dialog")[0];
                    dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
                                            <div class="modal-dialog">
                                            
                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                <div class="modal-body">
                                                <p>Thank you for ordering</p>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>`;
                }
            })
            .then(() => $("#myModal").modal("show"));
    }
}
