// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRi98dRLVaKNgE9QTnEnBtKkAQ_O1iX44",
  authDomain: "web-frontend-template.firebaseapp.com",
  projectId: "web-frontend-template",
  storageBucket: "web-frontend-template.firebasestorage.app",
  messagingSenderId: "516359169571",
  appId: "1:516359169571:web:72005d0d297795b086b396",
  measurementId: "G-ZJYT85N4CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)



export { app, auth };
