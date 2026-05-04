const dbUrl = "https://doghouse-inteligente-default-rtdb.europe-west1.firebasedatabase.app";

// ====== LER DADOS ======
async function lerFirebase() {
    try {
        const res = await fetch(`${dbUrl}/.json`);
        const data = await res.json();

        // AC
        document.getElementById("temp").innerText = data.temperatura + " ºC";
        document.getElementById("modoAtual").innerText = data.modo;

        // Água
        document.getElementById("agua").innerText = data.agua + " cm";

        // Horários
        document.getElementById("f1hora").innerText =
            (data.f1hora < 10 ? "0" : "") + data.f1hora + ":" +
            (data.f1min < 10 ? "0" : "") + data.f1min;

        document.getElementById("f2hora").innerText =
            (data.f2hora < 10 ? "0" : "") + data.f2hora + ":" +
            (data.f2min < 10 ? "0" : "") + data.f2min;

        // Peso
        document.getElementById("pesoValor").innerText = data.peso + " kg";

    } catch (e) {
        console.log("Erro ao ler Firebase:", e);
    }
}

setInterval(lerFirebase, 1000);

// ====== MODO DO AR CONDICIONADO ======
async function mudarModoAC(novoModo) {
    await fetch(`${dbUrl}/modo.json`, {
        method: "PUT",
        body: JSON.stringify(novoModo)
    });
}

// ====== MODO DA RAÇÃO ======
async function mudarModoRacao(modo) {
    await fetch(`${dbUrl}/modoRacao.json`, {
        method: "PUT",
        body: JSON.stringify(modo)
    });
}

// ====== ALTERAR HORÁRIOS ======
async function alterarHora(feed, tipo) {
    let campo = "";

    if (feed === "F1" && tipo === "HORA") campo = "f1hora";
    if (feed === "F1" && tipo === "MIN")  campo = "f1min";
    if (feed === "F2" && tipo === "HORA") campo = "f2hora";
    if (feed === "F2" && tipo === "MIN")  campo = "f2min";

    const res = await fetch(`${dbUrl}/${campo}.json`);
    let valor = await res.json();

    valor++;

    if (campo.includes("hora") && valor >= 24) valor = 0;
    if (campo.includes("min")  && valor >= 60) valor = 0;

    await fetch(`${dbUrl}/${campo}.json`, {
        method: "PUT",
        body: JSON.stringify(valor)
    });
}
