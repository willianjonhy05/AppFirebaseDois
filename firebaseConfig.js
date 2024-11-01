import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyChoFiUW0sHh8wPAFV5TeY4QyXbJyz95dU",
    authDomain: "projetoaguia-5673d.firebaseapp.com",
    projectId: "projetoaguia-5673d",
    storageBucket: "projetoaguia-5673d.firebasestorage.app",
    messagingSenderId: "109331530015",
    appId: "1:109331530015:web:7a59ac8b0a667d1e44f02a",
    measurementId: "G-ZMPE78BD7K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const auth = getAuth(app);
export default app;


const db = getFirestore(app);
export { db };

