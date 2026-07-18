/* ============ SkyMart — demo e-commerce (vanilla JS) ============ */

// ---------- Product data (stored in a variable, demo only) ----------
const PRODUCTS = [
  { id: 1,  name: "Aero Wireless Headphones", cat: "Tech",      price: 89.99,  rating: 4.8, emoji: "🎧" },
  { id: 2,  name: "Nimbus Smart Watch",       cat: "Tech",      price: 149.0,  rating: 4.6, emoji: "⌚" },
  { id: 3,  name: "Pulse Bluetooth Speaker",  cat: "Tech",      price: 59.5,   rating: 4.7, emoji: "🔊" },
  { id: 4,  name: "Vortex Gaming Mouse",      cat: "Tech",      price: 39.99,  rating: 4.5, emoji: "🖱️" },
  { id: 5,  name: "Cloud Runner Sneakers",    cat: "Fashion",   price: 120.0,  rating: 4.9, emoji: "👟" },
  { id: 6,  name: "Urban Denim Jacket",       cat: "Fashion",   price: 75.0,   rating: 4.4, emoji: "🧥" },
  { id: 7,  name: "Solstice Sunglasses",      cat: "Fashion",   price: 45.0,   rating: 4.3, emoji: "🕶️" },
  { id: 8,  name: "Trail Canvas Backpack",    cat: "Fashion",   price: 65.0,   rating: 4.6, emoji: "🎒" },
  { id: 9,  name: "Ember Ceramic Mug Set",    cat: "Home",      price: 28.0,   rating: 4.7, emoji: "☕" },
  { id: 10, name: "Lumen Desk Lamp",          cat: "Home",      price: 42.5,   rating: 4.5, emoji: "💡" },
  { id: 11, name: "Zen Indoor Plant Kit",     cat: "Home",      price: 34.0,   rating: 4.8, emoji: "🪴" },
  { id: 12, name: "Nova Scented Candles",     cat: "Home",      price: 22.0,   rating: 4.4, emoji: "🕯️" },
  { id: 13, name: "Peak Yoga Mat",            cat: "Lifestyle", price: 38.0,   rating: 4.6, emoji: "🧘" },
  { id: 14, name: "Hydra Steel Bottle",       cat: "Lifestyle", price: 25.0,   rating: 4.7, emoji: "🥤" },
  { id: 15, name: "Journey Travel Journal",   cat: "Lifestyle", price: 18.5,   rating: 4.5, emoji: "📓" },
  { id: 16, name: "Rhythm Skipping Rope",     cat: "Lifestyle", price: 15.0,   rating: 4.2, emoji: "🤸" },
];

const CATEGORIES = ["All", "Tech", "Fashion", "Home", "Lifestyle"];
const FREE_SHIP_OVER = 50;
const SHIP_COST = 4.99;

// ---------- Storage helpers ----------
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// Seed a demo account so the login page works out of the box
function seedDemoUser() {
  const users = store.get("skymart_users", []);
  if (!users.some((u) => u.email === "demo@skymart.com")) {
    users.push({ name: "Demo User", email: "demo@skymart.com", password: "demo123" });
    store.set("skymart_users", users);
  }
}
seedDemoUser();

// ---------- App state ----------
let currentUser = store.get("skymart_session", null); // { name, email }
let cart = []; // [{ id, qty }]
let activeCategory = "All";
let searchQuery = "";
let sortBy = "featured";

function cartKey() {
  return `skymart_cart_${currentUser.email}`;
}
function ordersKey() {
  return `skymart_orders_${currentUser.email}`;
}
function loadCart() {
  cart = currentUser ? store.get(cartKey(), []) : [];
}
function saveCart() {
  if (currentUser) store.set(cartKey(), cart);
}

// ---------- DOM shortcuts ----------
const $ = (sel) => document.querySelector(sel);
const header = $("#header");
const views = {
  login: $("#view-login"),
  register: $("#view-register"),
  shop: $("#view-shop"),
  checkout: $("#view-checkout"),
  success: $("#view-success"),
};

