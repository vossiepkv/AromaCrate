import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
const auth = getAuth(app);

const userStatusDiv = document.getElementById('user-status');
const logoutButton = document.getElementById('logout-button');
const accountLink = document.getElementById('account-link');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const email = user.email;
    userStatusDiv.innerHTML = `Logged in as ${email}`;
    logoutButton.classList.remove('d-none'); // Show logout button
    accountLink.style.display = 'block'; // Show account link
  } else {
    // No user is signed in
    userStatusDiv.innerHTML = `<p> <a href="login.html">Log In</a><a href="signup.html">Sign Up</a> </p>`;
    logoutButton.classList.add('d-none'); // Hide logout button
    accountLink.style.display = 'none'; // Hide account link
  }
});

// Add event listener to the logout button
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = 'login.html'; // Redirect to login page or any other page
  }).catch((error) => {
    // An error occurred
    console.error('Error signing out: ', error);
  });
});
