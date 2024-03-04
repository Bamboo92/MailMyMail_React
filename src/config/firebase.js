// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClkICTujwoITfNdoj8KkBMIlSdiehtoKM",
    authDomain: "mailmymail-9f7bb.firebaseapp.com",
    databaseURL: "https://mailmymail-9f7bb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mailmymail-9f7bb",
    storageBucket: "mailmymail-9f7bb.appspot.com",
    messagingSenderId: "8863254035",
    appId: "1:8863254035:web:996c3f3e5105b8adc9e1e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);