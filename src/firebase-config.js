import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyAeWgSUCY3QzDvY3CqPzNhD5poTfQyyZn0",
  authDomain: "technokratos-40dd4.firebaseapp.com",
  projectId: "technokratos-40dd4",
  storageBucket: "technokratos-40dd4.appspot.com",
  messagingSenderId: "544313376623",
  appId: "1:544313376623:web:96624171549cb92601b29a",
  measurementId: "G-PNTMFJR085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Add this export