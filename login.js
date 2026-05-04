function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "Bregieiro" && pass === "doghouse") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Credenciais incorretas!";
    }
}
