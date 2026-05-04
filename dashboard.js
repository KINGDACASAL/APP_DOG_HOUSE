const dbUrl = "https://doghouse-inteligente-default-rtdb.europe-west1.firebasedatabase.app";

// Atualizar peso em tempo real
function atualizarPeso() {
    fetch(`${dbUrl}/peso.json`)
        .then(r => r.json())
        .then(peso => {
            document.getElementById("pesoValor").innerText = peso + " kg";
        });
}
setInterval(atualizarPeso, 1500);

// Alterar horários
function alterarHora(feed, tipo) {
    let campo = "";

    if (feed === "F1" && tipo === "HORA") campo = "f1hora";
    if (feed === "F1" && tipo === "MIN")  campo = "f1min";
    if (feed === "F2" && tipo === "HORA") campo = "f2hora";
    if (feed === "F2" && tipo === "MIN")  campo = "f2min";

    fetch(`${dbUrl}/${campo}.json`)
        .then(r => r.json())
        .then(valor => {
            let novo = valor + 1;

            if (campo.includes("hora") && novo >= 24) novo = 0;
            if (campo.includes("min")  && novo >= 60) novo = 0;

            fetch(`${dbUrl}/${campo}.json`, {
                method: "PUT",
                body: JSON.stringify(novo)
            });
        });
}

// Mudar para modo RUN
function mudarParaRun() {
    fetch(`${dbUrl}/modo.json`, {
        method: "PUT",
        body: JSON.stringify("RUN")
    });
}
