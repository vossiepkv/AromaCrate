import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

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

// Initialize Firebase Realtime Database and get a reference to the service
const database = getDatabase(app);

// Handling the Sign-Up Process
const submit = document.getElementById('sign-up-button');
const errorMessageDiv = document.getElementById('form-error-message');

submit.addEventListener("click", function (event) {
  event.preventDefault();

  // Clear previous error messages
  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';

  const email = document.getElementById('inputEmail3').value;
  const password = document.getElementById('inputPassword3').value;

  // Basic validation
  if (!email) {
    errorMessageDiv.textContent = 'Please enter your email address.';
    errorMessageDiv.style.display = 'block';
    return;
  }

  if (!password) {
    errorMessageDiv.textContent = 'Please enter your password.';
    errorMessageDiv.style.display = 'block';
    return;
  }

  if (password.length < 6) {
    errorMessageDiv.textContent = 'Password must be at least 6 characters long.';
    errorMessageDiv.style.display = 'block';
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      // Store user data in the Realtime Database
      set(ref(database, 'users/' + user.uid), {
        email: email,
        last_login: Date.now()
      });

      // Redirect to a different page
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;

      // Display specific error messages
      if (errorCode === 'auth/email-already-in-use') {
        errorMessageDiv.textContent = 'This email address is already in use. Please try another one.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessageDiv.textContent = 'The email address is not valid.';
      } else if (errorCode === 'auth/weak-password') {
        errorMessageDiv.textContent = 'The password is too weak. Please use a stronger password.';
      } else {
        // General error message
        errorMessageDiv.textContent = 'An error occurred: ' + error.message;
      }

      // Show the error message
      errorMessageDiv.style.display = 'block';
    });
});