// ---------- Navigation ----------
function show(viewName) {
  Object.values(views).forEach((v) => v.classList.add("hidden"));
  views[viewName].classList.remove("hidden");
  const authView = viewName === "login" || viewName === "register";
  header.classList.toggle("hidden", authView);
  window.scrollTo({ top: 0 });
  if (viewName === "shop") renderProducts();
  if (viewName === "checkout") renderSummary();
}

document.addEventListener("click", (e) => {
  const navEl = e.target.closest("[data-nav]");
  if (!navEl) return;
  e.preventDefault();
  const target = navEl.dataset.nav;
  if ((target === "shop" || target === "checkout") && !currentUser) return show("login");
  show(target);
});

// ---------- Toasts ----------
function toast(msg, type = "ok") {
  const el = document.createElement("div");
  el.className = `toast${type === "error" ? " error" : ""}`;
  el.textContent = msg;
  $("#toast-wrap").appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ---------- Password visibility toggles ----------
document.querySelectorAll(".eye-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.toggle);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.classList.toggle("active", !showing);
  });
});

// ---------- Auth ----------
function setError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg || "";
  el.classList.toggle("hidden", !msg);
}

function login(user) {
  currentUser = { name: user.name, email: user.email };
  store.set("skymart_session", currentUser);
  loadCart();
  $("#user-name").textContent = user.name.split(" ")[0];
  $("#user-avatar").textContent = user.name.trim()[0].toUpperCase();
  updateCartUI();
  show("shop");
  toast(`Welcome, ${user.name.split(" ")[0]}! 👋`);
}

$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#login-email").value.trim().toLowerCase();
  const password = $("#login-password").value;
  if (!email || !password) return setError("login-error", "Please fill in all fields.");
  const user = store.get("skymart_users", []).find((u) => u.email === email);
  if (!user || user.password !== password)
    return setError("login-error", "Invalid email or password.");
  setError("login-error", "");
  e.target.reset();
  login(user);
});

$("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#reg-name").value.trim();
  const email = $("#reg-email").value.trim().toLowerCase();
  const password = $("#reg-password").value;
  const confirm = $("#reg-confirm").value;

  if (!name || !email || !password || !confirm)
    return setError("register-error", "Please fill in all fields.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return setError("register-error", "Please enter a valid email address.");
  if (password.length < 6)
    return setError("register-error", "Password must be at least 6 characters.");
  if (password !== confirm) return setError("register-error", "Passwords do not match.");

  const users = store.get("skymart_users", []);
  if (users.some((u) => u.email === email))
    return setError("register-error", "An account with this email already exists.");

  const user = { name, email, password };
  users.push(user);
  store.set("skymart_users", users);
  setError("register-error", "");
  e.target.reset();
  // Send the new user to the login page to sign in with their saved credentials
  $("#login-email").value = email;
  $("#login-password").value = "";
  show("login");
  $("#login-password").focus();
  toast("Account created! Sign in to continue 🎉");
});

$("#logout-btn").addEventListener("click", () => {
  currentUser = null;
  cart = [];
  store.remove("skymart_session");
  closeCart();
  show("login");
  toast("Logged out. See you soon!");
});

