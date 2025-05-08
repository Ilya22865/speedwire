
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
  const signIn=document.getElementById('submitSignIn');

  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential)=>{
        showMessage('Вы вошли в аккаунт', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('LoggedInUserId', user.uid);
        window.location.href="index.html";
      })
      .catch((error)=>{
        const errorCode = error.code;
        if(errorCode=='auth/invalid') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else {
          showMessage('Аккаунт не существует', 'signInMessage');
        }
      })
    });