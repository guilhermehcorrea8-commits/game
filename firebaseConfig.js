import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC10NbSgzOPHiDvulNd59-gOVnOZgJOH7I",
  authDomain: "gamejava-4.firebaseapp.com",
  databaseURL: "https://gamejava-4-default-rtdb.firebaseio.com",
  projectId: "gamejava-4",
  storageBucket: "gamejava-4.appspot.com",
  messagingSenderId: "825917948611",
  appId: "1:825917948611:web:60c5d0f2692706b3021876",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
