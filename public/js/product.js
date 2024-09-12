import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getDatabase, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlQ_MzxTHQ-dQdq0Dc5qWuBpvH2YufOH4",
  authDomain: "aromacrates.firebaseapp.com",
  databaseURL: "https://aromacrates-default-rtdb.firebaseio.com",
  projectId: "aromacrates",
  storageBucket: "aromacrates.appspot.com",
  messagingSenderId: "420220632902",
  appId: "1:420220632902:web:22d273413b5624ec0fef47"
};
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase();
const subscribeButton = document.querySelector(".btn-primary");

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    subscribeButton.textContent = "Checking Subscription...";
    populateFormWithUserData(user.uid);
  } else {
    subscribeButton.textContent = "Log In";
    subscribeButton.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});

// Function to pre-fill the form with user data
function populateFormWithUserData(userId) {
  const userRef = ref(db, `users/${userId}`);
  
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      document.getElementById("name").value = userData.name || "";
      document.getElementById("address").value = userData.address || "";
      document.getElementById("Suburb").value = userData.suburb || "";
      document.getElementById("State").value = userData.state || "";
      document.getElementById("Postcode").value = userData.postcode || "";
      document.getElementById("brands").value = userData.brands || "";
      document.getElementById("subscription").value = userData.gender || "male";
      
      if (userData.subscriptionStatus && userData.subscriptionStatus.active) {
        subscribeButton.textContent = "Cancel Subscription";
      } else {
        subscribeButton.textContent = "Subscribe Now";
      }
    }
  }).catch((error) => {
    console.error("Error fetching user data:", error);
  });
}

document.getElementById('subscription-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const userId = auth.currentUser.uid;
  const subscriptionOption = document.getElementById('subscription').value;
  const userRef = ref(db, 'users/' + userId);

  if (subscribeButton.textContent === "Cancel Subscription") {
    // Remove subscription if button says "Cancel Subscription"
    remove(ref(db, `users/${userId}/subscriptionStatus`))
      .then(() => {
        console.log('Subscription successfully cancelled');
        subscribeButton.textContent = "Subscribe Now";
      })
      .catch((error) => {
        console.error('Error cancelling subscription:', error);
      });
  } else {
    // Create or update subscription if button says "Subscribe Now"
    update(userRef, {
      subscriptionStatus: {
        type: subscriptionOption,
        active: true
      }
    })
    .then(() => {
      console.log('Subscription successfully updated in RTDB');
      subscribeButton.textContent = "Cancel Subscription";
    })
    .catch((error) => {
      console.error('Error updating subscription:', error);
    });
  }
});

document.getElementById('search-bar').addEventListener('input', function() {
  let filter = this.value.toLowerCase();
  let productCards = document.querySelectorAll('.product-card');

  productCards.forEach(function(card) {
      // Get the card's display status and product name
      let productName = card.querySelector('p').textContent.toLowerCase();
      // Check if the card should be shown or hidden
      if (productName.includes(filter)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
});

// Show/Hide product types
document.getElementById('show-perfumes').addEventListener('click', showPerfumes);
document.getElementById('show-colognes').addEventListener('click', showColognes);

function showPerfumes() {
  const grid = document.querySelector('.previous-products-grid');
  grid.innerHTML = `
    <div class="product-card perfume">
          <img src="imgs/placeholder1.png" alt="Chanel No. 5" />
          <p>Chanel No. 5</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder2.png" alt="J'adore" />
          <p>J'adore</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder3.png" alt="La Vie Est Belle" />
          <p>La Vie Est Belle</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder4.png" alt="Flowerbomb" />
          <p>Flowerbomb</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder5.png" alt="Black Opium" />
          <p>Black Opium</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder6.png" alt="Light Blue" />
          <p>Light Blue</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder7.png" alt="Miss Dior" />
          <p>Miss Dior</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder8.png" alt="Coco Mademoiselle" />
          <p>Coco Mademoiselle</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder9.png" alt="L'Interdit" />
          <p>L'Interdit</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder10.png" alt="Mon Guerlain" />
          <p>Mon Guerlain</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder11.png" alt="Si" />
          <p>Si</p>
        </div>
        <div class="product-card perfume">
          <img src="imgs/placeholder12.png" alt="Good Girl" />
          <p>Good Girl</p>
        </div>
  `;

}

function showColognes() {
  const grid = document.querySelector('.previous-products-grid');
  grid.innerHTML = `
    <div class="product-card cologne">
      <img src="imgs/placeholder1.png" alt="Bleu de Chanel" />
      <p>Bleu de Chanel</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder2.png" alt="Sauvage" />
      <p>Sauvage</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder3.png" alt="Acqua di Giò" />
      <p>Acqua di Giò</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder4.png" alt="Aventus" />
      <p>Aventus</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder5.png" alt="The One" />
      <p>The One</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder6.png" alt="Terre d'Hermès" />
      <p>Terre d'Hermès</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder7.png" alt="Eros" />
      <p>Eros</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder8.png" alt="Invictus" />
      <p>Invictus</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder9.png" alt="Y Le Parfum" />
      <p>Y Le Parfum</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder10.png" alt="Spicebomb" />
      <p>Spicebomb</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder11.png" alt="Light Blue Pour Homme" />
      <p>Light Blue Pour Homme</p>
    </div>
    <div class="product-card cologne">
      <img src="imgs/placeholder12.png" alt="1 Million" />
      <p>1 Million</p>
    </div>
  `;
}
