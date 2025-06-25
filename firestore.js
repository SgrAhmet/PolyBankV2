// npm install firebase



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBYyE8570ObNwOsgvk4OSdGEbprvnzJXs0",
//   authDomain: "polybank-78db6.firebaseapp.com",
//   projectId: "polybank-78db6",
//   storageBucket: "polybank-78db6.firebasestorage.app",
//   messagingSenderId: "805185665526",
//   appId: "1:805185665526:web:3663e2b686df041c1aefd7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Firebase projenizin konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyBYyE8570ObNwOsgvk4OSdGEbprvnzJXs0",
  authDomain: "polybank-78db6.firebaseapp.com",
  projectId: "polybank-78db6",
  storageBucket: "polybank-78db6.firebasestorage.app",
  messagingSenderId: "805185665526",
  appId: "1:805185665526:web:3663e2b686df041c1aefd7"
	};                                   

// Firebase'i başlatma
const app = initializeApp(firebaseConfig);

// Firestore'u başlatma
const db = getFirestore(app);

export { db };


