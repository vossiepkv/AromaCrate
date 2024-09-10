import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
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

// Initialize Firebase Realtime Database and get a reference to the service
const database = getDatabase(app);

document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get form data
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation checks
  const nameRegex = /^[A-Za-z]+$/; // Only letters allowed
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check

  let valid = true;

  // Clear previous error messages
  document.getElementById('first-name-error').textContent = '';
  document.getElementById('last-name-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('message-error').textContent = '';

  if (!firstName || !nameRegex.test(firstName)) {
      document.getElementById('first-name-error').textContent = 'Please enter a valid first name.';
      valid = false;
  }

  if (!lastName || !nameRegex.test(lastName)) {
      document.getElementById('last-name-error').textContent = 'Please enter a valid last name.';
      valid = false;
  }

  if (!email || !emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      valid = false;
  }

  if (!message) {
      document.getElementById('message-error').textContent = 'Please enter a message.';
      valid = false;
  }

  if (valid) {
      // If all validations pass, proceed to store the data in Firebase

      // Option 1: Realtime Database
      set(ref(database, 'contacts/' + Date.now()), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message
      }).then(() => {
          document.getElementById('first-name-error').textContent = '';
          document.getElementById('last-name-error').textContent = '';
          document.getElementById('email-error').textContent = '';
          document.getElementById('message-error').textContent = 'Message sent successfully!';
          document.getElementById('message-error').style.color = 'green';
      }).catch((error) => {
          console.error('Error writing to Realtime Database:', error);
      });

      
  }
});
