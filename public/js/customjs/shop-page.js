if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", wishListHandle);
} else {
    wishListHandle();
}

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
function wishListHandle() {
    var wishListA = document.getElementsByClassName("wishlist");
    var productListE = document.getElementsByClassName("products-single");
    for (let i = 0; i < wishListA.length; i++) {
        wishListA[i].addEventListener("click", addToWishList);
    }
    fetch("api/wishlist", {
        method: "GET",
    })
        .then((res) => {
            if (res.status == 401) {
                throw new Error("Access Denied");
            } else {
                return res.json();
            }
        })
        .then((FavList) => {
            for (let i = 0; i < productListE.length; i++) {
                var id = productListE[i]
                    .getElementsByTagName("a")[0]
                    .getAttribute("href")
                    .split("/")[2];
                if (!FavList || FavList == {}) {
                    return;
                }

                if (FavList.includes(id)) {
                    productListE[i]
                        .getElementsByClassName("favorite")[0]
                        .classList.remove("hidden");
                    var favIcon = productListE[i].getElementsByClassName(
                        "wishlist"
                    )[0];
                    favIcon.setAttribute("title", "Remove from Wishlist");
                    favIcon.setAttribute("href", "api/wishlist/" + id);
                    favIcon.setAttribute(
                        "data-original-title",
                        "Remove from Wishlist"
                    );
                    favIcon.setAttribute("method", "DELETE");
                }
            }
        })
        .catch((err) => console.log(err));
}
function addToWishList(event) {
    event.preventDefault();
    var iconE = event.target;
    var link =
        iconE.getAttribute("href") || iconE.parentElement.getAttribute("href");
    var method =
        iconE.getAttribute("method") ||
        iconE.parentElement.getAttribute("method");
    console.log(method);
    var string =
        iconE.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute(
            "href"
        ) ||
        iconE.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute(
            "href"
        );
    var id = string.split("/")[2];
    fetch(link, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    }).then(() => {
        if (method == "POST") {
            set2Delete(iconE);
        }
        if (method == "DELETE") {
            console.log("add");
            set2Add(iconE);
        }
    });
}
function set2Delete(iconE) {
    var productE =
        iconE.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement;
    var id = productE
        .getElementsByTagName("a")[0]
        .getAttribute("href")
        .split("/")[2];
    var favIcon = productE.getElementsByClassName("wishlist")[0];
    productE.getElementsByClassName("favorite")[0].classList.remove("hidden");
    favIcon.setAttribute("title", "Remove from Wishlist");
    favIcon.setAttribute("href", "api/wishlist/" + id);
    favIcon.setAttribute("data-original-title", "Remove from Wishlist");
    favIcon.setAttribute("method", "DELETE");
}
function set2Add(iconE) {
    var productE =
        iconE.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement;
    var favIcon = productE.getElementsByClassName("wishlist")[0];
    console.log(favIcon);
    productE.getElementsByClassName("favorite")[0].classList.add("hidden");
    favIcon.setAttribute("title", "Add to WishList");
    favIcon.setAttribute("href", "api/wishlist/");
    favIcon.setAttribute("data-original-title", "Add to WishList");
    favIcon.setAttribute("method", "POST");
}
