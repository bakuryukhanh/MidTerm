$("#booking")
    .validator()
    .on("submit", function (event) {
        event.preventDefault();
        $("#info-form").validator();
        $("#info-form").submit();
    });
$("#info-form").on("submit", function (event) {
    event.preventDefault();
    console.log("submit");
    submitAll();
});
function submitAll() {
    var name = $("#name").val();
    var phoneNumber = $("#phone-number").val();
    var other = $("#optional").val();
    var date = $("#date").val();
    var time = $("#time").val();
    var numOfGuests = $("#guests").val();
    var data = { name, phoneNumber, other, date, time, numOfGuests };
    fetch("/table-booking", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    }).then(() => window.location.reload());
}
