// app.js - Complete JavaScript Functionality

// Product Data
const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 35,
    originalPrice: 45,
    category: "men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop",
    rating: 4.5,
    reviews: 128,
    badge: "Sale",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#808080"],
    description: "Premium quality cotton t-shirt with a classic fit. Perfect for everyday wear."
  },
  {
    id: 2,
    name: "Slim Fit Denim Jacket",
    price: 89,
    category: "men",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 96,
    sizes: ["M", "L", "XL"],
    colors: ["#000080", "#000000"],
    description: "Modern slim fit denim jacket with vintage wash finish."
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 65,
    category: "women",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 234,
    badge: "New",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FFB6C1", "#FFFFFF"],
    description: "Light and breezy floral dress perfect for summer occasions."
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 120,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 89,
    sizes: ["One Size"],
    colors: ["#8B4513", "#000000"],
    description: "Genuine leather crossbody bag with adjustable strap."
  },
  {
    id: 5,
    name: "Running Sneakers",
    price: 95,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop",
    rating: 4.6,
    reviews: 312,
    badge: "Popular",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    description: "High-performance running shoes with cushioned sole."
  },
  {
    id: 6,
    name: "Wool Blend Coat",
    price: 180,
    originalPrice: 220,
    category: "women",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 67,
    badge: "Sale",
    sizes: ["S", "M", "L"],
    colors: ["#808080", "#000000", "#8B4513"],
    description: "Elegant wool blend coat for the colder months."
  },
  {
    id: 7,
    name: "Classic White Sneakers",
    price: 75,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&auto=format&fit=crop",
    rating: 4.4,
    reviews: 156,
    sizes: ["7", "8", "9", "10"],
    colors: ["#FFFFFF"],
    description: "Minimalist white sneakers that go with everything."
  },
  {
    id: 8,
    name: "Silk Scarf",
    price: 45,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 45,
    badge: "New",
    sizes: ["One Size"],
    colors: ["#FF6347", "#4169E1", "#FFD700"],
    description: "Luxurious silk scarf with artistic print."
  }
];

// State Management
let cart = JSON.parse(localStorage.getItem('dreamora_cart')) || [];
let currentTheme = localStorage.getItem('dreamora_theme') || 'light';
let currentFilters = {
  categories: [],
  priceMax: 200,
  sizes: []
};
let currentSort = 'featured';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSearch();
  initCart();
  initPageSpecific();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('dreamora_theme', currentTheme);
    });
  }
}

// Navigation
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

// Search Functionality
function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    });
  }

  if (closeSearch && searchOverlay) {
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );

      displaySearchResults(filtered);
    });
  }
}

function displaySearchResults(results) {
  const searchResults = document.getElementById('searchResults');
  if (!searchResults) return;

  if (results.length === 0) {
    searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No products found</p>';
    return;
  }

  searchResults.innerHTML = results.map(product => `
    <div class="search-result-item" onclick="window.location.href='product.html?id=${product.id}'">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h4 style="font-size: 14px; margin-bottom: 4px;">${product.name}</h4>
        <p style="font-size: 13px; color: var(--accent-color); font-weight: 600;">$${product.price}</p>
      </div>
    </div>
  `).join('');
}

// Cart Management
function initCart() {
  updateCartCount();
  
  const cartBtn = document.querySelector('.cart-btn');
  const miniCart = document.getElementById('miniCart');
  const closeMiniCart = document.getElementById('closeMiniCart');

  if (cartBtn && miniCart) {
    cartBtn.addEventListener('click', (e) => {
      if (window.location.pathname.includes('cart.html')) return;
      e.preventDefault();
      miniCart.classList.toggle('active');
      updateMiniCart();
    });
  }

  if (closeMiniCart && miniCart) {
    closeMiniCart.addEventListener('click', () => {
      miniCart.classList.remove('active');
    });
  }

  // Close mini cart when clicking outside
  document.addEventListener('click', (e) => {
    if (miniCart && !miniCart.contains(e.target) && !cartBtn?.contains(e.target)) {
      miniCart.classList.remove('active');
    }
  });
}

function addToCart(productId, quantity = 1, size = null, color = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => 
    item.id === productId && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
      size,
      color,
      cartId: Date.now()
    });
  }

  saveCart();
  updateCartCount();
  updateMiniCart();
  showToast(`${product.name} added to cart!`);
  
  // Animate cart icon
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
  }
}

function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  saveCart();
  updateCartCount();
  updateMiniCart();
  renderCart();
}

function updateQuantity(cartId, change) {
  const item = cart.find(item => item.cartId === cartId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(cartId);
    } else {
      saveCart();
      updateCartCount();
      updateMiniCart();
      renderCart();
    }
  }
}

