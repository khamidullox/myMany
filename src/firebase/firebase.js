// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOWyQ-_iSb5GJNVFN36opXMYArYlpoqe0",
  authDomain: "mymoney-72b85.firebaseapp.com",
  projectId: "mymoney-72b85",
  storageBucket: "mymoney-72b85.appspot.com",
  messagingSenderId: "181839411645",
  appId: "1:181839411645:web:ccd8879fb676880202bad4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);