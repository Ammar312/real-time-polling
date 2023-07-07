import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBdM7o1dRbeC9Mh4PkqOl7cn6zNXJ4O9Q",
  authDomain: "real-time-polling-e7bd2.firebaseapp.com",
  projectId: "real-time-polling-e7bd2",
  storageBucket: "real-time-polling-e7bd2.appspot.com",
  messagingSenderId: "917426460543",
  appId: "1:917426460543:web:a7934ddf17f0827a11ec4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const signUpForm = document.querySelector("#signUpForm");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const signUpEmail = document.querySelector("#signUpEmail").value;
  const signUpPassword = document.querySelector("#signUpPassword").value;
  const state = document.querySelector("#homeBody");
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      const user = userCredential.user;

      // Create a collection in Firestore with the user's ID as the collection name
      const db = getFirestore();
      const userCollectionRef = collection(db, user.uid);
      addDoc(userCollectionRef, {});
      try {
        // Collection created successfully
        M.toast({ html: "Sign Up Successfully", classes: "green" });
        setTimeout(() => {
          location.assign("home.html");
        }, 3000);
      } catch (error) {
        // Error creating the collection
        console.error("Error creating user collection:", error);
        M.toast({ html: "Error creating user collection", classes: "red" });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      M.toast({ html: errorMessage, classes: "red" });
      // ..
    });
});

// create a poll
