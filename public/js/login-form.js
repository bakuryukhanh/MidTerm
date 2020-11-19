const loginForm = document.getElementById("formLogin");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginData = new FormData(loginForm);
    const email = loginData.getAll("email");
    const password = loginData.get("password");
    const data = { email: email, password: password };
    fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                window.location.reload();
            } else {
                var notiPlace = document.getElementsByClassName(
                    "login-placeholder"
                )[0];
                notiPlace.innerHTML = "";
                var noti = document.createElement("p");
                noti.classList.add("notify");
                noti.innerHTML = `username or password wrong`;
                notiPlace.append(noti);
            }
        });
});
const signupForm = document.getElementById("formRegister");
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const signupData = new FormData(signupForm);
    const name = signupData.get("InputName");
    const address = signupData.get("address");
    const phone = signupData.get("phone");
    const email = signupData.get("InputEmail1");
    const password = signupData.get("InputPassword1");
    const data = {
        name: name,
        address: address,
        phoneNumber: phone,
        email: email,
        password: password,
    };
    console.log(data);
    fetch("/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                var notiPlace = document.getElementsByClassName(
                    "noti-placeholder"
                )[0];
                notiPlace.innerHTML = "";
                var noti = document.createElement("p");
                noti.classList.add("notify");
                noti.innerHTML = `Sign up success`;
                notiPlace.append(noti);
            } else {
                var notiPlace = document.getElementsByClassName(
                    "noti-placeholder"
                )[0];
                notiPlace.innerHTML = "";
                var noti = document.createElement("p");
                noti.classList.add("notify");
                noti.innerHTML = `Sign up failed email has already exist`;
                notiPlace.append(noti);
            }
        });
});
