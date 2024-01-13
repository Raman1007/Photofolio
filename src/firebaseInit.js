import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAlBJX83ZPMioMV3JmOeIT-HdtXdtQIvRU",
	authDomain: "photofolio-b85e0.firebaseapp.com",
	projectId: "photofolio-b85e0",
	storageBucket: "photofolio-b85e0.appspot.com",
	messagingSenderId: "1046566863728",
	appId: "1:1046566863728:web:9637e9b78f01e122c6c5b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
