const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const products = [
  { id: "embroidered-suit", name: "Elegant Embroidered Suit", category: "Suits", price: 2499, oldPrice: 3299, rating: 4.9, reviews: 12, badge: "Bestseller", fabric: "Georgette", image: "photo-1610030469983-98e550d6193c" },
  { id: "royal-saree", name: "Royal Festive Saree", category: "Sarees", price: 3299, oldPrice: 4499, rating: 4.8, reviews: 8, badge: "New arrival", fabric: "Silk", image: "photo-1617627143750-d86bc21e42bb" },
  { id: "printed-fabric", name: "Premium Unstitched Fabric", category: "Raw Fabric", price: 1299, oldPrice: 1799, rating: 4.7, reviews: 16, badge: "Pure elegance", fabric: "Cotton", image: "photo-1606760227091-3dd870d97f1d" },
  { id: "cotton-suit", name: "Everyday Cotton Suit", category: "Suits", price: 1499, oldPrice: 1999, rating: 4.8, reviews: 6, badge: "Comfort pick", fabric: "Cotton", image: "photo-1595777457583-95e059d581b8" },
  { id: "party-suit", name: "Party Edit Suit Set", category: "Suits", price: 2899, oldPrice: 3899, rating: 4.9, reviews: 10, badge: "Limited edit", fabric: "Georgette", image: "photo-1539109136881-3be0616acf4b" },
  { id: "festive-saree", name: "Festive Banarasi Saree", category: "Sarees", price: 3799, oldPrice: 4999, rating: 4.9, reviews: 14, badge: "Bestseller", fabric: "Silk", image: "photo-1610030469983-98e550d6193c" },
  { id: "designer-anarkali", name: "Designer Anarkali", category: "Party Wear", price: 4199, oldPrice: 5599, rating: 4.8, reviews: 7, badge: "Occasion wear", fabric: "Georgette", image: "photo-1617627143750-d86bc21e42bb" },
  { id: "printed-saree", name: "Garden Bloom Saree", category: "Sarees", price: 2199, oldPrice: 2999, rating: 4.7, reviews: 9, badge: "New arrival", fabric: "Cotton", image: "photo-1591047139829-d91aecb6caea" },
  { id: "kurti-set", name: "Everyday Kurti Set", category: "Kurtis", price: 1899, oldPrice: 2499, rating: 4.6, reviews: 5, badge: "Easy days", fabric: "Cotton", image: "photo-1551232864-3f0890e580d9" },
  { id: "couture-lehenga", name: "Couture Occasion Set", category: "Party Wear", price: 5299, oldPrice: 6999, rating: 5, reviews: 4, badge: "Couture edit", fabric: "Silk", image: "photo-1610030469983-98e550d6193c" },
  { id: "linen-kurti", name: "Soft Linen Kurti", category: "Kurtis", price: 1699, oldPrice: 2199, rating: 4.7, reviews: 11, badge: "Everyday edit", fabric: "Cotton", image: "photo-1591047139829-d91aecb6caea" },
  { id: "embroidered-dupatta", name: "Embroidered Dupatta", category: "Accessories", price: 999, oldPrice: 1399, rating: 4.8, reviews: 13, badge: "Finishing touch", fabric: "Georgette", image: "photo-1606760227091-3dd870d97f1d" }
];

const categoryTiles = [
  ["Suits", "photo-1610030469983-98e550d6193c", "suits"],
  ["Sarees", "photo-1617627143750-d86bc21e42bb", "sarees"],
  ["Raw Fabric", "photo-1606760227091-3dd870d97f1d", "raw-fabric"],
  ["Cotton Suits", "photo-1595777457583-95e059d581b8", "cotton-suits"],
  ["Designer Articles", "photo-1539109136881-3be0616acf4b", "party-wear"],
  ["Party Wear", "photo-1610030469983-98e550d6193c", "party-wear"],
  ["Kurtis", "photo-1551232864-3f0890e580d9", "kurtis"],
  ["Accessories", "photo-1606760227091-3dd870d97f1d", "accessories"]
];

