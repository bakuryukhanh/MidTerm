const checkBtn = document.getElementById("check");
const checkMsg = document.getElementById("check-message");
function StringToDate(string) {
    var dateparts = string.split("/");
    return new Date(+dateparts[2], dateparts[1] - 1, +dateparts[0]);
}
checkBtn.addEventListener("click", (event) => {
    const discountCodeE = document.getElementById("discountCode");
    const discountValueE = document.getElementById("discount");
    const discountCode = { code: discountCodeE.value };
    fetch("/discount/check", {
        method: "POST",
        body: JSON.stringify(discountCode),
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
            discountValueE.innerHTML = discount.value;
            checkMsg.innerHTML = "Sucess";
            checkMsg.style.color = "#0f9d58";
            update();
        });
});
