var sort = document.getElementById("basic");
sort.addEventListener("change", SortProducts);
function SortProducts(event) {
    var sortType = event.target.value;

    fetch("/shop/?sort=" + sortType, {
        method: "GET",
    }).then(() => (window.location.href = "?sort=" + sortType));
}
var paginate = document.getElementsByClassName("page-link");
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
var filterBtn = document.getElementById("filter-submit");
filterBtn.addEventListener("click", PriceFilter);
function PriceFilter() {
    var filter = document.getElementById("amount").value;
    var parts = filter.split("-");
    var minPrice = parseInt(parts[0].replace("$", ""));
    var maxPrice = parseInt(parts[1].replace("$", ""));
    var uri = document.location;

    var string = updateUrlParameter(uri.href, "minPrice", minPrice);
    string = updateUrlParameter(string, "maxPrice", maxPrice);
    var parts = string.split("?");
    window.location.href = "?" + parts[1];
}
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", Search);
function Search(event) {
    event.preventDefault();
    var searchValue = document.getElementById("search-value").value;
    var uri = document.location;

    var string = updateUrlParameter(uri.href, "keyword", searchValue);
    var parts = string.split("?");
    window.location.href = "?" + parts[1];
}
