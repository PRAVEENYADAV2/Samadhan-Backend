import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCWfXlXCjxnk6YcAcGzkI8P61YALgUIklc",
    authDomain: "samadhan-c6d69.firebaseapp.com",
    projectId: "samadhan-c6d69",
    storageBucket: "samadhan-c6d69.firebasestorage.app",
    messagingSenderId: "354370728490",
    appId: "1:354370728490:web:d6dee4cfbfd9584d460953",
    measurementId: "G-673RGPPVLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;