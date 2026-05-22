// ==========================================
// DATA CORE SYSTEM (DATABASE AGREYA COFFEE)
// ==========================================
const CATEGORIES = [
    { id: 'signature', label: '✨ Signature' },
    { id: 'coffee', label: '☕ Coffee' },
    { id: 'non-coffee', label: '🍵 Non-Coffee & Tea' },
    { id: 'food', label: '🍕 Food & Meals' },
    { id: 'pastry', label: '🥐 Pastry & Cakes' }
];

const MENU_ITEMS = [
    // --- KATEGORI: SIGNATURE ---
    { id: 1, category: 'signature', name: 'Mont Blanc Asih', price: 42000, desc: 'Fruity miles range.', img: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&w=200&q=80' },
    { id: 2, category: 'signature', name: 'Mont Blanc Dimas', price: 42000, desc: 'Acid taste creamy with sea salt.', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80' },
    { id: 3, category: 'signature', name: 'Sekar Can', price: 39000, desc: 'Espresso, caramel dan cream.', img: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=200&q=80' },

    // --- KATEGORI: COFFEE ---
    { id: 4, category: 'coffee', name: 'Es Kopi Susu Agreya', price: 35000, desc: 'Coffee with Milk & Brown Sugar Sweet.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=200&q=80' },
    { id: 5, category: 'coffee', name: 'Ice Salted Caramel Latte', price: 55000, desc: 'Eksotis, manis, dan lezat menaikkan tenaga.', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=200&q=80' },
    { id: 6, category: 'coffee', name: 'Ice Americano', price: 32000, desc: 'Kopi dingin dengan campuran espresso dan air.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=200&q=80' },
    { id: 7, category: 'coffee', name: 'Magic (Hot)', price: 45000, desc: 'Sajian Hot Coffee spesialisasi barista.', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=200&q=80' },

    // --- KATEGORI: NON-COFFEE & TEA ---
    { id: 8, category: 'non-coffee', name: 'Ice Chocolate', price: 40000, desc: 'Minuman coklat dingin yang menggoda selera dengan sensasi menyegarkan.', img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=200&q=80' },
    { id: 9, category: 'non-coffee', name: 'Pure Matcha Latte', price: 40000, desc: 'Matcha dengan perpaduan matcha halus dan susu.', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=200&q=80' },
    { id: 10, category: 'non-coffee', name: 'Ice Lychee Tea', price: 38000, desc: 'Segar, manis, menyegarkan.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&q=80' },

    // --- KATEGORI: FOOD & MEALS ---
    { id: 11, category: 'food', name: 'Pizzareya Margherita', price: 125000, desc: 'Light plum tomato sauce, creamy aged mozzarella.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80' },
    { id: 12, category: 'food', name: 'Pizzareya Tartubeef', price: 145000, desc: 'Hearty but balanced savory beef crumbs, bright plum tomato sauce.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=80' },

    // --- KATEGORI: PASTRY & CAKES ---
    { id: 13, category: 'pastry', name: 'Abon Gulung Premium Cheese', price: 34000, desc: 'Roti Abon Gulung premium dengan paduan keju.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80' },
    { id: 14, category: 'pastry', name: 'Bolen Lilit Reguler Chocolate', price: 28000, desc: 'Pastry bolen pisang renyah dengan isian cokelat.', img: 'https://images.unsplash.com/photo-1608826569116-2da9e763ceb2?auto=format&fit=crop&w=200&q=80' },
    { id: 15, category: 'pastry', name: 'Tiramisu', price: 50000, desc: 'Dessert klasik dengan lapisan lembut yang creamy.', img: 'https://images.unsplash.com/photo-1571115177098-24ecfa14a5f1?auto=format&fit=crop&w=200&q=80' }
];

// Biarkan kode di bawah ini tetap utuh (State Management, dst...)
let currentCategory = 'signature'; // Ubah default tab ke signature


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
