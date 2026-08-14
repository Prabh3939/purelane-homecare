import { products, combos, bundleCategories, whyBundlesFeatures, reviews } from './data.js';
import { createElement, createProductCard, createComboCard, createCartItemRow } from './component.js';

class App {
  constructor() {
    this.cart = [];
    this.selectedBundleTab = 'family';
    this.init();
  }

  init() {
    this.renderHero();
    this.renderShop();
    this.renderCombos();
    this.renderWhyBundles();
    this.renderFindRightBundle();
    this.renderReviews();
    this.renderFooter();
    this.setupCartDrawer();
  }

  // --- CART MANAGEMENT ---
  addToCart(item) {
    const existing = this.cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.updateCartUI();
    this.openCart();
  }

  updateQuantity(id, change) {
    const item = this.cart.find(i => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter(i => i.id !== id);
      }
    }
    this.updateCartUI();
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.updateCartUI();
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-badge').textContent = totalItems;
    document.getElementById('drawer-cart-count').textContent = totalItems;

    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (this.cart.length === 0) {
      container.innerHTML = '<p class="text-xs text-center text-slate-400 py-8">Your cart is empty.</p>';
    } else {
      this.cart.forEach(item => {
        container.appendChild(createCartItemRow(
          item,
          (id, change) => this.updateQuantity(id, change),
          (id) => this.removeFromCart(id)
        ));
      });
    }

