
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAD16QLkiOdOqej_9kBVWZriInD13AQ_6Q",
  authDomain: "reviews-deafc.firebaseapp.com",
  databaseURL: "https://reviews-deafc-default-rtdb.firebaseio.com",
  projectId: "reviews-deafc",
  storageBucket: "reviews-deafc.firebasestorage.app",
  messagingSenderId: "574622752514",
  appId: "1:574622752514:web:f62031dd859e198154ac1b"
};

  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId) {
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function() {
      messageDiv.style.opacity=0;
    }, 5000);
  }

const signup = document.getElementById('submit');
  signup.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const uname = document.getElementById('username').value;

    const auth = getAuth();

    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      const userData = {
        email: email, 
        uname: uname,
        password: password
      };
      showMessage('Аккаунт успешно создан', 'signUpMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef, userData)
      .then (()=>{
        window.location.href='privacy.html';
      })
      .catch((error)=>{
        console.error("Ошибка", error);
      });
    })
    .catch((error)=>{
      const errorCode = error.code;
      if(errorCode=='auth/email-already in use') {
        showMessage('Email Address Already Exists', 'signUpMessage');
      }
      else {
        showMessage('Такой email уже зарегестрирован', 'signUpMessage')
      }
    })  
  });