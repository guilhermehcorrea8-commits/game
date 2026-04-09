import { salvarEstado } from "./gameData.js";

let p1X = 100, p1Vx = 0;
let p2X = window.innerWidth - 220, p2Vx = 0;

let p1Vida = 100, p2Vida = 100;
let p1Cooldown = 0, p2Cooldown = 0;

let p1Defesa = false, p2Defesa = false;
let jogoAcabou = false;

let keys = new Set();

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const vidaP1 = document.getElementById("vidaP1");
const vidaP2 = document.getElementById("vidaP2");

const p1Img = document.getElementById("p1img");
const p2Img = document.getElementById("p2img");

/* SPRITES CORRIGIDOS */
const spritesP1 = {
  IDLE: "./imagens/Gemini_Generated_Image_4w6ctc4w6ctc4w6c.png",
  SOCO: "./imagens/Gemini_Generated_Image_2703an2703an2703.png",
  CHUTE: "./imagens/Gemini_Generated_Image_l3yczwl3yczwl3yc.png",
  DEFESA: "./imagens/Gemini_Generated_Image_gw8dvmgw8dvmgw8d.png",
  CORRER: "./imagens/Gemini_Generated_Image_2c86rh2c86rh2c86.png",
  ESPECIAL: "./imagens/Gemini_Generated_Image_3d02v03d02v03d02.png",
};

const spritesP2 = {
  IDLE: "./imagens/Gemini_Generated_Image_l88erjl88erjl88e.png",
  SOCO: "./imagens/Gemini_Generated_Image_inom8ninom8ninom.png",
  CHUTE: "./imagens/Gemini_Generated_Image_w4oc5dw4oc5dw4oc.png",
  DEFESA: "./imagens/Gemini_Generated_Image_l88erjl88erjl88e.png",
  CORRER: "./imagens/Gemini_Generated_Image_577txo577txo577t.png",
  ESPECIAL1: "./imagens/Gemini_Generated_Image_y3ltr0y3ltr0y3lt.png",
  ESPECIAL2: "./imagens/Gemini_Generated_Image_riho7oriho7oriho.png",
  ESPECIAL3: "./imagens/Gemini_Generated_Image_bnydkebnydkebnyd.png",
};

function trocarImagem(player, estado) {
  const img = player === 1 ? p1Img : p2Img;
  const sprites = player === 1 ? spritesP1 : spritesP2;

  if (!sprites[estado]) return;

  img.src = sprites[estado];

  if (estado.includes("SOCO") || estado.includes("CHUTE")) {
    img.style.filter = "drop-shadow(0 0 15px red)";
  } else if (estado.includes("ESPECIAL")) {
    img.style.filter = "drop-shadow(0 0 20px magenta)";
  } else {
    img.style.filter = "drop-shadow(0 0 10px white)";
  }
}

/* CONTROLES */
document.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());

  if (e.key === "r") location.reload();

  if (e.key === "w" && p1Cooldown <= 0) atacar(1, "SOCO");
  if (e.key === "e" && p1Cooldown <= 0) atacar(1, "CHUTE");
  if (e.key === "q" && p1Cooldown <= 0) especial(1);

  if (e.key === "ArrowUp" && p2Cooldown <= 0) atacar(2, "SOCO");
  if (e.key === "o" && p2Cooldown <= 0) atacar(2, "CHUTE");
  if (e.key === "p" && p2Cooldown <= 0) especial(2);
});

document.addEventListener("keyup", (e) => {
  keys.delete(e.key.toLowerCase());
});

/* ATAQUE */
function atacar(player, tipo) {
  let dano = tipo === "CHUTE" ? 14 : 10;

  if (player === 1) {
    p1Cooldown = 20;
    trocarImagem(1, tipo);

    if (Math.abs(p1X - p2X) < 140) {
      if (p2Defesa) dano *= 0.2;
      p2Vida -= dano;
    }

    setTimeout(() => trocarImagem(1, "IDLE"), 400);
  }

  if (player === 2) {
    p2Cooldown = 20;
    trocarImagem(2, tipo);

    if (Math.abs(p1X - p2X) < 140) {
      if (p1Defesa) dano *= 0.2;
      p1Vida -= dano;
    }

    setTimeout(() => trocarImagem(2, "IDLE"), 400);
  }
}

/* ESPECIAL */
function especial(player) {
  if (player === 1) {
    p1Cooldown = 60;
    trocarImagem(1, "ESPECIAL");

    setTimeout(() => {
      if (Math.abs(p1X - p2X) < 180) {
        p2Vida -= p2Defesa ? 10 : 35;
      }
      trocarImagem(1, "IDLE");
    }, 800);
  }

  if (player === 2) {
    p2Cooldown = 70;

    trocarImagem(2, "ESPECIAL1");
    setTimeout(() => trocarImagem(2, "ESPECIAL2"), 300);

    setTimeout(() => {
      trocarImagem(2, "ESPECIAL3");

      if (Math.abs(p1X - p2X) < 180) {
        p1Vida -= p1Defesa ? 10 : 45;
      }
    }, 600);

    setTimeout(() => trocarImagem(2, "IDLE"), 1000);
  }
}

/* MOVIMENTO */
function movimento() {
  p1Vx *= 0.85;
  if (keys.has("a")) p1Vx -= 0.4;
  if (keys.has("d")) p1Vx += 0.4;
  p1X += p1Vx;

  p1Defesa = keys.has("s");

  if (p1Defesa) trocarImagem(1, "DEFESA");
  else if (Math.abs(p1Vx) > 1) trocarImagem(1, "CORRER");

  p2Vx *= 0.85;
  if (keys.has("arrowleft")) p2Vx -= 0.4;
  if (keys.has("arrowright")) p2Vx += 0.4;
  p2X += p2Vx;

  p2Defesa = keys.has("arrowdown");

  if (p2Defesa) trocarImagem(2, "DEFESA");
  else if (Math.abs(p2Vx) > 1) trocarImagem(2, "CORRER");
}

/* LOOP */
function update() {
  if (jogoAcabou) return;

  movimento();

  p1.style.left = p1X + "px";
  p2.style.left = p2X + "px";

  vidaP1.style.width = p1Vida + "%";
  vidaP2.style.width = p2Vida + "%";

  if (p1Cooldown > 0) p1Cooldown--;
  if (p2Cooldown > 0) p2Cooldown--;

  document.getElementById("cdP1").textContent = p1Cooldown;
  document.getElementById("cdP2").textContent = p2Cooldown;

  if (p1Vida <= 0) fim("PLAYER 2 venceu");
  if (p2Vida <= 0) fim("PLAYER 1 venceu");

  if (!window.lastSend) window.lastSend = 0;
  if (Date.now() - window.lastSend > 5000) {
    salvarEstado(p1Vida, p2Vida);
    window.lastSend = Date.now();
  }

  requestAnimationFrame(update);
}

function fim(msg) {
  jogoAcabou = true;
  alert(msg);
  location.reload();
}

/* INICIO */
trocarImagem(1, "IDLE");
trocarImagem(2, "IDLE");
update();