    const totalCost = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-subtotal').textContent = `₹${totalCost}`;
  }

  setupCartDrawer() {
    const toggleBtn = document.getElementById('cart-toggle-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const backdrop = document.getElementById('cart-backdrop');

    toggleBtn.addEventListener('click', () => this.openCart());
    closeBtn.addEventListener('click', () => this.closeCart());
    backdrop.addEventListener('click', () => this.closeCart());
  }

  openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  }

  closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
  }

  // --- SECTIONS RENDERING ---
  renderHero() {
    const container = document.getElementById('hero');
    container.innerHTML = `
      <div class="max-w-xl">
        <span class="text-xs font-bold tracking-widest text-accent uppercase block mb-2">100% Plant-Based Formulas</span>
        <h1 class="text-4xl md:text-6xl font-extrabold uppercase text-surface leading-tight mb-4">Cleaner Home, Pure Living</h1>
        <p class="text-sm md:text-base text-slate-600 mb-6">Non-toxic, bio-degradable homecare designed for kitchen, laundry, floor, and hand care.</p>
        <div class="flex gap-3">
          <a href="#shop" class="bg-teal-900 text-white text-xs font-bold px-6 py-3 rounded-full shadow-md hover:bg-teal-800 transition-all">Explore Range</a>
          <a href="#bundles" class="bg-white/80 border border-brand/20 text-surface text-xs font-bold px-6 py-3 rounded-full hover:bg-white transition-all">View Bundles</a>
        </div>
      </div>
    `;
  }

  renderShop() {
    const container = document.getElementById('shop');
    const header = createElement('div', 'mb-6 text-center', `
      <h2 class="text-2xl md:text-3xl font-extrabold text-surface uppercase">Our Product Range</h2>
      <p class="text-xs text-slate-500">Formulated with natural botanical extracts</p>
    `);
    const grid = createElement('div', 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4');
    products.forEach(product => grid.appendChild(createProductCard(product, (item) => this.addToCart(item))));
    container.append(header, grid);
  }

  renderCombos() {
    const container = document.getElementById('combos');
    const header = createElement('div', 'mb-6 text-center', `
      <h2 class="text-2xl md:text-3xl font-extrabold text-surface uppercase">Best-Selling Combos</h2>
    `);
    const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 gap-4');
    combos.forEach(combo => grid.appendChild(createComboCard(combo, (item) => this.addToCart(item))));
    container.append(header, grid);
  }

  // --- WHY BUNDLES BEAT BUYING SINGLE ---
  renderWhyBundles() {
    const container = document.getElementById('why-bundles');
    const content = createElement('div', 'bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-brand/10 shadow-sm');
    content.innerHTML = `
      <div class="text-center max-w-xl mx-auto mb-8">
        <h2 class="text-2xl md:text-3xl font-extrabold text-surface uppercase">Why Bundles Beat Buying Single</h2>
        <p class="text-xs text-slate-500 mt-1">Smarter for your home, wallet, and planet</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${whyBundlesFeatures.map(f => `
          <div class="text-center p-4 bg-white/60 rounded-2xl border border-brand/5">
            <div class="text-4xl mb-3">${f.icon}</div>
            <h3 class="font-bold text-surface uppercase text-sm mb-1">${f.title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${f.text}</p>
          </div>
        `).join('')}
      </div>
    `;
    container.append(content);
  }

  // --- FIND THE RIGHT BUNDLE FOR YOU ---
  renderFindRightBundle() {
    const container = document.getElementById('bundles');
    container.innerHTML = '';

    const header = createElement('div', 'mb-6 text-center', `
      <h2 class="text-2xl md:text-3xl font-extrabold text-surface uppercase">Find the Right Bundle for You</h2>
      <p class="text-xs text-slate-500">Select your household size for curated packs</p>
    `);

    // Category Selector Tabs
    const tabs = createElement('div', 'flex justify-center gap-2 mb-8 flex-wrap');
    bundleCategories.forEach(cat => {
      const activeClass = this.selectedBundleTab === cat.id ? 'bg-brand text-white' : 'bg-white/80 text-slate-700 hover:bg-white';
      const btn = createElement('button', `px-4 py-2 rounded-full text-xs font-bold transition-all border border-brand/10 ${activeClass}`, cat.category);
      btn.addEventListener('click', () => {
        this.selectedBundleTab = cat.id;
        this.renderFindRightBundle();
      });
      tabs.appendChild(btn);
    });

    // Bundles Grid for Selected Category
    const activeCategory = bundleCategories.find(c => c.id === this.selectedBundleTab) || bundleCategories[0];
    const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto');

    activeCategory.bundles.forEach(bundle => {
      const card = createElement('div', `bg-white/80 p-6 rounded-2xl border ${bundle.best ? 'border-accent shadow-md' : 'border-brand/10'} flex flex-col justify-between`);
      card.innerHTML = `
        <div>
          ${bundle.best ? '<span class="text-[9px] font-bold tracking-widest uppercase bg-accent text-white px-2.5 py-0.5 rounded-full">Best Match</span>' : ''}
          <h3 class="text-3xl font-extrabold text-surface mt-2">${bundle.qty}</h3>
          <p class="text-xs font-bold text-slate-500 uppercase">${bundle.name}</p>
          <ul class="my-4 space-y-1.5 text-xs text-slate-600">
            ${bundle.features.map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="text-xl font-bold text-accent mb-3">₹${bundle.price} <s class="text-xs text-slate-400">₹${bundle.originalPrice}</s></div>
          <button class="add-bundle-btn w-full bg-brand hover:bg-brand-lt text-white text-xs font-bold py-2.5 rounded-full transition-colors">Select Bundle</button>
        </div>
      `;

      card.querySelector('.add-bundle-btn').addEventListener('click', () => this.addToCart(bundle));
      grid.appendChild(card);
    });

    container.append(header, tabs, grid);
  }

  renderReviews() {
    const container = document.getElementById('reviews');
    const header = createElement('div', 'mb-6 text-center', `
      <h2 class="text-2xl md:text-3xl font-extrabold text-surface uppercase">What Our Customers Say</h2>
    `);
    const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-3 gap-4');

    reviews.forEach(review => {
      const card = createElement('div', 'bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-brand/10');
      card.innerHTML = `
        <div class="text-amber-500 text-xs mb-2">★★★★★</div>
        <p class="text-xs text-slate-700 mb-3 italic">"${review.text}"</p>
        <div class="text-[10px] font-bold uppercase text-slate-500">${review.author} — <span class="text-accent">${review.role}</span></div>
      `;
      grid.appendChild(card);
    });

    container.append(header, grid);
  }

  // --- FOOTER RENDERING ---
  renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-accent text-white font-bold grid place-items-center text-sm">P</div>
            <span class="font-bold text-white text-base tracking-wide uppercase">Purelane</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">Plant-based, non-toxic household cleaning formulations designed for clean homes and a greener planet.</p>
        </div>

        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="#shop" class="hover:text-accent transition-colors">Shop All Products</a></li>
            <li><a href="#combos" class="hover:text-accent transition-colors">Combos</a></li>
            <li><a href="#bundles" class="hover:text-accent transition-colors">Value Bundles</a></li>
            <li><a href="#why-bundles" class="hover:text-accent transition-colors">Why Bundles</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Support & Policies</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="#" class="hover:text-accent transition-colors">Shipping & Returns</a></li>
            <li><a href="#" class="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-accent transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Stay Updated</h4>
          <p class="text-xs text-slate-400 mb-3">Subscribe for eco-tips & exclusive bundle discounts.</p>
          <form onsubmit="event.preventDefault(); alert('Subscribed!');" class="flex gap-2">
            <input type="email" placeholder="Your email" required class="bg-surface border border-slate-700 rounded-full px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent w-full" />
            <button class="bg-accent text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-amber-600 transition-all">Join</button>
          </form>
        </div>
      </div>

      <div class="border-t border-slate-800 text-center py-4 text-[11px] text-slate-500">
        © ${new Date().getFullYear()} Purelane Homecare. All rights reserved.
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => new App());