const categoryAliases = {
  "sarees": { title: "Sarees", match: ["Sarees"] },
  "suits": { title: "Suits", match: ["Suits"] },
  "raw-fabric": { title: "Raw Fabric", match: ["Raw Fabric"] },
  "cotton-suits": { title: "Cotton Suits", match: ["Suits"], fabric: "Cotton" },
  "party-wear": { title: "Party Wear", match: ["Party Wear"] },
  "kurtis": { title: "Kurtis", match: ["Kurtis"] },
  "accessories": { title: "Accessories", match: ["Accessories"] }
};

const cartKey = "anvish-couture-cart-v1";
let cart = readCart();
let toastTimer;

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(product => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0) : [];
  } catch {
    return [];
  }
}

function persistCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function productById(id) {
  return products.find(product => product.id === id);
}

function breadcrumb(label) {
  return `<div class="breadcrumbs"><a href="#home">Home</a> &nbsp;›&nbsp; ${label}</div>`;
}

function productCard(product) {
  return `<article class="product-card" data-product="${product.id}" data-fabric="${product.fabric}">
    <div class="product-photo"><a href="#product/${product.id}" aria-label="View ${product.name}">
      <img src="${photo(product.image, 700)}" alt="${product.name}" loading="lazy">
      <span class="product-badge">${product.badge}</span>
    </a><button class="wishlist" type="button" aria-label="Add ${product.name} to wishlist" data-wishlist="${product.id}">♡</button></div>
    <div class="product-info">
      <a class="product-name" href="#product/${product.id}">${product.name}</a>
      <div class="product-price">${money(product.price)} <del>${money(product.oldPrice)}</del> <span class="discount">(${Math.round((1 - product.price / product.oldPrice) * 100)}% off)</span></div>
      <div class="rating" aria-label="Rated ${product.rating} out of 5">★★★★★ <small>(${product.reviews})</small></div>
      <button class="button card-add" type="button" data-add="${product.id}">＋ &nbsp; Add to bag</button>
    </div>
  </article>`;
}

function productGrid(list, compact = false) {
  return `<div class="product-grid${compact ? " compact" : ""}">${list.map(productCard).join("")}</div>`;
}

function homePage() {
  const categories = categoryTiles.map(([name, image, slug]) => `<a class="category-tile" href="#category/${slug}"><img src="${photo(image, 400)}" alt="${name}" loading="lazy"><span>${name}</span></a>`).join("");
  return `<div class="page-shell">
    <section class="hero"><div class="hero-copy"><span class="eyebrow">THE NEW ETHNIC COLLECTION</span><h1>Elegance in<br><em>Every Thread</em></h1><p>Discover timeless suits, graceful sarees and thoughtfully selected styles made for every occasion.</p><a class="button" href="#shop">Explore collection &nbsp; →</a></div><div class="hero-note">Grace<br>in Every<br><span>Look</span></div></section>
    <section class="home-categories container"><div class="section-heading"><div class="heading-rule">SHOP BY CATEGORY</div><h2>Find Your Perfect Style</h2></div><div class="category-tiles">${categories}</div></section>
    <section class="featured-section"><div class="container"><div class="section-topline"><div class="section-heading"><div class="heading-rule">HANDPICKED WITH LOVE</div><h2>Featured Collection</h2><p>Discover our most loved styles</p></div><a class="button button-outline button-small" href="#shop">View all &nbsp; →</a></div>${productGrid(products.slice(0, 5))}</div></section>
  </div>`;
}

