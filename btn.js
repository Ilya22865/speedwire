import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  const signInButton = document.getElementById("submitSignIn");
  const profileButton = document.getElementById("profileButton");

  if (user) {
    // Пользователь вошёл — скрываем кнопку "Войти", показываем "Профиль"
    if (signInButton) signInButton.style.display = "none";
    if (profileButton) profileButton.style.display = "inline-block";
  } else {
    // Не вошёл — показываем "Войти", скрываем "Профиль"
    if (signInButton) signInButton.style.display = "inline-block";
    if (profileButton) profileButton.style.display = "none";
  }
});