function saveCart() {
  localStorage.setItem('dreamora_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
  });
}

function updateMiniCart() {
  const miniCartItems = document.getElementById('miniCartItems');
  const miniCartTotal = document.getElementById('miniCartTotal');
  
  if (!miniCartItems) return;

  if (cart.length === 0) {
    miniCartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty</p>';
    if (miniCartTotal) miniCartTotal.textContent = '$0.00';
    return;
  }

  miniCartItems.innerHTML = cart.map(item => `
    <div class="mini-cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="mini-cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.size ? `Size: ${item.size}` : ''} ${item.color ? `Color: ${item.color}` : ''}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <span class="mini-cart-item-price">$${item.price * item.quantity}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">Qty: ${item.quantity}</span>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.cartId})">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (miniCartTotal) miniCartTotal.textContent = `$${total.toFixed(2)}`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Page Specific Initialization
function initPageSpecific() {
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path === '/' || path === '') {
    initHomePage();
  } else if (path.includes('shop.html')) {
    initShopPage();
  } else if (path.includes('product.html')) {
    initProductPage();
  } else if (path.includes('cart.html')) {
    initCartPage();
  } else if (path.includes('checkout.html')) {
    initCheckoutPage();
  }
}

// Home Page
function initHomePage() {
  // Render featured products
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = products.slice(0, 4);
    featuredGrid.innerHTML = featured.map(product => createProductCard(product)).join('');
  }

  // Initialize promo timer
  initPromoTimer();

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn" onclick="window.location.href='product.html?id=${product.id}'" title="View Details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">
          <span class="current-price">$${product.price}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
        </div>
        <div class="product-rating">
          ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          <span>(${product.reviews})</span>
        </div>
      </div>
    </div>
  `;
}

function initPromoTimer() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);

  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);
  updateTimer();
}

// Shop Page
function initShopPage() {
  const shopGrid = document.getElementById('shopGrid');
  const sortSelect = document.getElementById('sortSelect');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const categoryFilters = document.querySelectorAll('input[data-filter="category"]');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const clearFilters = document.getElementById('clearFilters');
  const mobileFilterToggle = document.getElementById('mobileFilterToggle');
  const shopSidebar = document.getElementById('shopSidebar');

  // Check URL params for category
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const checkbox = document.querySelector(`input[value="${categoryParam}"]`);
    if (checkbox) checkbox.checked = true;
    currentFilters.categories = [categoryParam];
  }

  function renderProducts() {
    let filtered = products.filter(product => {
      const categoryMatch = currentFilters.categories.length === 0 || currentFilters.categories.includes(product.category);
      const priceMatch = product.price <= currentFilters.priceMax;
      const sizeMatch = currentFilters.sizes.length === 0 || 
        (product.sizes && product.sizes.some(size => currentFilters.sizes.includes(size)));
      return categoryMatch && priceMatch && sizeMatch;
    });

    // Sort
    switch(currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    if (shopGrid) {
      if (filtered.length === 0) {
        shopGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-secondary);">No products found matching your criteria.</p>';
      } else {
        shopGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');
      }
    }

    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    }
  }

  // Event Listeners
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
      currentFilters.priceMax = parseInt(e.target.value);
      priceValue.textContent = `$${currentFilters.priceMax}`;
      renderProducts();
    });
  }

  categoryFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      currentFilters.categories = Array.from(categoryFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      renderProducts();
    });
  });

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      currentFilters.sizes = Array.from(sizeBtns)
        .filter(b => b.classList.contains('active'))
        .map(b => b.dataset.size);
      renderProducts();
    });
  });

  if (clearFilters) {
    clearFilters.addEventListener('click', () => {
      currentFilters = { categories: [], priceMax: 200, sizes: [] };
      categoryFilters.forEach(cb => cb.checked = false);
      if (priceRange) priceRange.value = 200;
      if (priceValue) priceValue.textContent = '$200';
      sizeBtns.forEach(btn => btn.classList.remove('active'));
      renderProducts();
    });
  }

  if (mobileFilterToggle && shopSidebar) {
    mobileFilterToggle.addEventListener('click', () => {
      shopSidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && 
          !shopSidebar.contains(e.target) && 
          !mobileFilterToggle.contains(e.target)) {
        shopSidebar.classList.remove('active');
      }
    });
  }

  renderProducts();
}

