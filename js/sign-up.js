// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlQ_MzxTHQ-dQdq0Dc5qWuBpvH2YufOH4",
  authDomain: "aromacrates.firebaseapp.com",
  databaseURL: "https://aromacrates-default-rtdb.firebaseio.com",
  projectId: "aromacrates",
  storageBucket: "aromacrates.appspot.com",
  messagingSenderId: "420220632902",
  appId: "1:420220632902:web:22d273413b5624ec0fef47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Handling the Sign-Up Process
const submit = document.getElementById('sign-up-button');
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById('inputEmail3').value;
  const password = document.getElementById('inputPassword3').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("User created successfully");
      // Additional actions here...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});








/*
const auth = firebase.auth();
const database = firebase.database();

function register() {
    const email = document.getElementById('inputEmail3').value;
    const password = document.getElementById('inputPassword3').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // Store user data in the database
        const database_ref = database.ref('users/' + user.uid);

        const user_data = {
            email: email,
            password: password,
            last_login: Date.now()
        };

        database_ref.set(user_data);

        alert('User Created!');
    })
    .catch((error) => {
        const error_code = error.code;
        const error_message = error.message;

        alert(error_message);
    });
}





function validateEmail ()
{
  
expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }

}

function validatePassword (password)
{
if (password < 6)
{
  return false;
} else {
  return true;
}
}

function validateField(field)
{
  if(field == null)
  {
    return false;
  } 
  if (field.length <= 0)
  {
    return false;
  } else{
    return true;
  }
    
  
}
  */