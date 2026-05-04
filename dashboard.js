const dbUrl = "https://doghouse-inteligente-default-rtdb.europe-west1.firebasedatabase.app";

// ====== LER DADOS ======
async function lerFirebase() {
    try {
        const res = await fetch(`${dbUrl}/.json`);
        const data = await res.json();

        if (!data) return;

        // ESP32 nº1
        if (data.temperatura !== undefined)
            document.getElementById("temp").innerText = data.temperatura + " ºC";

        if (data.agua !== undefined)
            document.getElementById("agua").innerText = data.agua + " cm";

        if (data.modo !== undefined)
            document.getElementById("modoAtual").innerText = data.modo;

        // ESP32 nº2
        if (data.peso !== undefined)
            document.getElementById("peso").innerText = data.peso.toFixed(2) + " kg";

        const f1h = data.f1hora ?? 0;
        const f1m = data.f1min  ?? 0;
        const f2h = data.f2hora ?? 0;
        const f2m = data.f2min  ?? 0;

        document.getElementById("f1hora").innerText =
            String(f1h).padStart(2, "0") + ":" + String(f1m).padStart(2, "0");

        document.getElementById("f2hora").innerText =
            String(f2h).padStart(2, "0") + ":" + String(f2m).padStart(2, "0");

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

// ====== ALTERAR HORÁRIOS F1 / F2 ======
async function alterarHora(feed, tipo) {
    try {
        const res = await fetch(`${dbUrl}/.json`);
        const data = await res.json();

        let campoHora = feed === "F1" ? "f1hora" : "f2hora";
        let campoMin  = feed === "F1" ? "f1min"  : "f2min";

        let hora = data[campoHora] ?? 0;
        let min  = data[campoMin]  ?? 0;

        if (tipo === "HORA") hora = (hora + 1) % 24;
        if (tipo === "MIN")  min  = (min + 1) % 60;

        await fetch(`${dbUrl}/${campoHora}.json`, {
            method: "PUT",
            body: JSON.stringify(hora)
        });

        await fetch(`${dbUrl}/${campoMin}.json`, {
            method: "PUT",
            body: JSON.stringify(min)
        });

    } catch (e) {
        console.log("Erro ao alterar horário:", e);
    }
}
