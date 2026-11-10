import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABtZfdlhbwSza5kM73Rwe1mT9T9V3Ghhc",
  authDomain: "nexa-data-gh.firebaseapp.com",
  projectId: "nexa-data-gh",
  storageBucket: "nexa-data-gh.firebasestorage.app",
  messagingSenderId: "617621041121",
  appId: "1:617621041121:web:e1cf0ca0c89f389bf72ca0",
  measurementId: "G-6N9LWKD3Y0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