function categoryPage(slug) {
  const category = categoryAliases[slug] || categoryAliases.sarees;
  const list = products.filter(product => category.match.includes(product.category) && (!category.fabric || product.fabric === category.fabric));
  return `<div class="page-shell"><section class="page-banner"><div class="page-banner-copy"><h1>${category.title}</h1>${breadcrumb(category.title)}</div></section>
    <section class="catalog container"><aside class="filters"><div class="filter-head"><span>Filter</span><button type="button" data-clear-filters>Clear all</button></div>${filterGroups()}</aside><div><div class="catalog-toolbar"><span data-result-count>Showing ${list.length} curated ${list.length === 1 ? "style" : "styles"}</span><label>Sort by: <select data-sort><option value="popular">Popular</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="new">New arrivals</option></select></label></div><div class="catalog-products">${productGrid(list)}</div></div></section></div>`;
}

function filterGroups() {
  return `<details class="filter-group" open><summary>Price Range</summary><div class="filter-options"><label><input type="checkbox" data-price="0-2000"> ₹0 – ₹2,000</label><label><input type="checkbox" data-price="2000-3500"> ₹2,001 – ₹3,500</label><label><input type="checkbox" data-price="3500-5000"> ₹3,501 – ₹5,000</label><label><input type="checkbox" data-price="5000-99999"> Above ₹5,000</label></div></details>
    <details class="filter-group" open><summary>Fabric</summary><div class="filter-options"><label><input type="checkbox" data-fabric-filter="Cotton"> Cotton</label><label><input type="checkbox" data-fabric-filter="Georgette"> Georgette</label><label><input type="checkbox" data-fabric-filter="Silk"> Silk</label></div></details>
    <details class="filter-group"><summary>Size</summary><div class="filter-options">${["S", "M", "L", "XL", "XXL"].map(size => `<label><input type="checkbox" data-size="${size}"> ${size}</label>`).join("")}</div></details>
    <details class="filter-group"><summary>New Arrivals</summary><div class="filter-options"><label><input type="checkbox" data-new="true"> New this week</label></div></details>`;
}

function listingPage() {
  return `<div class="page-shell"><section class="page-banner"><div class="page-banner-copy"><h1>Shop All</h1>${breadcrumb("Collections")}</div></section>
    <section class="catalog container"><aside class="filters"><div class="filter-head"><span>Filter</span><button type="button" data-clear-filters>Clear all</button></div>${filterGroups()}</aside><div><div class="catalog-toolbar"><span data-result-count>Showing ${products.length} curated styles</span><label>Sort by: <select data-sort><option value="popular">Popular</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="new">New arrivals</option></select></label></div><div class="catalog-products">${productGrid(products)}</div><div class="pagination"><button class="active" type="button">1</button><button type="button" data-toast-message="More styles are coming soon">2</button><button type="button" data-toast-message="More styles are coming soon">→</button></div></div></section></div>`;
}

