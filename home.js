import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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
const db = getFirestore(app);

const pollSection = document.querySelector("#pollSection");
const createPollButton = document.querySelector("#createPollButton");
createPollButton.addEventListener("click", () => {
  const createForm = document.createElement("form");
  createForm.classList.add("pollDataForm");
  const question = document.createElement("input");
  question.type = "text";
  question.id = "question";
  question.classList.add("question");
  question.placeholder = "question";
  createForm.appendChild(question);
  const option1 = document.createElement("input");
  option1.type = "text";
  option1.id = "option1";
  option1.classList.add("option");
  option1.placeholder = "option1";
  createForm.appendChild(option1);
  const option2 = document.createElement("input");
  option2.type = "text";
  option2.id = "option2";
  option2.classList.add("option");
  option2.placeholder = "option2";
  createForm.appendChild(option2);
  const option3 = document.createElement("input");
  option3.type = "text";
  option3.id = "option3";
  option3.classList.add("option");
  option3.placeholder = "option3";
  createForm.appendChild(option3);
  const option4 = document.createElement("input");
  option4.type = "text";
  option4.id = "option4";
  option4.classList.add("option");
  option4.placeholder = "option4";
  createForm.appendChild(option4);
  const submitBtn = document.createElement("input");
  submitBtn.type = "submit";
  submitBtn.value = "submit";
  createForm.appendChild(submitBtn);
  pollSection.appendChild(createForm);
  createForm.addEventListener("submit", async (e) => {
    const question = document.querySelector("#question");
    const option1 = document.querySelector("#option1").value;
    const option2 = document.querySelector("#option2").value;
    const option3 = document.querySelector("#option3").value;
    const option4 = document.querySelector("#option4").value;
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth;
      console.log(user);
      if (user) {
        const docRef = await addDoc(
          collection(db, "nM9UznWeFZcUP6NuShYoQbUxezr1"),
          {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
          }
        );
        console.log("Document written with ID: ", docRef.id);
      } else {
        // User not signed in or user object is null
        console.log("User not signed in.");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    document.querySelector(".pollDataForm").style.display = "none";
  });
});

const poll = {
  question: "What's your favourite language?",
  answers: ["Python", "JavaScript", "C++", "Java"],
};
