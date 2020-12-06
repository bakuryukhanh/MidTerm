var sort = document.getElementById("basic");
sort.addEventListener("change", SortProducts);
function SortProducts(event) {
    var sortType = event.target.value;

    fetch("/shop/?sort=" + sortType, {
        method: "GET",
    }).then(() => (window.location.href = "?sort=" + sortType));
}
var paginate = document.getElementsByClassName("page-link");
console.log(paginate);
for (let i = 0; i < paginate.length; i++) {
    paginate[i].addEventListener("click", updateQueryString);
}
function updateQueryString(event) {
    var page = event.target.value;
    var uri = document.location;

    var string = updateUrlParameter(uri.href, "page", page);
    var parts = string.split("?");
    window.location.href = "?" + parts[1];
}
function updateUrlParameter(uri, key, value) {
    var i = uri.indexOf("#");
    var hash = i === -1 ? "" : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        uri = uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
}
