import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl36Y7rF6wqIdZAIX-xMJwzOZnjjACx4I",
  authDomain: "todolist-18049.firebaseapp.com",
  projectId: "todolist-18049",
  storageBucket: "todolist-18049.appspot.com",
  messagingSenderId: "1024417491750",
  appId: "1:1024417491750:web:225fd740edc858014a6fe7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
