const loginForm = document.getElementById("formLogin");
loginForm.addEventListener("submit", (event) => {
    const loginData = new FormData(loginForm);
    const email = loginData.getAll("email");
    const password = loginData.get("password");
    const data = { email: email, password: password };
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    }).then(console.log("login"));
});
