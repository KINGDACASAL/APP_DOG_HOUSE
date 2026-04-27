function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "Bregieiro" && p === "doghouse") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Credenciais inválidas!";
  }
}
