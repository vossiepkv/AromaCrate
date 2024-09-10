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

function showPerfumes() {
  let perfumeCards = document.querySelectorAll('.product-card.perfume');
  let cologneCards = document.querySelectorAll('.product-card.cologne');

  perfumeCards.forEach(card => card.style.display = 'block');
  cologneCards.forEach(card => card.style.display = 'none');
}

function showColognes() {
  let perfumeCards = document.querySelectorAll('.product-card.perfume');
  let cologneCards = document.querySelectorAll('.product-card.cologne');

  perfumeCards.forEach(card => card.style.display = 'none');
  cologneCards.forEach(card => card.style.display = 'block');
}
