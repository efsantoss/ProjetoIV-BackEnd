// Configuração do Firebase
//referencia eh o caminho q eu quero salvar

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child, push } = require("firebase/database");
const { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
  } = require('firebase/auth');

class Firebase {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyB3ESa89xuAdueNLnSCNMMiOUuc6fhuAYU",
      authDomain: "energy-match.firebaseapp.com",
      databaseURL: "https://energy-match-default-rtdb.firebaseio.com",
      projectId: "energy-match",
      storageBucket: "energy-match.appspot.com",
      messagingSenderId: "1078857854189",
      appId: "1:1078857854189:web:b9a395b1b0d3f991b970e4"
    };

    this.app = initializeApp(this.firebaseConfig);

    this.database = getDatabase(this.app);

    this.auth = getAuth();
  }

  saveData(reference, value) {
    const databaseRef = ref(this.database, reference);
    
    set(databaseRef, value);
  }

  pushData(reference, value) {
    const databaseRef = ref(this.database, reference);
    
    push(databaseRef, value);
  }

  getData(reference) {
    const databaseRef = ref(this.database);

    get(child(databaseRef, `${reference}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return Error("No data found");
      }
    })
  }
  
  async signIn(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log(userCredential.user);
  
        if (userCredential.user) {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        return error;
      });
  }

  async createUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        
      if (userCredential.user) {
        return true;
      } else {
        return false;
      }
    } catch(error) {
      return error;
    }
  }

}

module.exports = Firebase;