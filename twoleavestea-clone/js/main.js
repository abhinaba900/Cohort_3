/* ========================
   TWO LEAVES TEA — main.js
======================== */

/* ---------- DATA ---------- */
const PRODUCTS = [
  { id:1,  name:'Ceremonial Matcha',          emoji:'🍵', price:18.99, original:null,  rating:4.9, reviews:312, tags:['Organic','New'], badge:'Best Seller', category:'matcha',  desc:'Stone-ground ceremonial grade matcha from Uji, Japan.' },
  { id:2,  name:'Nice Chai Tea Latte Mix',     emoji:'☕', price:14.99, original:17.99, rating:4.8, reviews:284, tags:['Organic'],        badge:'Sale',        category:'lattes',  desc:'Spiced masala chai blend, perfect with steamed milk.' },
  { id:3,  name:'Organic Earl Grey',           emoji:'🫖', price:12.49, original:null,  rating:4.7, reviews:198, tags:['Organic'],        badge:null,          category:'sachets', desc:'Bergamot-forward black tea from Fair Trade gardens.' },
  { id:4,  name:'Organic Peppermint',          emoji:'🌿', price:10.99, original:null,  rating:4.8, reviews:245, tags:['Organic','Herbal'],badge:null,          category:'sachets', desc:'100% pure peppermint leaf — caffeine-free & soothing.' },
  { id:5,  name:'Tropical Green Tea',          emoji:'🍃', price:13.49, original:null,  rating:4.6, reviews:167, tags:['Organic'],        badge:'New',         category:'sachets', desc:'Sencha base with mango, pineapple & coconut notes.' },
  { id:6,  name:'Matcha Latte Mix',            emoji:'💚', price:16.99, original:19.99, rating:4.7, reviews:203, tags:['Organic'],        badge:'Sale',        category:'lattes',  desc:'Creamy, sweetened matcha blend. Just add milk.' },
  { id:7,  name:'Organic Chamomile',           emoji:'🌼', price:10.49, original:null,  rating:4.9, reviews:321, tags:['Organic','Herbal'],badge:'Best Seller', category:'sachets', desc:'Whole chamomile flowers for deep relaxation.' },
  { id:8,  name:'Peach Iced Tea Blend',        emoji:'🍑', price:11.99, original:null,  rating:4.5, reviews:142, tags:['Iced Tea'],       badge:'New',         category:'iced',    desc:'Sweet peach & black tea perfect over ice.' },
  { id:9,  name:'Hibiscus Berry Iced Tea',     emoji:'🫐', price:11.49, original:null,  rating:4.6, reviews:159, tags:['Herbal','Iced Tea'],badge:null,          category:'iced',    desc:'Tart hibiscus with mixed berry for a vibrant cold brew.' },
  { id:10, name:'Organic English Breakfast',   emoji:'🫖', price:12.99, original:null,  rating:4.8, reviews:278, tags:['Organic'],        badge:null,          category:'sachets', desc:'Bold, malty Assam blend — the classic morning cup.' },
  { id:11, name:'Golden Turmeric Latte',       emoji:'✨', price:15.99, original:null,  rating:4.6, reviews:176, tags:['Herbal','Organic'],badge:'New',         category:'lattes',  desc:'Warming turmeric & ginger blend, dairy-free.' },
  { id:12, name:'Herbal Tea Trio Gift Set',    emoji:'🎁', price:29.99, original:34.99, rating:4.9, reviews:94,  tags:['Gift'],           badge:'Sale',        category:'sachets', desc:'Peppermint, Chamomile & Hibiscus — perfect gift.' },
];

const BLOG_POSTS = [
  { tag:'Brewing Guide', title:'The Perfect Cup: Cold Brew Tea Secrets', excerpt:'Learn how to brew the smoothest, most flavourful iced tea at home with our step-by-step cold brew guide.', emoji:'🧊', date:'May 15, 2026', readTime:'4 min read' },
  { tag:'Tea Journal',   title:'From Leaf to Sachet: Our Sourcing Story', excerpt:'We visit our partner gardens in Darjeeling, Uji, and the Nilgiris to show you exactly where your tea comes from.', emoji:'🌱', date:'May 8, 2026',  readTime:'6 min read' },
  { tag:'Health',        title:'5 Reasons Matcha Outperforms Coffee', excerpt:'Sustained energy, L-theanine calm, antioxidants — here\'s why more people are swapping their morning cup.', emoji:'🍵', date:'Apr 28, 2026', readTime:'3 min read' },
];

/* ---------- CART STATE ---------- */
let cart = JSON.parse(localStorage.getItem('tlt-cart') || '[]');

