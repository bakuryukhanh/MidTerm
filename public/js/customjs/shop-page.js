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
var searchValue = document.getElementById("search-value");
searchValue.addEventListener("input", Search);
searchValue.addEventListener("focus", onFocus);
function onFocus() {
    console.log("focus");
}

function Search(event) {
    event.preventDefault();
    const searchValue = event.target.value;
    fetch("/shop/api/product/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchValue }),
    })
        .then((res) => res.json())
        .then((products) => {
            var dropdownMenu = $(
                ".search-product.dropdown>div.dropdown-menu"
            )[0];
            dropdownMenu.innerHTML = "";
            products.forEach((product) => {
                var divTag = document.createElement("div");
                divTag.classList.add("result-item");
                divTag.innerHTML = `
                <img src="${product.imgSrc}" alt="image">
                <a href="/shop/${product._id}">${product.name}</a>
                `;
                dropdownMenu.append(divTag);
                var hr = document.createElement("hr");
                dropdownMenu.append(hr);
            });
        });
}