// Product Detail Page
function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    window.location.href = 'shop.html';
    return;
  }

  // Update breadcrumb
  const breadcrumb = document.getElementById('productBreadcrumb');
  if (breadcrumb) breadcrumb.textContent = product.name;

  // Render product details
  const productDetail = document.getElementById('productDetail');
  if (productDetail) {
    productDetail.innerHTML = `
      <div class="product-gallery">
        <div class="main-image">
          <img src="${product.image}" alt="${product.name}" id="mainImage">
          <button class="zoom-btn" onclick="zoomImage()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
        </div>
        <div class="thumbnail-list">
          <div class="thumbnail active" onclick="changeImage('${product.image}')">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="thumbnail" onclick="changeImage('${product.image}')">
            <img src="${product.image}" alt="${product.name} 2">
          </div>
          <div class="thumbnail" onclick="changeImage('${product.image}')">
            <img src="${product.image}" alt="${product.name} 3">
          </div>
        </div>
      </div>
      
      <div class="product-info-detail">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <div class="product-rating-detail">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span>${product.reviews} reviews</span>
          </div>
        </div>
        
        <h1 class="product-name">${product.name}</h1>
        <div class="product-price-detail">
          $${product.price}
          ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-light); font-size: 20px; margin-left: 12px;">$${product.originalPrice}</span>` : ''}
        </div>
        
        <p class="product-description">${product.description}</p>
        
        <div class="product-options">
          ${product.colors ? `
            <div class="option-group">
              <label class="option-label">Color</label>
              <div class="color-options">
                ${product.colors.map((color, idx) => `
                  <button class="color-btn ${idx === 0 ? 'active' : ''}" 
                          style="background-color: ${color};"
                          onclick="selectColor(this, '${color}')"
                          data-color="${color}"></button>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${product.sizes ? `
            <div class="option-group">
              <label class="option-label">Size</label>
              <div class="size-options">
                ${product.sizes.map((size, idx) => `
                  <button class="size-option ${idx === 0 ? 'active' : ''}" 
                          onclick="selectSize(this, '${size}')"
                          data-size="${size}">${size}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="quantity-selector">
          <button class="qty-btn" onclick="updateProductQty(-1)">-</button>
          <input type="number" class="qty-input" id="productQty" value="1" min="1" max="10" readonly>
          <button class="qty-btn" onclick="updateProductQty(1)">+</button>
        </div>
        
        <div class="product-actions-detail">
          <button class="btn-add-cart" onclick="addProductToCart(${product.id})">Add to Cart</button>
          <button class="btn-wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        
        <div class="product-features">
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <div class="feature-title">Free Shipping</div>
            <div class="feature-desc">On orders over $50</div>
          </div>
          <div class="feature">
            <div class="feature-icon">↩️</div>
            <div class="feature-title">Easy Returns</div>
            <div class="feature-desc">30-day policy</div>
          </div>
          <div class="feature">
            <div class="feature-icon">🛡️</div>
            <div class="feature-title">Secure Payment</div>
            <div class="feature-desc">100% protected</div>
          </div>
        </div>
      </div>
    `;
  }

  // Render related products
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    relatedGrid.innerHTML = related.map(p => createProductCard(p)).join('');
  }
}

function changeImage(src) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = src;
      mainImage.style.opacity = '1';
    }, 200);
  }
  
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function selectColor(btn, color) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function updateProductQty(change) {
  const input = document.getElementById('productQty');
  if (input) {
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    input.value = val;
  }
}

function addProductToCart(productId) {
  const qty = parseInt(document.getElementById('productQty')?.value || 1);
  const colorBtn = document.querySelector('.color-btn.active');
  const sizeBtn = document.querySelector('.size-option.active');
  
  const color = colorBtn ? colorBtn.dataset.color : null;
  const size = sizeBtn ? sizeBtn.dataset.size : null;
  
  addToCart(productId, qty, size, color);
}

function zoomImage() {
  // Simple zoom functionality
  const img = document.getElementById('mainImage');
  if (img) {
    img.style.transform = img.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
    img.style.cursor = img.style.transform === 'scale(1.5)' ? 'zoom-out' : 'zoom-in';
  }
}

// Cart Page
function initCartPage() {
  renderCart();
}

function renderCart() {
  const cartLayout = document.getElementById('cartLayout');
  if (!cartLayout) return;

  if (cart.length === 0) {
    cartLayout.innerHTML = `
      <div class="empty-cart" style="grid-column: 1/-1;">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top: 24px;">Start Shopping</a>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  cartLayout.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="cart-item-variant">
              ${item.color ? `Color: ${item.color}` : ''} 
              ${item.size ? `Size: ${item.size}` : ''}
            </p>
            <p class="cart-item-price">$${item.price}</p>
            <div class="quantity-selector" style="margin-top: 12px;">
              <button class="qty-btn" onclick="updateQuantity(${item.cartId}, -1)" style="width: 32px; height: 32px;">-</button>
              <input type="number" class="qty-input" value="${item.quantity}" readonly style="width: 50px; height: 32px;">
              <button class="qty-btn" onclick="updateQuantity(${item.cartId}, 1)" style="width: 32px; height: 32px;">+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <p class="cart-item-price">$${item.price * item.quantity}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.cartId})">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="cart-summary">
      <h3 class="summary-title">Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax</span>
        <span>$${(subtotal * 0.08).toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${(total + subtotal * 0.08).toFixed(2)}</span>
      </div>
      <button class="btn btn-primary checkout-btn" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
      <a href="shop.html" class="continue-shopping">← Continue Shopping</a>
    </div>
  `;
}

// Checkout Page
function initCheckoutPage() {
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutShipping = document.getElementById('checkoutShipping');
  const checkoutTax = document.getElementById('checkoutTax');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const checkoutItemCount = document.getElementById('checkoutItemCount');

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Render items
  if (checkoutItems) {
    checkoutItems.innerHTML = cart.map(item => `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="summary-item-details">
          <h4>${item.name}</h4>
          <p>${item.color ? item.color + ' / ' : ''}${item.size ? item.size : ''}</p>
          <p>Qty: ${item.quantity}</p>
        </div>
        <span class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (checkoutItemCount) checkoutItemCount.textContent = `${cart.reduce((sum, item) => sum + item.quantity, 0)} items`;
  if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  if (checkoutTax) checkoutTax.textContent = `$${tax.toFixed(2)}`;
  if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;

  // Payment method tabs
  const paymentTabs = document.querySelectorAll('.payment-tab');
  paymentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      paymentTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const method = tab.dataset.method;
      document.getElementById('cardPayment').classList.toggle('hidden', method !== 'card');
      document.getElementById('paypalPayment').classList.toggle('hidden', method !== 'paypal');
    });
  });

  // Shipping method selection
  const shippingOptions = document.querySelectorAll('.shipping-option');
  shippingOptions.forEach(option => {
    option.addEventListener('click', () => {
      shippingOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      option.querySelector('input').checked = true;
      
      // Recalculate total
      const isExpress = option.querySelector('input').value === 'express';
      const newShipping = isExpress ? 15 : (subtotal > 50 ? 0 : 15);
      const newTotal = subtotal + newShipping + tax;
      
      if (checkoutShipping) checkoutShipping.textContent = newShipping === 0 ? 'Free' : `$${newShipping.toFixed(2)}`;
      if (checkoutTotal) checkoutTotal.textContent = `$${newTotal.toFixed(2)}`;
    });
  });

  // Discount code
  const applyDiscount = document.getElementById('applyDiscount');
  const discountCode = document.getElementById('discountCode');
  const discountLine = document.getElementById('discountLine');
  const discountAmount = document.getElementById('discountAmount');

  if (applyDiscount) {
    applyDiscount.addEventListener('click', () => {
      const code = discountCode.value.trim().toUpperCase();
      if (code === 'DREAM20') {
        const discount = subtotal * 0.2;
        discountLine.classList.remove('hidden');
        discountAmount.textContent = `-$${discount.toFixed(2)}`;
        if (checkoutTotal) checkoutTotal.textContent = `$${(total - discount).toFixed(2)}`;
        showToast('Discount applied successfully!');
      } else {
        showToast('Invalid discount code');
      }
    });
  }

  // Complete order
  const completeOrder = document.getElementById('completeOrder');
  if (completeOrder) {
    completeOrder.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validate form
      const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone'];
      let valid = true;
      
      requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
          input.style.borderColor = '#ff4444';
          valid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (!valid) {
        showToast('Please fill in all required fields');
        return;
      }

      // Show success modal
      const modal = document.getElementById('successModal');
      const orderNumber = document.getElementById('orderNumber');
      const confirmationEmail = document.getElementById('confirmationEmail');
      
      if (orderNumber) orderNumber.textContent = Math.floor(Math.random() * 90000) + 10000;
      if (confirmationEmail) confirmationEmail.textContent = document.getElementById('email')?.value || 'your@email.com';
      
      if (modal) modal.classList.add('active');
      
      // Clear cart
      cart = [];
      saveCart();
      updateCartCount();
    });
  }

  // Input formatting
  const cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = value;
    });
  }

  const expiry = document.getElementById('expiry');
  if (expiry) {
    expiry.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('successModal');
  if (modal && e.target === modal) {
    modal.classList.remove('active');
    window.location.href = 'index.html';
  }
});