function saveCart() { localStorage.setItem('tlt-cart', JSON.stringify(cart)); }

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(`🛒 ${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, i) => {
    const p = PRODUCTS.find(pr => pr.id === i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });
  const total = getCartTotal();
  const subtotalEl = document.getElementById('cart-subtotal');
  if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
  const FREE_SHIP = 45;
  const pct = Math.min((total / FREE_SHIP) * 100, 100);
  const fillEl = document.getElementById('shipping-fill');
  const shipTextEl = document.getElementById('shipping-text');
  if (fillEl) fillEl.style.width = pct + '%';
  if (shipTextEl) {
    if (total >= FREE_SHIP) shipTextEl.textContent = '🎉 You\'ve unlocked free shipping!';
    else shipTextEl.textContent = `Add $${(FREE_SHIP - total).toFixed(2)} more for FREE shipping`;
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><p>Your cart is empty 🍵</p><button class="btn-primary" onclick="closeCart()" style="background:var(--green-dark);color:#fff;padding:12px 28px;">Shop Now</button></div>`;
    return;
  }
  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item" id="cart-item-${p.id}">
        <div class="cart-item-img">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">${p.tags[0]} · Whole Leaf Sachets</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id},+1)">+</button>
          </div>
        </div>
        <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
        <button class="remove-item" onclick="removeFromCart(${p.id})">×</button>
      </div>`;
  }).join('');
}

/* ---------- CART UI ---------- */
function openCart() {
  renderCartItems();
  updateCartUI();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- TOAST ---------- */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ---------- SEARCH ---------- */
function openSearch() {
  document.getElementById('search-overlay').classList.add('open');
  document.getElementById('search-input').focus();
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

function handleSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  const results = document.getElementById('search-results');
  if (!q) { results.innerHTML = ''; return; }
  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.desc.toLowerCase().includes(q)
  ).slice(0, 5);
  if (!matches.length) {
    results.innerHTML = '<p style="color:var(--text-muted);padding:12px;">No results found.</p>';
    return;
  }
  results.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="addToCart(${p.id});closeSearch();">
      <span class="result-emoji">${p.emoji}</span>
      <div style="flex:1"><div class="result-name">${p.name}</div><div style="font-size:12px;color:var(--text-muted)">${p.tags.join(' · ')}</div></div>
      <div class="result-price">$${p.price.toFixed(2)}</div>
    </div>`).join('');
}

/* ---------- WISHLIST ---------- */
const wishlist = new Set(JSON.parse(localStorage.getItem('tlt-wish') || '[]'));
function toggleWishlist(id, btn) {
  if (wishlist.has(id)) { wishlist.delete(id); btn.textContent = '♡'; showToast('Removed from wishlist'); }
  else                   { wishlist.add(id);    btn.textContent = '♥'; showToast('❤️ Added to wishlist!'); }
  localStorage.setItem('tlt-wish', JSON.stringify([...wishlist]));
}

/* ---------- TABS ---------- */
function switchTab(btn) {
  const tabGroup = btn.closest('.tabs-wrapper');
  tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const target = btn.dataset.tab;
  const content = tabGroup.querySelector(`[data-content="${target}"]`);
  if (content) content.classList.add('active');
}

/* ---------- CAROUSEL ---------- */
let carouselIndex = 0;
function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  const cards = track.querySelectorAll('.product-card');
  const visible = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1;
  const maxIndex = Math.max(0, cards.length - visible);
  document.getElementById('carousel-prev').onclick = () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    moveCarousel(track, visible);
  };
  document.getElementById('carousel-next').onclick = () => {
    carouselIndex = Math.min(maxIndex, carouselIndex + 1);
    moveCarousel(track, visible);
  };
}

function moveCarousel(track, visible) {
  const cardWidth = track.querySelector('.product-card').offsetWidth + 24;
  track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}

/* ---------- NEWSLETTER ---------- */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (!input.value.includes('@')) { showToast('❌ Please enter a valid email.'); return; }
  showToast('✅ You\'re subscribed! Welcome to the steep crew.');
  input.value = '';
}

/* ---------- ANNOUNCEMENT BAR ---------- */
function closeAnnouncement() {
  const bar = document.querySelector('.announcement-bar');
  if (bar) bar.style.display = 'none';
}

/* ---------- MOBILE NAV ---------- */
function openMobileNav() {
  document.getElementById('mobile-nav').classList.add('open');
  document.getElementById('mob-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mob-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

/* ---------- SCROLL TO TOP ---------- */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- RENDER PRODUCT CARDS ---------- */
function renderProductCard(p, isCarousel = false) {
  const badgeHtml = p.badge
    ? `<span class="product-badge ${p.badge === 'Sale' ? 'sale' : p.badge === 'New' ? 'new' : ''}">${p.badge}</span>` : '';
  const priceHtml = p.original
    ? `<span class="product-price">$${p.price.toFixed(2)}<span class="original">$${p.original.toFixed(2)}</span></span>`
    : `<span class="product-price">$${p.price.toFixed(2)}</span>`;
  const starsHtml = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        ${badgeHtml}
        <span class="product-emoji">${p.emoji}</span>
        <button class="product-wishlist" onclick="toggleWishlist(${p.id},this)">${wishlist.has(p.id)?'♥':'♡'}</button>
      </div>
      <div class="product-info">
        <div class="product-tags">${p.tags.map(t=>`<span class="product-tag">${t}</span>`).join('')}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-rating">
          <span class="stars">${starsHtml}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          ${priceHtml}
          <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* Products grid */
  const grid = document.getElementById('products-grid');
  if (grid) grid.innerHTML = PRODUCTS.slice(0, 8).map(p => renderProductCard(p)).join('');

  /* Carousel */
  const track = document.getElementById('carousel-track');
  if (track) {
    track.innerHTML = PRODUCTS.slice(0, 8).map(p => renderProductCard(p, true)).join('');
    initCarousel();
  }

  /* Search */
  const si = document.getElementById('search-input');
  if (si) si.addEventListener('input', handleSearch);

  /* Newsletter */
  const nf = document.getElementById('newsletter-form');
  if (nf) nf.addEventListener('submit', handleNewsletter);

  /* Close overlays on outside click */
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('search-overlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('search-overlay')) closeSearch();
  });

  /* Keyboard */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCart(); closeSearch(); closeMobileNav(); }
  });

  initScrollTop();
  updateCartUI();

  /* Intersection Observer — fade-in cards */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.product-card, .tea-type-card, .blog-card, .testimonial-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }, 100);
});