function detailPage(id) {
  const product = productById(id) || products[0];
  const alternatives = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 4);
  return `<div class="page-shell"><div class="container" style="padding-top:18px">${breadcrumb(`<a href="#category/${product.category.toLowerCase().replaceAll(" ", "-")}">${product.category}</a> &nbsp;›&nbsp; ${product.name}`)}</div>
    <section class="product-detail container"><div class="detail-gallery"><div class="thumb-list"><button class="selected" type="button" data-thumb="${photo(product.image, 1000)}"><img src="${photo(product.image, 220)}" alt="Front view of ${product.name}"></button><button type="button" data-thumb="${photo("photo-1617627143750-d86bc21e42bb", 1000)}"><img src="${photo("photo-1617627143750-d86bc21e42bb", 220)}" alt="Detail view of fabric"></button><button type="button" data-thumb="${photo("photo-1595777457583-95e059d581b8", 1000)}"><img src="${photo("photo-1595777457583-95e059d581b8", 220)}" alt="Alternate styling"></button></div><div class="main-product-image"><img src="${photo(product.image, 1100)}" alt="${product.name}" data-main-image></div></div>
      <div class="detail-copy"><span class="eyebrow">${product.category.toUpperCase()} · ${product.badge.toUpperCase()}</span><h1>${product.name}</h1><div class="detail-price">${money(product.price)} <del>${money(product.oldPrice)}</del><span class="discount">(${Math.round((1 - product.price / product.oldPrice) * 100)}% OFF)</span></div><div class="rating detail-rating">★★★★★ <small>(${product.reviews} reviews)</small></div><p>A graceful blend of tradition and modern elegance. Thoughtfully made in a beautiful ${product.fabric.toLowerCase()} with a flattering fit and a lovely finish for every occasion.</p>
      <span class="option-label">Color</span><div class="swatches"><button class="swatch rose selected" aria-label="Blush rose" data-color="Blush rose"></button><button class="swatch sage" aria-label="Sage green" data-color="Sage green"></button><button class="swatch gold" aria-label="Warm gold" data-color="Warm gold"></button></div>
      <span class="option-label">Choose your size</span><div class="sizes">${["S", "M", "L", "XL", "XXL"].map(size => `<button class="size-button${size === "M" ? " selected" : ""}" type="button" data-size-choice="${size}">${size}</button>`).join("")}</div>
      <div class="detail-actions"><div class="quantity"><button type="button" aria-label="Decrease quantity" data-detail-quantity="-">−</button><output data-detail-qty>1</output><button type="button" aria-label="Increase quantity" data-detail-quantity="1">+</button></div><button class="button" type="button" data-add="${product.id}" data-detail-add>Add to bag</button></div><button class="wish-link" type="button" data-wishlist="${product.id}">♡ &nbsp; Add to wishlist</button>
      <div class="detail-benefits"><span>♧ &nbsp; Free Shipping</span><span>♢ &nbsp; Secure Payments</span><span>◇ &nbsp; Easy Returns</span></div>
      <div class="detail-tabs"><div class="tab-list" role="tablist"><button class="active" type="button" data-detail-tab="details">Product Details</button><button type="button" data-detail-tab="size">Size Guide</button><button type="button" data-detail-tab="returns">Shipping &amp; Returns</button></div><div class="tab-content" data-tab-content>Fabric &nbsp; · &nbsp; ${product.fabric}<br>Work &nbsp; · &nbsp; Intricate embroidery<br>Set includes &nbsp; · &nbsp; Top, bottom and dupatta<br>Care &nbsp; · &nbsp; Dry clean only</div></div>
      </div></section><section class="related-products container"><div class="section-topline"><div class="section-heading"><div class="heading-rule">MADE FOR YOU</div><h2>You May Also Like</h2></div><a class="button button-outline button-small" href="#shop">View all &nbsp; →</a></div>${productGrid(alternatives.length ? alternatives : products.filter(item => item.id !== product.id).slice(0, 4), true)}</section></div>`;
}

function contactPage() {
  return `<div class="page-shell"><section class="page-banner"><div class="page-banner-copy"><h1>Contact Us</h1>${breadcrumb("Contact Us")}</div></section><section class="contact-layout container"><div class="contact-info"><h2>We'd Love to Hear From You</h2><p>Get in touch with us for any queries, orders or support.</p><div class="contact-item"><span class="contact-icon">⌖</span><div><strong>Address</strong><span>125 Fashion Street, Kolkata – 700001<br>West Bengal, India</span></div></div><div class="contact-item"><span class="contact-icon">⌕</span><div><strong>Phone</strong><span>+91 98765 43210<br>+91 87654 32109</span></div></div><div class="contact-item"><span class="contact-icon">✉</span><div><strong>Email</strong><span>hello@anvishcouture.com</span></div></div><div class="contact-item"><span class="contact-icon">◷</span><div><strong>Working Hours</strong><span>Mon – Sat, 10:00 AM – 7:00 PM<br>Sunday: Closed</span></div></div></div><div class="contact-form-wrap"><h2>Send us a message</h2><p>Our team will get back to you shortly.</p><form class="contact-form" data-contact-form><label>Name *<input name="name" autocomplete="name" required></label><label>Email *<input name="email" type="email" autocomplete="email" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label><label>Message *<textarea name="message" required></textarea></label><button class="button" type="submit">Send message</button><div class="form-notice" data-form-notice></div></form></div></section></div>`;
}

