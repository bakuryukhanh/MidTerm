var changePasswordBtn = document.getElementById("change-password-submit");
changePasswordBtn.addEventListener("click", (event) => {
    event.preventDefault();
    var oldpassword = $("#old-password").val();
    var newpassword = $("#new-password").val();
    var confirmpassword = $("#confirm-password").val();
    if (newpassword != confirmpassword) {
        return $(".pwd-not-match").text("Confirmed password not match");
    }
    $(".pwd-not-match").text("");
    const data = { oldpassword, newpassword };
    fetch("/account/password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                alert("update password successs");
            } else {
                alert("Update pass word failed your old password is incorrect");
            }
        });
});