// ---------- Products ----------
function renderCategoryChips() {
  $("#category-chips").innerHTML = CATEGORIES.map(
    (c) => `<button class="chip${c === activeCategory ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
}

$("#category-chips").addEventListener("click", (e) => {
  const chip = e.target.closest("[data-cat]");
  if (!chip) return;
  activeCategory = chip.dataset.cat;
  renderProducts();
});

$("#search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderProducts();
});

$("#sort-select").addEventListener("change", (e) => {
  sortBy = e.target.value;
  renderProducts();
});

function getVisibleProducts() {
  let list = PRODUCTS.filter(
    (p) =>
      (activeCategory === "All" || p.cat === activeCategory) &&
      p.name.toLowerCase().includes(searchQuery)
  );
  if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  return list;
}

function renderProducts() {
  renderCategoryChips();
  const list = getVisibleProducts();
  $("#no-results").classList.toggle("hidden", list.length > 0);
  $("#product-grid").innerHTML = list
    .map((p) => {
      const inCart = cart.some((c) => c.id === p.id);
      return `
      <article class="product-card">
        <div class="product-thumb">${p.emoji}</div>
        <div class="product-body">
          <span class="product-cat">${p.cat}</span>
          <h3 class="product-name">${p.name}</h3>
          <span class="product-rating"><b>★ ${p.rating}</b> · Free returns</span>
          <div class="product-foot">
            <span class="product-price">$${p.price.toFixed(2)}</span>
            <button class="add-btn${inCart ? " in-cart" : ""}" data-add="${p.id}">
              ${inCart ? "✓ Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

$("#product-grid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  addToCart(Number(btn.dataset.add));
});

// ---------- Cart ----------
function addToCart(id) {
  const item = cart.find((c) => c.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  renderProducts();
  const p = PRODUCTS.find((p) => p.id === id);
  toast(`${p.emoji} ${p.name} added to cart`);
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
  updateCartUI();
  renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
  updateCartUI();
  renderProducts();
}

function cartSubtotal() {
  return cart.reduce((sum, c) => {
    const p = PRODUCTS.find((p) => p.id === c.id);
    return sum + p.price * c.qty;
  }, 0);
}

function cartCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

function updateCartUI() {
  const count = cartCount();
  const badge = $("#cart-badge");
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);

  const empty = count === 0;
  $("#cart-empty").classList.toggle("hidden", !empty);
  $("#cart-items").classList.toggle("hidden", empty);
  $("#cart-foot").classList.toggle("hidden", empty);

  if (!empty) {
    $("#cart-items").innerHTML = cart
      .map((c) => {
        const p = PRODUCTS.find((p) => p.id === c.id);
        return `
        <div class="cart-item">
          <div class="cart-item-thumb">${p.emoji}</div>
          <div class="cart-item-info">
            <p class="cart-item-name">${p.name}</p>
            <p class="cart-item-price">$${p.price.toFixed(2)} each</p>
            <div class="qty-controls">
              <button class="qty-btn" data-dec="${p.id}">−</button>
              <span class="qty-val">${c.qty}</span>
              <button class="qty-btn" data-inc="${p.id}">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-total">$${(p.price * c.qty).toFixed(2)}</span>
            <button class="remove-btn" data-remove="${p.id}">Remove</button>
          </div>
        </div>`;
      })
      .join("");
    $("#cart-subtotal").textContent = `$${cartSubtotal().toFixed(2)}`;
  }
}

$("#cart-items").addEventListener("click", (e) => {
  const dec = e.target.closest("[data-dec]");
  const inc = e.target.closest("[data-inc]");
  const rem = e.target.closest("[data-remove]");
  if (dec) changeQty(Number(dec.dataset.dec), -1);
  if (inc) changeQty(Number(inc.dataset.inc), 1);
  if (rem) removeFromCart(Number(rem.dataset.remove));
});

// Drawer open/close
const drawer = $("#cart-drawer");
const overlay = $("#overlay");

function openCart() {
  updateCartUI();
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.classList.remove("hidden");
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.classList.add("hidden");
}

$("#cart-btn").addEventListener("click", openCart);
$("#cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
$("#browse-btn").addEventListener("click", () => {
  closeCart();
  show("shop");
});
$("#clear-cart-btn").addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartUI();
  renderProducts();
  toast("Cart cleared");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeOrders();
  }
});

$("#checkout-btn").addEventListener("click", () => {
  closeCart();
  show("checkout");
});

// ---------- Checkout ----------
function shippingCost() {
  const sub = cartSubtotal();
  return sub === 0 || sub >= FREE_SHIP_OVER ? 0 : SHIP_COST;
}

