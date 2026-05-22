// ==========================================
// DATA CORE SYSTEM (DATABASE COFFEE SHOP MOCK)
// ==========================================
const CATEGORIES = [
    { id: 'coffee', label: '☕ Coffee' },
    { id: 'non-coffee', label: '🍵 Non-Coffee' },
    { id: 'beverages', label: '🥤 Beverages' },
    { id: 'snacks', label: '🥐 Snacks' }
];

const MENU_ITEMS = [
    { id: 1, category: 'coffee', name: 'Es Kopi Susu Senada', price: 22000, desc: 'Espresso blend premium, susu segar murni, dan racikan sirup gula aren rahasia ala Senada.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=200&q=80' },
    { id: 2, category: 'coffee', name: 'Cafe Latte Hot', price: 25000, desc: 'Double shot espresso racikan robusta-arabika dengan selimut foam artisan susu lembut.', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=200&q=80' },
    { id: 3, category: 'coffee', name: 'Caramel Macchiato', price: 28000, desc: 'Espresso shot dilapisi vanilla foam tebal diakhiri siraman saus karamel legit.', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=200&q=80' },
    
    { id: 4, category: 'non-coffee', name: 'Pure Matcha Latte', price: 26000, desc: 'Teh hijau Kyoto Jepang grade A dikocok merata bersama artisan steamed milk gurih.', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=200&q=80' },
    { id: 5, category: 'non-coffee', name: 'Velvet Red Velvet', price: 25000, desc: 'Bubuk premium red velvet dengan cita rasa kue bolu cokelat manis disajikan dingin.', img: 'https://images.unsplash.com/photo-1612727187633-ce11ad319243?auto=format&fit=crop&w=200&q=80' },
    
    { id: 6, category: 'beverages', name: 'Tropical Iced Tea', price: 19000, desc: 'Seduhan daun teh hitam pilihan dengan perasan markisa segar penyegar dahaga.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=200&q=80' },
    { id: 7, category: 'beverages', name: 'Strawberry Mojito', price: 23000, desc: 'Soda jernih berkarbonasi, sirup strawberry, remasan daun mint segar dan es batu.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=200&q=80' },
    
    { id: 8, category: 'snacks', name: 'Butter Croissant', price: 18000, desc: 'Pastry gurih bertekstur flaky garing di luar, berongga mentega lembut di dalam.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80' },
    { id: 9, category: 'snacks', name: 'Almond Chocolate', price: 22000, desc: 'Croissant panggang isi pasta cokelat tebal bertabur irisan kacang almond renyah.', img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=200&q=80' }
];

// ==========================================
// STATE MANAGEMENT (VARIABEL STATUS APLIKASI)
// ==========================================
let currentCategory = 'coffee';
let cart = {}; // Format: { [item_id]: kuantitas }
let orderNotes = {}; // Format: { [item_id]: "catatan" }
let nomorMeja = "";

// ==========================================
// INITIALIZER (PENDETEKSI MEJA & RENDER AWAL)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // 1. Baca nomor meja dari URL parameter (?table=XX)
    const urlParams = new URLSearchParams(window.location.search);
    const tableParam = urlParams.get('table');
    const mejaTextNode = document.getElementById('meja-text');

    if (tableParam) {
        nomorMeja = tableParam;
        mejaTextNode.innerText = "Meja " + nomorMeja;
    } else {
        nomorMeja = "Tanpa Meja";
        mejaTextNode.innerText = "Scan Meja QR";
        document.getElementById('nomor-meja').style.background = "#d9534f";
        document.getElementById('nomor-meja').style.color = "#ffffff";
    }

    // 2. Bangun Navigasi Kategori & Menu Utama
    renderCategoryTabs();
    renderMenuItems();
});

// ==========================================
// RENDER COMPONENT LOGIC
// ==========================================
function renderCategoryTabs() {
    const navContainer = document.getElementById('categoryNav');
    navContainer.innerHTML = '';

    CATEGORIES.forEach(cat => {
        const button = document.createElement('button');
        button.className = `category-tab ${cat.id === currentCategory ? 'active' : ''}`;
        button.innerText = cat.label;
        button.onclick = () => {
            currentCategory = cat.id;
            renderCategoryTabs();
            renderMenuItems();
        };
        navContainer.appendChild(button);
    });
}

function renderMenuItems() {
    const gridContainer = document.getElementById('menuGrid');
    gridContainer.innerHTML = '';

    // Filter daftar menu berdasarkan kategori aktif
    const filteredMenu = MENU_ITEMS.filter(item => item.category === currentCategory);

    filteredMenu.forEach(item => {
        const cartQty = cart[item.id] || 0;

        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img class="menu-img" src="${item.img}" alt="${item.name}">
            <div class="menu-details">
                <div>
                    <div class="menu-title">${item.name}</div>
                    <div class="menu-desc">${item.desc}</div>
                </div>
                <div class="menu-action">
                    <div class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <div id="action-area-${item.id}">
                        ${cartQty > 0 ? `
                            <div class="quantity-control">
                                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                                <span class="qty-number">${cartQty}</span>
                                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                            </div>
                        ` : `
                            <button class="btn-add-initial" onclick="changeQty(${item.id}, 1)">Tambah</button>
                        `}
                    </div>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// ==========================================
// CORE CART LOGIC (MANAJEMEN OPERASI KERANJANG)
// ==========================================
function changeQty(itemId, delta) {
    const currentQty = cart[itemId] || 0;
    const newQty = currentQty + delta;

    if (newQty <= 0) {
        delete cart[itemId];
        delete orderNotes[itemId]; // Hapus catatan jika kuantitas nol
    } else {
        cart[itemId] = newQty;
    }

    // Refresh UI Menu & Bar Bilah Keranjang Bawah
    renderMenuItems();
    updateCartBar();
}

function updateCartBar() {
    const cartBar = document.getElementById('cartBar');
    const cartCountNode = document.getElementById('cartCount');
    const cartTotalNode = document.getElementById('cartTotal');

    let totalItems = 0;
    let totalPrice = 0;

    Object.keys(cart).forEach(id => {
        const item = MENU_ITEMS.find(m => m.id == id);
        const qty = cart[id];
        totalItems += qty;
        totalPrice += (item.price * qty);
    });

    if (totalItems > 0) {
        cartBar.style.display = 'flex';
        cartCountNode.innerText = totalItems;
        cartTotalNode.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    } else {
        cartBar.style.display = 'none';
    }
}

// ==========================================
// MODAL & INVOICE BREAKDOWN MANAGEMENT
// ==========================================
function openCartModal() {
    const modalList = document.getElementById('cartItemsList');
    modalList.innerHTML = '';

    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        const item = MENU_ITEMS.find(m => m.id == id);
        const qty = cart[id];
        const itemSubtotal = item.price * qty;
        subtotal += itemSubtotal;

        const currentNote = orderNotes[id] || '';

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div style="flex: 1; padding-right: 15px;">
                <div style="font-weight:700; font-size:14px; color:var(--primary);">${item.name}</div>
                <div style="font-size:12px; color:var(--accent); font-weight:600; margin-top:2px;">Rp ${item.price.toLocaleString('id-ID')}</div>
                <input type="text" class="note-input" placeholder="Tulis catatan (cth: kurang manis)..." 
                    value="${currentNote}" onchange="saveNote(${item.id}, this.value)">
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1); openCartModal();">-</button>
                    <span class="qty-number">${qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1); openCartModal();">+</button>
                </div>
                <div style="font-weight:700; font-size:13px;">Rp ${itemSubtotal.toLocaleString('id-ID')}</div>
            </div>
        `;
        modalList.appendChild(row);
    });

    // Jika keranjang mendadak kosong saat tombol minus di dalam modal diklik
    if (subtotal === 0) {
        closeCartModal();
        return;
    }

    // Kalkulasi Pajak Daerah PB1 (10%)
    const tax = Math.round(subtotal * 0.1);
    const totalFinal = subtotal + tax;

    document.getElementById('invoiceSubtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('invoiceTax').innerText = `Rp ${tax.toLocaleString('id-ID')}`;
    document.getElementById('invoiceTotalFinal').innerText = `Rp ${totalFinal.toLocaleString('id-ID')}`;

    document.getElementById('cartModal').classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('show');
}

function saveNote(itemId, value) {
    orderNotes[itemId] = value;
}

// ==========================================
// CHECKOUT PROCESS & RECEIPT GENERATOR
// ==========================================
function processCheckout() {
    closeCartModal();
    
    // Siapkan Tampilan Nota Struk Digital
    const receiptItemsBox = document.getElementById('receiptItemsBox');
    receiptItemsBox.innerHTML = '';
    
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        const item = MENU_ITEMS.find(m => m.id == id);
        const qty = cart[id];
        const itemTotal = item.price * qty;
        subtotal += itemTotal;

        const noteText = orderNotes[id] ? `<div style="font-size:11px; color:var(--text-muted); font-style:italic; margin-top:2px;">*Catatan: ${orderNotes[id]}</div>` : '';

        const receiptRow = document.createElement('div');
        receiptRow.style.marginBottom = '8px';
        receiptRow.innerHTML = `
            <div style="display:flex; justify-content:between; font-size:13px;">
                <div style="flex:1;"><strong>${item.name}</strong> <span style="color:var(--text-muted);">x${qty}</span></div>
                <div>Rp ${itemTotal.toLocaleString('id-ID')}</div>
            </div>
            ${noteText}
        `;
        receiptItemsBox.appendChild(receiptRow);
    });

    const tax = Math.round(subtotal * 0.1);
    const totalFinal = subtotal + tax;

    // Isi Metadata Struk
    const now = new Date();
    document.getElementById('receiptTime').innerText = now.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
    document.getElementById('receiptTable').innerText = "MEJA " + nomorMeja.toUpperCase();
    document.getElementById('receiptTotalFinal').innerText = `Rp ${totalFinal.toLocaleString('id-ID')}`;

    // Aktifkan Screen Sukses
    document.getElementById('successScreen').style.display = 'flex';
}

function resetAppToHome() {
    // Bersihkan State Data Keranjang
    cart = {};
    orderNotes = {};
    
    // Reset Seluruh UI Tampilan
    updateCartBar();
    renderMenuItems();
    
    // Matikan Overlay Screen Struk
    document.getElementById('successScreen').style.display = 'none';
}
