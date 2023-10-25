// Configuração do Firebase

const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyB3ESa89xuAdueNLnSCNMMiOUuc6fhuAYU",
    authDomain: "energy-match.firebaseapp.com",
    databaseURL: "https://energy-match-default-rtdb.firebaseio.com",
    projectId: "energy-match",
    storageBucket: "energy-match.appspot.com",
    messagingSenderId: "1078857854189",
    appId: "1:1078857854189:web:b9a395b1b0d3f991b970e4"
  };
  
admin.initializeApp(firebaseConfig);

const db = admin.database();

module.exports = db;