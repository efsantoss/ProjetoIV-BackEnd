// Configuração do Firebase

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB3ESa89xuAdueNLnSCNMMiOUuc6fhuAYU",
  authDomain: "energy-match.firebaseapp.com",
  databaseURL: "https://energy-match-default-rtdb.firebaseio.com",
  projectId: "energy-match",
  storageBucket: "energy-match.appspot.com",
  messagingSenderId: "1078857854189",
  appId: "1:1078857854189:web:b9a395b1b0d3f991b970e4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = {database, ref, set};