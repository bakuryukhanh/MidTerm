var add2CartBtn = $("#add2cartbtn")[0];
add2CartBtn.addEventListener("click", add2CartDetail);
var postCommentBtn = $("#post-comment")[0];
postCommentBtn.addEventListener("click", postComment);
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", getComment);
} else {
    getComment();
}

function add2CartDetail() {
    var name = $("#name").text();
    var price = +$("#price").text().replace("đ", "");
    var qty = +$("#qty").val();
    var imgSrc = $("#imgSrc").attr("src");
    addItemToCart(name, price, imgSrc, qty);
    updateCartTotal();
}
function getComment() {
    fetch(window.location.href + "/comment", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((comments) => {
            console.log("test", comments);
            comments.forEach((comment) => {
                appendCommentList(comment);
            });
        });
}
function appendCommentList(comment) {
    var div = document.createElement("div");
    div.classList.add("media");
    div.classList.add("mb-3");
    div.innerHTML = `<div class="mr-2">
        <img class="rounded-circle border p-1"
            src="${comment.user.imgSrc}"
            alt="Generic placeholder image"
            style="width: 65px;height:65px">
    </div>
    <div class="media-body">
        <p>${comment.content}</p>
        <small class="text-muted">Posted by ${comment.user.name} on ${comment.date}</small>
    </div>
    `;
    var commentList = $(".card.card-outline-secondary.my-4>div.card-body")[0];
    commentList.prepend(div);
    var hr = document.createElement("hr");
    commentList.prepend(hr);
}
function postComment(comment) {
    var comment = {};
    comment.content = $("#comment-body").val();
    var date = new Date();
    var cmtdate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    comment.date = cmtdate;
    var link = window.location.href + "/comment";
    var noti = $("#noti")[0];
    fetch(link, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.log == "success") {
                console.log("success");
                appendCommentList(res.comment);
                noti.classList.remove("failed");
                noti.classList.add("success");
                noti.innerHTML = "Post success";
            } else {
                //set noti You havent signed in
                console.log("not signed in");
                noti.classList.remove("success");
                noti.classList.add("failed");
                noti.innerHTML =
                    "Post Failed!! You need to sign in to post comments";
            }
            $("#comment-body").val("");
        });
}
