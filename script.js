
const products = [
  {
    id: 1,
    name: "Pink Tulip Bouquet",
    category: "Tulips",
    price: 1250,
    tag: "BESTSELLER",
    image: "photo-1520763185298-1b434c919102"
  },
  {
    id: 2,
    name: "Classic Red Roses",
    category: "Roses",
    price: 1450,
    tag: "POPULAR",
    image: "photo-1518895949257-7621c3c786d7"
  },
  {
    id: 3,
    name: "White Lily Bouquet",
    category: "Lilies",
    price: 1650,
    tag: "ELEGANT",
    image: "photo-1494972308805-463bc619d34e"
  },
  {
    id: 4,
    name: "Golden Sunflowers",
    category: "Sunflowers",
    price: 950,
    tag: "",
    image: "photo-1470509037663-253afd7f0f51"
  },
  {
    id: 5,
    name: "Soft Pink Peonies",
    category: "Other",
    price: 1850,
    tag: "SPECIAL",
    image: "photo-1455659817273-f96807779a8a"
  },
  {
    id: 6,
    name: "Purple Orchid",
    category: "Other",
    price: 1350,
    tag: "",
    image: "photo-1563241527-3004b7be0ffd"
  },
  {
    id: 7,
    name: "White Rose Bouquet",
    category: "Roses",
    price: 1550,
    tag: "",
    image: "photo-1494972308805-463bc619d34e"
  },
  {
    id: 8,
    name: "Pastel Flower Mix",
    category: "Bouquets",
    price: 1750,
    tag: "FAVOURITE",
    image: "photo-1490750967868-88aa4486c946"
  },
  {
    id: 9,
    name: "Orange Tulips",
    category: "Tulips",
    price: 1150,
    tag: "",
    image: "photo-1494972308805-463bc619d34e"
  },
  {
    id: 10,
    name: "Pink Gerbera",
    category: "Other",
    price: 850,
    tag: "",
    image: "photo-1508610048659-a06b669e3321"
  },
  {
    id: 11,
    name: "Lavender Bouquet",
    category: "Bouquets",
    price: 1200,
    tag: "",
    image: "photo-1470252649378-9c29740c9fa8"
  },
  {
    id: 12,
    name: "Blush Rose Mix",
    category: "Roses",
    price: 1600,
    tag: "POPULAR",
    image: "photo-1525310072745-f49212b5ac6d"
  },
  {
    id: 13,
    name: "Yellow Daffodils",
    category: "Other",
    price: 1050,
    tag: "",
    image: "photo-1497250681960-ef046c08a56e"
  },
  {
    id: 14,
    name: "White Daisy Bunch",
    category: "Other",
    price: 900,
    tag: "",
    image: "photo-1495231916356-a86217efff12"
  },
  {
    id: 15,
    name: "Mixed Garden Roses",
    category: "Roses",
    price: 1900,
    tag: "PREMIUM",
    image: "photo-1526047932273-341f2a7631f9"
  },
  {
    id: 16,
    name: "Pink Lily Stems",
    category: "Lilies",
    price: 1400,
    tag: "",
    image: "photo-1508610048659-a06b669e3321"
  },
  {
    id: 17,
    name: "Wildflower Bouquet",
    category: "Bouquets",
    price: 1300,
    tag: "",
    image: "photo-1508610048659-a06b669e3321"
  },
  {
    id: 18,
    name: "Spring Tulip Mix",
    category: "Tulips",
    price: 1500,
    tag: "NEW",
    image: "photo-1520763185298-1b434c919102"
  }
];

// Build image URLs from the Unsplash image IDs.
function imageUrl(photoId, width = 700) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`;
}

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const productTotal = document.getElementById("productTotal");
const emptyMessage = document.getElementById("emptyMessage");

const cartOpen = document.getElementById("cartOpen");
const cartClose = document.getElementById("cartClose");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTitleCount = document.getElementById("cartTitleCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");

let cart = [];
let wishlist = new Set();
let toastTimer;

function formatPrice(price) {
  return "৳" + price.toLocaleString("en-BD");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function getFilteredProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  let result = [...products];

  if (searchTerm) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  if (selectedCategory !== "All") {
    if (selectedCategory === "Other") {
      result = result.filter(product => product.category === "Other");
    } else {
      result = result.filter(product => product.category === selectedCategory);
    }
  }

  switch (sortSelect.value) {
    case "low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return result;
}

function renderProducts() {
  const visibleProducts = getFilteredProducts();

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${imageUrl(product.image)}"
          alt="${product.name}"
          loading="lazy"
        >

        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}

        <button
          class="wishlist-button ${wishlist.has(product.id) ? "active" : ""}"
          data-wishlist="${product.id}"
          aria-label="${wishlist.has(product.id) ? "Remove from" : "Add to"} wishlist"
          aria-pressed="${wishlist.has(product.id)}"
          title="Toggle wishlist"
        >${wishlist.has(product.id) ? "♥" : "♡"}</button>
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>

        <div class="product-title-row">
          <h3 class="product-title">${product.name}</h3>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>

        <button class="add-to-cart" data-add="${product.id}">
          Add to Cart&nbsp; +
        </button>
      </div>
    </article>
  `).join("");

  productTotal.textContent =
    `${visibleProducts.length} ${visibleProducts.length === 1 ? "flower" : "flowers"}`;

  emptyMessage.hidden = visibleProducts.length !== 0;
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} added to cart.`);
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);
  renderCart();
  showToast("Item removed from cart.");
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalQuantity;
  cartTitleCount.textContent = `(${totalQuantity})`;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">Your cart is empty. Find some beautiful flowers!</p>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${imageUrl(item.image, 220)}" alt="${item.name}">

        <div>
          <h3>${item.name}</h3>
          <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>

          <div class="quantity-controls">
            <button data-quantity="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-quantity="${item.id}" data-change="1" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
      </div>
    `).join("");
  }
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function toggleWishlist(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast(`${product.name} removed from wishlist.`);
  } else {
    wishlist.add(productId);
    showToast(`${product.name} added to wishlist.`);
  }

  renderProducts();
}

// Product buttons: add to cart and wishlist.
productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const wishlistButton = event.target.closest("[data-wishlist]");

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
  }

  if (wishlistButton) {
    toggleWishlist(Number(wishlistButton.dataset.wishlist));
  }
});

// Cart quantity and remove buttons.
cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    changeQuantity(
      Number(quantityButton.dataset.quantity),
      Number(quantityButton.dataset.change)
    );
  }

  if (removeButton) {
    removeFromCart(Number(removeButton.dataset.remove));
  }
});

// Search, category and sorting.
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

// Quick category links.
document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    categoryFilter.value = link.dataset.categoryLink;
    renderProducts();
  });
});

// Cart drawer controls.
cartOpen.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
  }
});

// Demo checkout.
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add flowers first.");
    return;
  }

  showToast("Demo checkout only — no real payment was taken.");
});

// Dark mode toggle.
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const darkModeOn = document.body.classList.contains("dark-mode");
  themeToggle.textContent = darkModeOn ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    darkModeOn ? "Switch to light mode" : "Switch to dark mode"
  );
});

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Contact form: front-end demonstration only.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const formStatus = document.getElementById("formStatus");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  formStatus.textContent =
    "Thank you! The demo form is complete, but messages are not sent to a real inbox yet.";

  form.reset();
});

// Footer year.
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Initial page render.
renderProducts();
renderCart();
