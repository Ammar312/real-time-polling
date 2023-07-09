import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
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
const pollCreateSection = document.querySelector("#pollCreateSection");
const createPollButton = document.querySelector("#createPollButton");
createPollButton.addEventListener("click", () => {
  const pollDataFormDiv = document.createElement("div");
  pollDataFormDiv.classList.add("pollDataFormDiv");
  const createForm = document.createElement("form");
  createForm.classList.add("pollDataForm");
  createForm.id = "pollDataForm";
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
  submitBtn.classList.add("submitBtn");
  createForm.appendChild(submitBtn);
  pollDataFormDiv.appendChild(createForm);
  pollSection.appendChild(pollDataFormDiv);
  createForm.addEventListener("submit", async (e) => {
    const question = document.querySelector("#question").value;
    const option1 = document.querySelector("#option1").value;
    const option2 = document.querySelector("#option2").value;
    const option3 = document.querySelector("#option3").value;
    const option4 = document.querySelector("#option4").value;
    e.preventDefault();

    try {
      //   const auth = getAuth();
      //   const user = auth;
      //   console.log(user);

      const docRef = await addDoc(collection(db, "poll"), {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);

      createForm.reset();
      document.querySelector(".pollDataFormDiv").remove();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
});

window.addEventListener("load", () => {
  const q = query(collection(db, "poll"), orderBy("createdAt"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    pollCreateSection.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const pollDiv = document.createElement("div");
      pollDiv.classList.add("pollDiv");
      const pollQuestionDiv = document.createElement("div");
      pollQuestionDiv.innerText = `${doc.data().question}`;
      pollQuestionDiv.classList.add("pollQuestionDiv");
      const pollOptionsDiv = document.createElement("div");
      const pollOption1Div = document.createElement("div");
      pollOption1Div.classList.add("pollOption");
      const pollOption1DivSpan = document.createElement("span");
      pollOption1DivSpan.innerText = `${doc.data().option1}`;
      const pollOption1DivSpanPercentage = document.createElement("span");
      pollOption1DivSpanPercentage.innerText = `%`;
      pollOption1Div.appendChild(pollOption1DivSpan);
      pollOption1Div.appendChild(pollOption1DivSpanPercentage);
      pollOptionsDiv.appendChild(pollOption1Div);
      const pollOption2Div = document.createElement("div");
      pollOption2Div.classList.add("pollOption");
      const pollOption2DivSpan = document.createElement("span");
      pollOption2DivSpan.innerText = `${doc.data().option2}`;
      const pollOption2DivSpanPercentage = document.createElement("span");
      pollOption2DivSpanPercentage.innerText = `%`;
      pollOption2Div.appendChild(pollOption2DivSpan);
      pollOption2Div.appendChild(pollOption2DivSpanPercentage);
      pollOptionsDiv.appendChild(pollOption2Div);
      const pollOption3Div = document.createElement("div");
      pollOption3Div.classList.add("pollOption");
      const pollOption3DivSpan = document.createElement("span");
      pollOption3DivSpan.innerText = `${doc.data().option3}`;
      const pollOption3DivSpanPercentage = document.createElement("span");
      pollOption3DivSpanPercentage.innerText = `%`;
      pollOption3Div.appendChild(pollOption3DivSpan);
      pollOption3Div.appendChild(pollOption3DivSpanPercentage);
      pollOptionsDiv.appendChild(pollOption3Div);
      const pollOption4Div = document.createElement("div");
      pollOption4Div.classList.add("pollOption");
      const pollOption4DivSpan = document.createElement("span");
      pollOption4DivSpan.innerText = `${doc.data().option4}`;
      const pollOption4DivSpanPercentage = document.createElement("span");
      pollOption4DivSpanPercentage.innerText = `%`;
      pollOption4Div.appendChild(pollOption4DivSpan);
      pollOption4Div.appendChild(pollOption4DivSpanPercentage);
      pollOptionsDiv.appendChild(pollOption4Div);
      pollDiv.appendChild(pollQuestionDiv);
      pollDiv.appendChild(pollOptionsDiv);
      pollCreateSection.appendChild(pollDiv);
      //   pollOption1Div.addEventListener("click", () => vote(doc.id, "option1"));
      //   pollOption2Div.addEventListener("click", () => vote(doc.id, "option2"));
      //   pollOption3Div.addEventListener("click", () => vote(doc.id, "option3"));
      //   pollOption4Div.addEventListener("click", () => vote(doc.id, "option4"));
      pollOptionsDiv.addEventListener("click", () => {
        const pollId = doc.id;
        console.log(pollId);
        // const option = pollOptionsDiv.getAttribute("data-option");
        // vote(pollId, option);
      });
    });
  });
});

const calculatePercentage = (votes, totalVotes) => {
  if (totalVotes === 0) return "0%";
  return ((votes / totalVotes) * 100).toFixed(2) + "%";
};

// ...

// const poll = {
//   question: "What's your favourite language?",
//   answers: ["Python", "JavaScript", "C++", "Java"],
//   pollCount: 20,
//   answersWeight: [4, 4, 2, 10],
//   SelectedAnswer: -1,
// };
// let pollDom = {
//   question: document.querySelector(".poll .question"),
//   answers: document.querySelector(".poll .answers"),
// };
// pollDom.question.innerText = poll.question;
// pollDom.answers.innerHTML = poll.answers
//   .map((answer, i) => {
//     return `<div class="answer" onclick = "markAnswer('${i}')">
//         ${answer}
//         <span class = "percentageBar"></span>
//         <span class = "percentageValue"></span>
//         `;
//   })
//   .join("");

// const markAnswer = (i) => {
//   poll.SelectedAnswer = +i;
//   try {
//     document
//       .querySelector(".poll .answers .answer .selected ")
//       .classList.remove("selected");
//   } catch (msg) {}
//   document
//     .querySelectorAll(".poll .answers .answer ")
//     [+i].classList.add("selected");
//   showResults();
// };

// const showResults = () => {
//   let answers = document.querySelector("poll .answers .answer");
//   for (let i = 0; i < answers.length; i++) {
//     let percentage = 0;
//     if (i === poll.SelectedAnswer) {
//       percentage = Math.round(
//         ((poll.answersWeight[i] + 1) * 100) / (poll.pollCount + 1)
//       );
//     } else {
//       percentage = Math.round(
//         (poll.answersWeight[i] * 100) / (poll.pollCount + 1)
//       );
//     }
//     answers[i].querySelector(".percentageBar").style.width = percentage + "%";
//     answers[i].querySelector(".percentageValue").innerText = percentage + "%";
//   }
// };
