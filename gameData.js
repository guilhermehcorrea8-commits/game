import { database } from "./firebaseConfig.js";
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const refDB = ref(database, "luta");

export async function salvarEstado(p1, p2) {
  const novo = push(refDB);

  await set(novo, {
    p1,
    p2,
    timestamp: Date.now()
  });
}

export async function buscarEstado() {
  const snap = await get(refDB);
  return snap.exists() ? snap.val() : {};
}