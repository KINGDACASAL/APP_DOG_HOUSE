const dbUrl = "https://doghouse-inteligente-default-rtdb.europe-west1.firebasedatabase.app";

// ====== LER DADOS ======
async function lerFirebase() {
    try {
        const res = await fetch(`${dbUrl}/.json`);
        const data = await res.json();

        document.getElementById("temp").innerText = data.temperatura + " ºC";
        document.getElementById("agua").innerText = data.agua + " cm";
        document.getElementById("modoAtual").innerText = data.modo;
    } catch (e) {
        console.log("Erro ao ler Firebase:", e);
    }
}

// Atualiza a cada 1 segundo
setInterval(lerFirebase, 1000);

// ====== MUDAR MODO ======
async function mudarModo(novoModo) {
    try {
        await fetch(`${dbUrl}/modo.json`, {
            method: "PUT",
            body: JSON.stringify(novoModo)
        });
    } catch (e) {
        console.log("Erro ao mudar modo:", e);
    }
}
