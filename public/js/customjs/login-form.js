const loginForm = document.getElementById("formLogin");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginData = new FormData(loginForm);
    const email = loginData.get("email");
    const password = loginData.get("password");
    const data = { email: email, password: password };
    fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.log == "success") {
                window.location.reload();
            } else {
                var dialog = $("#dialog")[0];
                dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>${res.message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>`;
                $("#myModal").modal("show");
            }
        });
});
const signupForm = document.getElementById("formRegister");
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const signupData = new FormData(signupForm);
    fetch("/user/signup", {
        method: "POST",
        body: signupData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                var dialog = $("#dialog")[0];
                dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Sign up success</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>`;
                $("#myModal").modal("show");
            } else {
                var dialog = $("#dialog")[0];
                dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Sign up failed</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>`;
                $("#myModal").modal("show");
            }
        });
});
