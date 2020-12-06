var button = document.getElementById("change-ava");
button.addEventListener("click", changeAva);
function changeAva(event) {
    $("#myModal").modal("show");
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#image-preview").attr("src", e.target.result);
            $("#image-preview")[0].classList.remove("hidden");
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$("#image-input").change(function () {
    readURL(this);
});
var updateBtn = document.getElementById("update");
updateBtn.addEventListener("click", updateAva);
function updateAva() {
    var file = document.getElementById("image-input").files[0];
    var formData = new FormData();
    formData.append("image", file);
    $("#loadMe").modal({
        backdrop: "static", //remove ability to close modal with click
        keyboard: false, //remove option to close with keyboard
        show: true, //Display loader!
    });
    fetch("/user/updateAva", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                $("loadMe").modal({ show: false });
                window.location.reload();
            }
        });
}
