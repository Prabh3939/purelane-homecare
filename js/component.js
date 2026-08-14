export function createElement(tag, classes = '', content = '') {
  const el = document.createElement(tag);
  if (classes) el.className = classes;
  if (content) el.innerHTML = content;
  return el;
}

export function createProductCard(product, onAddToCart) {
  const card = createElement('div', 'bg-white/80 backdrop-blur-md border border-brand/10 p-5 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between');
  card.innerHTML = `
    <div>
      <div class="h-36 bg-brand/5 rounded-xl flex items-center justify-center relative overflow-hidden mb-3 text-4xl">
        <span class="absolute top-2 left-2 text-[10px] font-bold tracking-wider uppercase bg-white px-2 py-0.5 rounded-full text-accent border border-amber-200">${product.badge}</span>
        ${product.icon}
      </div>
      <h4 class="font-bold text-surface text-sm uppercase mb-1">${product.name}</h4>
      <div class="text-xs text-slate-500 mb-3">★ <strong class="text-accent">${product.rating}</strong> (${product.reviewsCount})</div>
    </div>
    <div>
      <div class="flex items-baseline gap-2 mb-3">
        <strong class="text-lg font-bold text-surface">₹${product.price}</strong>
        <s class="text-xs text-slate-400">₹${product.originalPrice}</s>
      </div>
      <button class="add-to-cart-btn w-full bg-brand hover:bg-brand-lt text-white text-xs font-bold py-2.5 rounded-full transition-colors">
        Add to Cart
      </button>
    </div>
  `;

  card.querySelector('.add-to-cart-btn').addEventListener('click', () => onAddToCart(product));
  return card;
}

export function createComboCard(combo, onAddToCart) {
  const card = createElement('div', 'bg-white/80 backdrop-blur-md border border-brand/10 p-6 rounded-2xl shadow-sm flex flex-col justify-between');
  card.innerHTML = `
    <div>
      <div class="flex justify-between items-center mb-2">
        <span class="text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-accent px-2.5 py-1 rounded-full">${combo.discount}</span>
        <span class="text-2xl">${combo.icon}</span>
      </div>
      <h3 class="font-bold text-surface text-lg uppercase mt-2">${combo.name}</h3>
      <ul class="my-3 space-y-1 text-xs text-slate-500">
        ${combo.items.map(item => `<li>✓ Includes ${item}</li>`).join('')}
      </ul>
    </div>
    <div>
      <div class="flex items-baseline gap-2 mb-4">
        <strong class="text-2xl font-bold text-surface">₹${combo.price}</strong>
        <s class="text-xs text-slate-400">₹${combo.originalPrice}</s>
      </div>
      <button class="add-to-cart-btn w-full bg-teal-900 hover:bg-teal-800 text-white text-xs font-bold py-2.5 rounded-full transition-all">
        Get Combo
      </button>
    </div>
  `;

  card.querySelector('.add-to-cart-btn').addEventListener('click', () => onAddToCart(combo));
  return card;
}

export function createCartItemRow(item, onUpdateQty, onRemove) {
  const row = createElement('div', 'flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100');
  row.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-lg">
        ${item.icon || '📦'}
      </div>
      <div>
        <h5 class="text-xs font-bold text-surface uppercase">${item.name}</h5>
        <span class="text-xs text-accent font-semibold">₹${item.price}</span>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
        <button class="qty-btn-minus px-2 py-0.5 text-xs font-bold hover:bg-slate-100">-</button>
        <span class="px-2 text-xs font-bold text-slate-700">${item.quantity}</span>
        <button class="qty-btn-plus px-2 py-0.5 text-xs font-bold hover:bg-slate-100">+</button>
      </div>
      <button class="remove-btn text-xs text-slate-400 hover:text-red-500 font-bold px-1">✕</button>
    </div>
  `;

  row.querySelector('.qty-btn-minus').addEventListener('click', () => onUpdateQty(item.id, -1));
  row.querySelector('.qty-btn-plus').addEventListener('click', () => onUpdateQty(item.id, 1));
  row.querySelector('.remove-btn').addEventListener('click', () => onRemove(item.id));
  return row;
}