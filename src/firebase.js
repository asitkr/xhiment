import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTIz50NWsIVuYSbF160PrrICmDP-Pv9ZE",
    authDomain: "xhipment-assignment.firebaseapp.com",
    projectId: "xhipment-assignment",
    storageBucket: "xhipment-assignment.appspot.com",
    messagingSenderId: "27633269202",
    appId: "1:27633269202:web:c8b43d84cbe2af6fbf700b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();