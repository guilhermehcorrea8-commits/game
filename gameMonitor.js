import { buscarEstado } from "./gameData.js";

let grafico;

async function atualizarGrafico() {
  const dados = await buscarEstado();

  let labels = [];
  let p1 = [];
  let p2 = [];

  for (let id in dados) {
    const d = dados[id];
    labels.push(new Date(d.timestamp).toLocaleTimeString());
    p1.push(d.p1);
    p2.push(d.p2);
  }

  labels = labels.slice(-10);
  p1 = p1.slice(-10);
  p2 = p2.slice(-10);

  const ctx = document.getElementById("graficoJogo");

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "P1 Vida", data: p1, borderColor: "lime" },
        { label: "P2 Vida", data: p2, borderColor: "red" }
      ]
    }
  });
}

setInterval(atualizarGrafico, 3000);