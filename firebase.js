import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyCpFdHx0Oya7mtL3xg7jmzLsiqKLKw9was",
//     authDomain: "crud-52192.firebaseapp.com",
//     projectId: "crud-52192",
//     storageBucket: "crud-52192.firebasestorage.app",
//     messagingSenderId: "694774952264",
//     appId: "1:694774952264:web:d187c2892a482436e5437d"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDlRBSNMzZ0q-tymW0l-8xmiRlFRk9J-6g",
    authDomain: "final-year-proj-1cf9a.firebaseapp.com",
    projectId: "final-year-proj-1cf9a",
    storageBucket: "final-year-proj-1cf9a.firebasestorage.app",
    messagingSenderId: "34064956908",
    appId: "1:34064956908:web:025180297b2510b2b214c9",
    measurementId: "G-S290FV39NL"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db}