function aboutPage() {
  return `<div class="page-shell"><section class="page-banner"><div class="page-banner-copy"><h1>Our Story</h1>${breadcrumb("About Us")}</div></section><section class="contact-layout container"><div class="contact-info"><span class="eyebrow">MADE WITH MEANING</span><h2>Elegance in every thread</h2><p>Anvish Couture is a celebration of Indian craft, contemporary femininity and the quiet confidence of dressing in something made with care.</p><p>From thoughtful fabrics to finishing touches, every piece is chosen to help you feel entirely yourself at every occasion.</p><a class="button" href="#shop">Discover the collection</a></div><div class="main-product-image"><img src="${photo("photo-1610030469983-98e550d6193c", 1000)}" alt="Anvish Couture occasion wear" loading="lazy"></div></section></div>`;
}

function currentRoute() {
  const [page, ...rest] = location.hash.replace(/^#\/?/, "").split("/");
  return { page: page || "home", slug: rest.join("/") };
}

function renderPage() {
  const { page, slug } = currentRoute();
  const app = document.querySelector("#app");
  if (page === "shop") app.innerHTML = listingPage();
  else if (page === "category") app.innerHTML = categoryPage(slug || "sarees");
  else if (page === "product") app.innerHTML = detailPage(slug);
  else if (page === "contact") app.innerHTML = contactPage();
  else if (page === "about") app.innerHTML = aboutPage();
  else app.innerHTML = homePage();
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    const target = link.dataset.navLink;
    link.classList.toggle("active", target === page || (target === "category" && page === "category"));
  });
  document.querySelector("[data-nav]").classList.remove("open");
  document.querySelector("[data-menu-toggle]").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}

function addToCart(id, quantity = 1) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += quantity;
  else cart.push({ id, quantity });
  persistCart();
  showToast(`${productById(id).name} added to your bag`);
}

function setCartQuantity(id, quantity) {
  if (quantity < 1) cart = cart.filter(item => item.id !== id);
  else {
    const item = cart.find(entry => entry.id === id);
    if (item) item.quantity = quantity;
  }
  persistCart();
}

function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(node => node.textContent = count);
  document.querySelector("[data-drawer-count]").textContent = `(${count})`;
  const items = document.querySelector("[data-drawer-items]");
  const footer = document.querySelector("[data-drawer-footer]");
  if (!cart.length) {
    items.innerHTML = `<div class="drawer-empty"><span>♡</span><p>Your bag is waiting<br>for something lovely.</p><a class="button button-outline" href="#shop" data-cart-close-link>Explore collection</a></div>`;
    footer.innerHTML = "";
    return;
  }
  items.innerHTML = cart.map(item => {
    const product = productById(item.id);
    return `<article class="drawer-item"><img src="${photo(product.image, 220)}" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.category} · ${product.fabric}</p><div class="quantity"><button type="button" aria-label="Decrease ${product.name} quantity" data-cart-quantity="${product.id}" data-delta="-1">−</button><output>${item.quantity}</output><button type="button" aria-label="Increase ${product.name} quantity" data-cart-quantity="${product.id}" data-delta="1">+</button></div><button class="remove-item" type="button" data-remove="${product.id}">Remove</button></div><div class="drawer-price">${money(product.price * item.quantity)}</div></article>`;
  }).join("");
  const subtotal = cart.reduce((total, item) => total + productById(item.id).price * item.quantity, 0);
  footer.innerHTML = `<div class="drawer-total"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="drawer-total"><span>Shipping</span><span>${subtotal >= 1999 ? "Complimentary" : money(99)}</span></div><button class="button" type="button" data-checkout>Proceed to checkout</button><a class="button button-outline" href="#shop" data-cart-close-link>Continue shopping</a><small>Taxes included. Shipping calculated at checkout.</small>`;
}

