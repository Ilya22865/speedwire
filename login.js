
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
  } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  import {
    getFirestore,
    setDoc,
    doc
  } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Регистрация через email и пароль
  const registerForm = document.querySelector('.auth-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: new Date().toISOString()
        });

        alert('Регистрация успешна!');
        window.location.href = 'privacy.html';
      } catch (error) {
        alert(error.message);
      }
    });
  }

  if (registerForm && window.location.pathname.includes('privacy.html')) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Вы успешно вошли!');
          window.location.href = 'index.html';
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }

