// ==========================================
// DATABASE SENADA COFFEE
// ==========================================
const MENU_DATA = [
    {
        group: "SENADA BITES", subGroup: "ROTI & PASTRY",
        items: [
            { id: 1, name: "ABON GULUNG PREMIUM CHEESE", price: 34000, desc: "Roti lembut berisi abon sapi premium, paduan keju.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80" },
            { id: 2, name: "ABON GULUNG PREMIUM SPICY", price: 34000, desc: "Abon sapi premium dengan sensasi pedas yang nendang", img: "https://images.unsplash.com/photo-1608826569116-2da9e763ceb2?auto=format&fit=crop&w=150&q=80" },
            { id: 3, name: "BOLEN LILIT CHOCO CHEESE", price: 28000, desc: "Perpaduan pisang, keju, dan cokelat dalam pastry renyah", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=150&q=80" }
        ]
    },
    {
        group: "MAIN COURSE", subGroup: "PIZZA & MEALS",
        items: [
            { id: 4, name: "PIZZA SENADA MARGHERITA", price: 125000, desc: "Classic pizza with bright plum tomato sauce & mozzarella...", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=80" }
        ]
    },
    {
        group: "BEVERAGES", subGroup: "SENADA SIGNATURE",
        items: [
            { id: 5, name: "ES KOPI SUSU SENADA", price: 42000, desc: "Fruity notes, with sea salt cream and fresh an orange", img: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&w=150&q=80" },
            { id: 6, name: "SENADA DIMAS BLEND", price: 42000, desc: "Bold taste, creamy with sea salt twist", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=150&q=80" }
        ]
    }
];

// STATE APLIKASI
let currentFilter = 'ALL';
let cart = {}; 

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let tableParam = urlParams.get('table');
    document.getElementById('nomor-meja').innerText = tableParam ? tableParam : "VIP-01";
    renderMenu();
});

// DROPDOWN KATEGORI
function toggleDropdown() {
    document.getElementById('dropdownList').classList.toggle('show');
}
function filterCategory(groupName, displayName) {
    currentFilter = groupName;
    document.getElementById('activeCategoryText').innerText = displayName;
    document.getElementById('dropdownList').classList.remove('show');
    renderMenu(); 
}

// RENDER DAFTAR MENU
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    MENU_DATA.forEach(section => {
        if (currentFilter !== 'ALL' && section.group !== currentFilter) return;

        if (section.group) container.innerHTML += `<div class="group-title">${section.group}</div>`;
        if (section.subGroup) container.innerHTML += `<div class="sub-group-title">${section.subGroup}</div>`;

        section.items.forEach(item => {
            const qty = cart[item.id] ? cart[item.id].qty : 0;
            const badgeDisplay = qty > 0 ? 'flex' : 'none';

            container.innerHTML += `
                <div class="menu-item" onclick="changeQty(${item.id}, ${item.price}, 1)">
                    <div class="qty-badge" style="display:${badgeDisplay};">${qty}</div>
                    <img src="${item.img}" class="menu-img">
                    <div class="menu-info">
                        <div class="menu-name">${item.name}</div>
                        <div class="menu-desc">${item.desc}</div>
                        <div class="menu-price">Rp${item.price.toLocaleString('id-ID')}</div>
                    </div>
                </div>
            `;
        });
    });
}

// MANAJEMEN KERANJANG
function changeQty(itemId, price, delta) {
    if (!cart[itemId]) {
        cart[itemId] = { qty: 0, price: price, name: getMenuName(itemId) };
    }
    
    cart[itemId].qty += delta;
    if (cart[itemId].qty <= 0) {
        delete cart[itemId];
    }
    
    renderMenu();
    updateCartUI();
    
    // Update layar checkout jika sedang terbuka
    if (document.getElementById('checkoutModal').classList.contains('show')) {
        renderCheckoutList(); 
    }
}

function getMenuName(id) {
    for (let sec of MENU_DATA) {
        let found = sec.items.find(i => i.id === id);
        if (found) return found.name;
    }
    return "Menu Item";
}

// UPDATE TOMBOL BAWAH
function updateCartUI() {
    let totalItems = 0; let subtotal = 0;
    Object.keys(cart).forEach(id => {
        totalItems += cart[id].qty;
        subtotal += (cart[id].qty * cart[id].price);
    });

    const cartBar = document.getElementById('cartBar');
    if (totalItems > 0) {
        cartBar.classList.add('show');
        document.getElementById('cartCount').innerText = totalItems;
        document.getElementById('cartTotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    } else {
        cartBar.classList.remove('show');
        closeCheckout(); // Tutup popup jika barang di keranjang habis
    }
}

// ==========================================
// LOGIKA MODAL CHECKOUT
// ==========================================
function openCheckout() {
    // Cek jika keranjang kosong
    if (Object.keys(cart).length === 0) {
        alert("Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu!");
        return;
    }
    renderCheckoutList();
    document.getElementById('checkoutModal').classList.add('show');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

function renderCheckoutList() {
    const list = document.getElementById('cartItemsList');
    list.innerHTML = '';
    
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        let item = cart[id];
        let itemTotal = item.qty * item.price;
        subtotal += itemTotal;

        list.innerHTML += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty(${id}, ${item.price}, -1)">-</button>
                    <div style="font-weight:bold; font-size:15px; width:16px; text-align:center;">${item.qty}</div>
                    <button class="qty-btn" onclick="changeQty(${id}, ${item.price}, 1)">+</button>
                </div>
            </div>
        `;
    });

    // Kalkulasi Pajak PB1
    let tax = Math.round(subtotal * 0.1);
    let finalTotal = subtotal + tax;

    document.getElementById('billSubtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('billTax').innerText = `Rp ${tax.toLocaleString('id-ID')}`;
    document.getElementById('billTotalFinal').innerText = `Rp ${finalTotal.toLocaleString('id-ID')}`;
}

// PROSES PESANAN SELESAI
function submitOrder() {
    closeCheckout();
    document.getElementById('successOverlay').style.display = 'flex';
}
