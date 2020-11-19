var sort = document.getElementById("basic");
sort.addEventListener("change", SortProducts);
function SortProducts(event) {
    var sortType = event.target.value;

    fetch("/shop/" + sortType, {
        method: "GET",
    }).then(() => (window.location.href = "/shop/sort/" + sortType));
}
