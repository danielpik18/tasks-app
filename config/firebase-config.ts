// Import the functions you need from the SDKs you need
import { AuthContext } from "@/contexts/AuthContext";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5f01FLJ4U50D3at6q9I6GS0_4pe8Fm6o",
    authDomain: "nextjs-tasks-app.firebaseapp.com",
    projectId: "nextjs-tasks-app",
    storageBucket: "nextjs-tasks-app.appspot.com",
    messagingSenderId: "859270681236",
    appId: "1:859270681236:web:68b6a36e23544dad95da81",
    measurementId: "G-C0J5E983CH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