function renderSummary() {
  $("#summary-items").innerHTML = cart.length
    ? cart
        .map((c) => {
          const p = PRODUCTS.find((p) => p.id === c.id);
          return `<div class="summary-item"><span>${p.emoji} <b>${p.name}</b> × ${c.qty}</span><span>$${(p.price * c.qty).toFixed(2)}</span></div>`;
        })
        .join("")
    : `<p class="muted">Your cart is empty.</p>`;

  const sub = cartSubtotal();
  const ship = shippingCost();
  $("#summary-subtotal").textContent = `$${sub.toFixed(2)}`;
  $("#summary-shipping").textContent = ship === 0 ? "FREE" : `$${ship.toFixed(2)}`;
  $("#summary-total").textContent = `$${(sub + ship).toFixed(2)}`;

  // Prefill name from the account
  if (currentUser && !$("#ship-name").value) $("#ship-name").value = currentUser.name;
}

$("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0)
    return setError("checkout-error", "Your cart is empty — add something first!");

  const name = $("#ship-name").value.trim();
  const phone = $("#ship-phone").value.trim();
  const address = $("#ship-address").value.trim();
  const city = $("#ship-city").value.trim();
  const zip = $("#ship-zip").value.trim();
  if (!name || !phone || !address || !city || !zip)
    return setError("checkout-error", "Please fill in all shipping fields.");
  setError("checkout-error", "");

  const payment = document.querySelector('input[name="payment"]:checked').value;
  const sub = cartSubtotal();
  const ship = shippingCost();
  const order = {
    id: "SM-" + Date.now().toString(36).toUpperCase(),
    date: new Date().toLocaleString(),
    items: cart.map((c) => {
      const p = PRODUCTS.find((p) => p.id === c.id);
      return { name: p.name, emoji: p.emoji, qty: c.qty, price: p.price };
    }),
    shipping: { name, phone, address, city, zip },
    payment,
    subtotal: sub,
    shipCost: ship,
    total: sub + ship,
  };

  const orders = store.get(ordersKey(), []);
  orders.unshift(order);
  store.set(ordersKey(), orders);

  cart = [];
  saveCart();
  updateCartUI();
  e.target.reset();

  $("#success-order-id").textContent = order.id;
  $("#success-total").textContent = `Total paid: $${order.total.toFixed(2)} · ${order.payment}`;
  show("success");
});

// ---------- Orders modal ----------
const ordersModal = $("#orders-modal");

function openOrders() {
  const orders = store.get(ordersKey(), []);
  $("#orders-list").innerHTML = orders.length
    ? orders
        .map(
          (o) => `
        <div class="order-entry">
          <div class="order-entry-head">
            <strong>${o.id}</strong>
            <span>${o.date}</span>
          </div>
          <div class="order-entry-items">
            ${o.items.map((i) => `${i.emoji} ${i.name} × ${i.qty}`).join("<br>")}
          </div>
          <div class="order-entry-total">Total: $${o.total.toFixed(2)} · ${o.payment}</div>
        </div>`
        )
        .join("")
    : `<p class="orders-empty">No orders yet — your history will show up here. 📦</p>`;
  ordersModal.classList.remove("hidden");
}
function closeOrders() {
  ordersModal.classList.add("hidden");
}

$("#orders-btn").addEventListener("click", openOrders);
$("#orders-close").addEventListener("click", closeOrders);
ordersModal.addEventListener("click", (e) => {
  if (e.target === ordersModal) closeOrders();
});
$("#view-orders-link").addEventListener("click", () => openOrders());

// ---------- Init ----------
if (currentUser) {
  loadCart();
  $("#user-name").textContent = currentUser.name.split(" ")[0];
  $("#user-avatar").textContent = currentUser.name.trim()[0].toUpperCase();
  updateCartUI();
  show("shop");
} else {
  show("login");
}
