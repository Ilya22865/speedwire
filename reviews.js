const firebaseConfig = {
    apiKey: "AIzaSyAD16QLkiOdOqej_9kBVWZriInD13AQ_6Q",
    authDomain: "reviews-deafc.firebaseapp.com",
    databaseURL: "https://reviews-deafc-default-rtdb.firebaseio.com",
    projectId: "reviews-deafc",
    storageBucket: "reviews-deafc.firebasestorage.app",
    messagingSenderId: "574622752514",
    appId: "1:574622752514:web:695b649082dfb8b454ac1b"
  };

  firebase.initializeApp(firebaseConfig);

  var reviewsDB = firebase.database().ref('reviews');

  document.getElementById('comment-form').addEventListener("submit", submitForm);

  loadReviews();
 
  function submitForm(e) {
    e.preventDefault(); 
    var car = getElementVal('comment-car');
    var name = getElementVal('comment-name');
    var text = getElementVal('comment-text');

    saveMessages(car, name, text);
  }

  const saveMessages = (car, name, text) => {
    var newReviewForm = reviewsDB.push();

    newReviewForm.set({
        car : car,
        name : name,
        text : text,
        timestamp: Date.now()
    })
  };

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }

  

  function loadReviews() {
    console.log("Загрузка отзывов...");
    reviewsDB.on('value', (snapshot) => {
        if(snapshot.exists()) { 
            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = '<h3>Последние отзывы</h3>'; 

            snapshot.forEach((childSnapshot) => {
                const review = childSnapshot.val();
                addReviewToDOM(review);
            });
        } else {
            console.log("Нет данных для отображения.");
        }
    }, (error) => {
        console.error("Ошибка при чтении данных:", error);
    });
}


function addReviewToDOM(review) {
    console.log("Добавление отзыва:", review);
    
    const commentsList = document.getElementById('comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';

    const date = new Date(review.timestamp);
    const formattedDate = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-car-model">${review.car}</span>
            <span class="comment-author">${review.name}</span>
            <span class="comment-date">${formattedDate}</span>
        </div>
        <div class="comment-text">${review.text}</div>
    `;

    commentsList.appendChild(commentElement);
}