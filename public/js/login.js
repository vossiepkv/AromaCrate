import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// Handling the Login Process
const loginButton = document.getElementById('sign-up-button'); // Reuse the same button ID for login
const errorMessageDiv = document.getElementById('form-error-message');

loginButton.addEventListener("click", function (event) {
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

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      // Redirect to a different page
      window.location.href = "../index.html"; // Redirect to account page or any other page
    })
    .catch((error) => {
      const errorCode = error.code;

      // Display specific error messages
      if (errorCode === 'auth/user-not-found') {
        errorMessageDiv.textContent = 'No user found with this email address.';
      } else if (errorCode === 'auth/wrong-password') {
        errorMessageDiv.textContent = 'Incorrect password. Please try again.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessageDiv.textContent = 'The email address is not valid.';
      } else {
        // General error message
        errorMessageDiv.textContent = 'An error occurred: ' + error.message;
      }

      // Show the error message
      errorMessageDiv.style.display = 'block';
    });
});

// Check the current authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is logged in:", user.email);
    // You can also redirect them to a specific page or show user-specific content here
  } else {
    // User is signed out
    console.log("No user is logged in");
    // Optionally, redirect them to the login page
  }
});