function openCart() {
  document.querySelector("[data-overlay]").hidden = false;
  requestAnimationFrame(() => document.querySelector("[data-overlay]").classList.add("visible"));
  const drawer = document.querySelector("[data-cart-drawer]");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  document.querySelector("[data-cart-close]").focus();
}

function closeCart() {
  const drawer = document.querySelector("[data-cart-drawer]");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.querySelector("[data-overlay]").classList.remove("visible");
  document.body.classList.remove("drawer-open");
  setTimeout(() => { if (!drawer.classList.contains("open")) document.querySelector("[data-overlay]").hidden = true; }, 250);
}

function applyFilters() {
  const root = document.querySelector(".catalog-products");
  if (!root) return;
  const { page, slug } = currentRoute();
  const category = page === "category" ? categoryAliases[slug] || categoryAliases.sarees : null;
  let list = category ? products.filter(product => category.match.includes(product.category) && (!category.fabric || product.fabric === category.fabric)) : [...products];
  const selectedFabrics = [...document.querySelectorAll("[data-fabric-filter]:checked")].map(input => input.dataset.fabricFilter);
  const selectedPrices = [...document.querySelectorAll("[data-price]:checked")].map(input => input.dataset.price.split("-").map(Number));
  const selectedSizes = [...document.querySelectorAll("[data-size]:checked")];
  const newArrivalsOnly = document.querySelector("[data-new]:checked");
  if (selectedFabrics.length) list = list.filter(product => selectedFabrics.includes(product.fabric));
  if (selectedPrices.length) list = list.filter(product => selectedPrices.some(([min, max]) => product.price >= min && product.price <= max));
  if (selectedSizes.length) list = list.filter(product => !["Raw Fabric", "Accessories"].includes(product.category));
  if (newArrivalsOnly) list = list.filter(product => product.badge.toLowerCase().includes("new arrival"));
  const sort = document.querySelector("[data-sort]")?.value;
  if (sort === "price-low") list.sort((a, b) => a.price - b.price);
  if (sort === "price-high") list.sort((a, b) => b.price - a.price);
  if (sort === "new") list.reverse();
  root.innerHTML = list.length ? productGrid(list) : `<p>No styles match these filters. Try adjusting your selection.</p>`;
  const count = document.querySelector("[data-result-count]");
  if (count) count.textContent = `Showing ${list.length} curated ${list.length === 1 ? "style" : "styles"}`;
}

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const quantity = addButton.hasAttribute("data-detail-add") ? Number(document.querySelector("[data-detail-qty]").textContent) : 1;
    addToCart(addButton.dataset.add, quantity);
    return;
  }
  const wishlist = event.target.closest("[data-wishlist]");
  if (wishlist) {
    event.preventDefault();
    wishlist.classList.toggle("saved");
    wishlist.textContent = wishlist.classList.contains("saved") ? "♥" : "♡";
    showToast(wishlist.classList.contains("saved") ? "Saved to your wishlist" : "Removed from your wishlist");
    return;
  }
  if (event.target.closest("[data-cart-open]")) { openCart(); return; }
  if (event.target.closest("[data-cart-close], [data-cart-close-link]")) { closeCart(); return; }
  if (event.target.matches("[data-overlay]")) { closeCart(); return; }
  const quantityButton = event.target.closest("[data-cart-quantity]");
  if (quantityButton) {
    const item = cart.find(entry => entry.id === quantityButton.dataset.cartQuantity);
    if (item) setCartQuantity(item.id, item.quantity + Number(quantityButton.dataset.delta));
    return;
  }
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) { setCartQuantity(removeButton.dataset.remove, 0); return; }
  const detailQuantity = event.target.closest("[data-detail-quantity]");
  if (detailQuantity) {
    const output = document.querySelector("[data-detail-qty]");
    output.textContent = Math.max(1, Number(output.textContent) + Number(detailQuantity.dataset.detailQuantity));
    return;
  }
  const thumb = event.target.closest("[data-thumb]");
  if (thumb) {
    document.querySelector("[data-main-image]").src = thumb.dataset.thumb;
    document.querySelectorAll("[data-thumb]").forEach(button => button.classList.toggle("selected", button === thumb));
    return;
  }
  const size = event.target.closest("[data-size-choice]");
  if (size) {
    document.querySelectorAll("[data-size-choice]").forEach(button => button.classList.toggle("selected", button === size));
    return;
  }
  const color = event.target.closest("[data-color]");
  if (color) {
    document.querySelectorAll("[data-color]").forEach(button => button.classList.toggle("selected", button === color));
    return;
  }
  const tab = event.target.closest("[data-detail-tab]");
  if (tab) {
    const content = document.querySelector("[data-tab-content]");
    const tabCopy = {
      details: "Fabric &nbsp; · &nbsp; Carefully selected<br>Work &nbsp; · &nbsp; Intricate finish<br>Set includes &nbsp; · &nbsp; Refer to product description<br>Care &nbsp; · &nbsp; Dry clean only",
      size: "Available sizes: S, M, L, XL and XXL.<br>For a relaxed fit, consider sizing up. Measurements may vary slightly by style.",
      returns: "Complimentary shipping on orders above ₹1,999.<br>Eligible unworn items can be returned within 7 days of delivery."
    };
    content.innerHTML = tabCopy[tab.dataset.detailTab];
    document.querySelectorAll("[data-detail-tab]").forEach(button => button.classList.toggle("active", button === tab));
    return;
  }
  if (event.target.closest("[data-clear-filters]")) {
    document.querySelectorAll(".filters input").forEach(input => { input.checked = false; });
    applyFilters();
    return;
  }
  if (event.target.closest("[data-menu-toggle]")) {
    const nav = document.querySelector("[data-nav]");
    const expanded = nav.classList.toggle("open");
    document.querySelector("[data-menu-toggle]").setAttribute("aria-expanded", String(expanded));
    return;
  }
  if (event.target.closest("[data-search-toggle]")) {
    document.querySelector("[data-search-form]").classList.toggle("open");
    document.querySelector("[data-search-form] input").focus();
    return;
  }
  const checkout = event.target.closest("[data-checkout]");
  if (checkout) { showToast("Checkout preview is ready for your store setup"); return; }
  const messageButton = event.target.closest("[data-toast-message]");
  if (messageButton) showToast(messageButton.dataset.toastMessage);
});

