import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
const signInForm = document.querySelector("#signInForm");
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const signInEmail = document.querySelector("#signInEmail").value;
  const signInPassword = document.querySelector("#signInPassword").value;
  const state = document.querySelector("#homeBody");
  const auth = getAuth();
  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    // try {
    //   // Signed in
    //   const user = userCredential.user;
    //   M.toast({ html: "Login Successfully", classes: "green" });
    //   // ...
    //   //   history.pushState(state, "Home", "home.html");
    //   setTimeout(location.assign("home.html"), 6000);
    // } catch (error) {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   M.toast({ html: errorMessage, classes: "red" });
    //   // ..
    // }
    .then((userCredential) => {
      const user = userCredential.user;

      // Assuming you have already initialized Firebase and connected to Firestore
      const db = getFirestore();

      // Retrieve the user's collection using their ID
      console.log(user.uid);
      const userCollectionRef = collection(db, user.uid);
      addDoc(userCollectionRef, {
        /* Any additional data for the user's collection */
      });

      // Perform any operations you need with the user's collection
      // For example, you can fetch documents, update data, etc.
      // ...
      const addDocumentEvent = new CustomEvent("addDocumentEvent", {
        detail: user,
      });
      document.dispatchEvent(addDocumentEvent);
      M.toast({ html: "Login Successfully", classes: "green" });
      setTimeout(() => {
        location.assign("home.html");
      }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      M.toast({ html: errorMessage, classes: "red" });
      // ..
    });
});
