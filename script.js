// script.js ✨ For jheartssales - Coquette core coded with love 💖

let cart = [];

// Update cart count on all pages
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Add to cart button logic (if buttons exist)
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.getAttribute("data-name");
      const itemPrice = parseFloat(btn.getAttribute("data-price"));
      const item = { name: itemName, price: itemPrice };
      cart.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      updateCartCount();
      alert(`🎀 ${itemName} added to cart! ✨`);
    });
  });
});

// Update cart icon count
function updateCartCount() {
  const cartIcon = document.querySelector(".cart-count");
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart = savedCart;
  if (cartIcon) {
    cartIcon.textContent = cart.length;
  }
}

// Display cart items on cart.html
function displayCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  const totalContainer = document.querySelector(".cart-total");
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartContainer.innerHTML = "";

  let total = 0;
  savedCart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <p>💖 <strong>${item.name}</strong> - ₦${item.price.toLocaleString()}</p>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price;
  });

  totalContainer.innerHTML = `<h3>Total: ₦${total.toLocaleString()} 🧁</h3>`;
}
const wishlistItems = [];

function updateWishlistDisplay() {
  const wishlistContainer = document.querySelector('.wishlist-items');
  if (!wishlistContainer) return;

  wishlistContainer.innerHTML = '';

  wishlistItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'wishlist-card';
    div.innerHTML = `
      <p>${item}</p>
      <button class="remove-from-wishlist" data-index="${index}">❌ Remove</button>
    `;
    wishlistContainer.appendChild(div);
  });

  document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      wishlistItems.splice(index, 1);
      updateWishlistDisplay();
    });
  });
}

document.querySelectorAll('.add-to-wishlist').forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-name');
    if (!wishlistItems.includes(itemName)) {
      wishlistItems.push(itemName);
      updateWishlistDisplay();
    }
  });
});