document.addEventListener("change", event => {
  if (event.target.matches("[data-sort], [data-fabric-filter], [data-price], [data-size], [data-new]")) applyFilters();
});

document.addEventListener("submit", event => {
  if (event.target.matches("[data-contact-form]")) {
    event.preventDefault();
    event.target.querySelector("[data-form-notice]").textContent = "Thank you. Your message is ready for our team.";
    event.target.reset();
  }
  if (event.target.matches("[data-newsletter]")) {
    event.preventDefault();
    showToast("Thank you for joining our list");
    event.target.reset();
  }
  if (event.target.matches("[data-search-form]")) {
    event.preventDefault();
    const query = event.target.elements.q.value.trim().toLowerCase();
    const match = products.find(product => `${product.name} ${product.category} ${product.fabric}`.toLowerCase().includes(query));
    if (query && match) location.hash = `product/${match.id}`;
    else { location.hash = "shop"; if (query) showToast("No exact match. Browse all curated styles."); }
    event.target.classList.remove("open");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    document.querySelector("[data-search-form]").classList.remove("open");
    document.querySelector("[data-nav]").classList.remove("open");
  }
  if (event.key === "Tab" && document.querySelector("[data-cart-drawer]").classList.contains("open")) {
    const drawer = document.querySelector("[data-cart-drawer]");
    const focusable = [...drawer.querySelectorAll("button, a, input, select, textarea")].filter(item => item.offsetParent);
    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0]?.focus(); }
  }
});

window.addEventListener("hashchange", renderPage);
renderPage();
renderCart();