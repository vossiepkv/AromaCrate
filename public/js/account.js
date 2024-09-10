import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

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
const database = getDatabase(app);
const storage = getStorage(app);

// Check if a user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userId = user.uid;
    loadUserData(userId);
  } else {
    // No user is signed in
    window.location.href = "login.html";
  }
});

// Load user data from Firebase
function loadUserData(userId) {
  const userRef = ref(database, 'users/' + userId);

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      document.getElementById('name').value = userData.name || '';
      document.getElementById('email').value = userData.email || '';
      document.getElementById('phone').value = userData.phone || '';
      document.getElementById('address').value = userData.address || '';
      document.getElementById('suburb').value = userData.suburb || '';
      document.getElementById('state').value = userData.state || '';
      document.getElementById('postcode').value = userData.postcode || '';
      if (userData.avatar) {
        document.getElementById('avatar-img').src = userData.avatar;
      }
    } else {
      console.log("No user data found");
    }
  }).catch((error) => {
    console.error("Error loading user data:", error);
  });
}

// Handle form submission to save changes
document.getElementById('account-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = auth.currentUser.uid;

  const userData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    address: document.getElementById('address').value.trim(),
    suburb: document.getElementById('suburb').value.trim(),
    state: document.getElementById('state').value.trim(),
    postcode: document.getElementById('postcode').value.trim(),
  };

  // Handle avatar upload
  const fileInput = document.getElementById('avatar');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const avatarRef = storageRef(storage, 'avatars/' + userId + '/' + file.name);
    uploadBytes(avatarRef, file).then(() => {
      return getDownloadURL(avatarRef);
    }).then((url) => {
      // Include the avatar URL in the user data
      userData.avatar = url;
      return update(ref(database, 'users/' + userId), userData);
    }).then(() => {
      console.log("User data updated successfully with avatar!");
      alert("Changes saved successfully!");
    }).catch((error) => {
      console.error("Error updating user data:", error);
      alert("Failed to save changes. Please try again.");
    });
  } else {
    // Update user data without avatar
    update(ref(database, 'users/' + userId), userData)
      .then(() => {
        console.log("User data updated successfully!");
        alert("Changes saved successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Failed to save changes. Please try again.");
      });
  }

  // Optionally update email in Firebase Auth if changed
  if (userData.email !== auth.currentUser.email) {
    updateEmail(auth.currentUser, userData.email)
      .then(() => {
        console.log("Email updated in Auth.");
      })
      .catch((error) => {
        console.error("Error updating email in Auth:", error);
      });
  }
});
