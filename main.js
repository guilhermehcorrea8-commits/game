import { salvarEstado } from "./gameData.js";

let p1X = 100, p1Vx = 0;
let p2X = window.innerWidth - 220, p2Vx = 0;

let p1Vida = 100, p2Vida = 100;

let p1Defesa = false, p2Defesa = false;
let p1Cooldown = 0, p2Cooldown = 0;

let jogoAcabou = false;

let keysPressed = new Set();

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const vidaP1 = document.getElementById("vidaP1");
const vidaP2 = document.getElementById("vidaP2");

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* CONTROLES */
document.addEventListener("keydown", e => {
  keysPressed.add(e.key.toLowerCase());

  if (e.key.toLowerCase() === "r") reiniciarJogo();

  // ATAQUES
  if (e.key === "w" && p1Cooldown <= 0) atacar(1, "SOCO");
  if (e.key === "e" && p1Cooldown <= 0) atacar(1, "CHUTE");
  if (e.key === "q" && p1Cooldown <= 0) especial(1);

  if (e.key === "ArrowUp" && p2Cooldown <= 0) atacar(2, "SOCO");
  if (e.key === "o" && p2Cooldown <= 0) atacar(2, "CHUTE");
  if (e.key === "p" && p2Cooldown <= 0) especial(2);
});

document.addEventListener("keyup", e => {
  keysPressed.delete(e.key.toLowerCase());
});

/* ATAQUE */
function atacar(player, tipo) {
  let dano = tipo === "CHUTE" ? 14 : 10;

  if (player === 1) {
    p1Cooldown = 20;

    if (Math.abs(p1X - p2X) < 140) {
      if (p2Defesa) dano *= 0.2;
      p2Vida -= dano;
    }
  }

  if (player === 2) {
    p2Cooldown = 20;

    if (Math.abs(p1X - p2X) < 140) {
      if (p1Defesa) dano *= 0.2;
      p1Vida -= dano;
    }
  }
}

/* ESPECIAL */
function especial(player) {
  if (player === 1) {
    p1Cooldown = 60;

    if (Math.abs(p1X - p2X) < 180) {
      p2Vida -= p2Defesa ? 10 : 35;
    }
  }

  if (player === 2) {
    p2Cooldown = 70;

    if (Math.abs(p1X - p2X) < 180) {
      p1Vida -= p1Defesa ? 10 : 45;
    }
  }
}

/* MOVIMENTO */
function movimento() {
  p1Vx *= 0.85;
  if (keysPressed.has("a")) p1Vx -= 0.4;
  if (keysPressed.has("d")) p1Vx += 0.4;
  p1X += p1Vx;

  p2Vx *= 0.85;
  if (keysPressed.has("arrowleft")) p2Vx -= 0.4;
  if (keysPressed.has("arrowright")) p2Vx += 0.4;
  p2X += p2Vx;

  p1Defesa = keysPressed.has("s");
  p2Defesa = keysPressed.has("arrowdown");
}

/* GAME OVER */
function fimDeJogo(msg) {
  if (jogoAcabou) return;

  jogoAcabou = true;

  const tela = document.createElement("div");
  tela.innerHTML = `<h1>${msg}</h1><p>Reiniciando...</p>`;
  tela.style = `
    position:fixed;top:50%;left:50%;
    transform:translate(-50%,-50%);
    background:#000;color:#0f0;
    padding:20px;z-index:999;
  `;
  document.body.appendChild(tela);

  setTimeout(reiniciarJogo, 3000);
}

/* RESTART */
function reiniciarJogo() {
  location.reload();
}

document.getElementById("btnRestart").onclick = reiniciarJogo;

/* LOOP */
function atualizar() {
  if (jogoAcabou) return;

  movimento();

  if (p1Cooldown > 0) p1Cooldown--;
  if (p2Cooldown > 0) p2Cooldown--;

  p1X = clamp(p1X, 20, window.innerWidth - 300);
  p2X = clamp(p2X, 220, window.innerWidth - 120);

  p1.style.left = p1X + "px";
  p2.style.left = p2X + "px";

  vidaP1.style.width = Math.max(0, p1Vida) + "%";
  vidaP2.style.width = Math.max(0, p2Vida) + "%";

  document.getElementById("cdP1").textContent = p1Cooldown;
  document.getElementById("cdP2").textContent = p2Cooldown;

  if (p1Vida <= 0) fimDeJogo("🏆 PLAYER 2 venceu");
  if (p2Vida <= 0) fimDeJogo("🏆 PLAYER 1 venceu");

  // FIREBASE
  if (!window.lastSend) window.lastSend = 0;
  if (Date.now() - window.lastSend > 5000) {
    salvarEstado(p1Vida, p2Vida);
    window.lastSend = Date.now();
  }

  requestAnimationFrame(atualizar);
}

atualizar();