const updateBtnE = document.getElementById("update-info");
updateBtnE.addEventListener("click", () => {
    var name = $("#name");
    var address = $("#address");
    var phoneNumber = $("#phone");
    name.prop("readonly", false);
    address.prop("readonly", false);
    phoneNumber.prop("readonly", false);
    name.removeClass("form-control-plaintext");
    address.removeClass("form-control-plaintext");
    phoneNumber.removeClass("form-control-plaintext");
    name.addClass("form-control");
    address.addClass("form-control");
    phoneNumber.addClass("form-control");
    $("#submit-info-btn").removeClass("hidden");
    console.log("update-info");
    $("#update-info").addClass("hidden");
});
const SubmitButton = document.getElementById("submit-info-btn");
SubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    var name = $("#name").val();
    var address = $("#address").val();
    var phoneNumber = $("#phone").val();
    var data = { name, address, phoneNumber };
    fetch("/account/info", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                window.location.reload();
            }
        });
});
