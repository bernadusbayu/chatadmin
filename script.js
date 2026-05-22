// ==========================================
// DATA CORE
// ==========================================
const MENU_DATA = [
    {
        group: "THE JAKARTA FLOSS", subGroup: "ROTI ABON GULUNG",
        items: [
            { id: 1, name: "ABON GULUNG PREMIUM CHEESE", price: 34000, desc: "Roti lembut berisi abon sapi premium, paduan keju.", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", status: "available" },
            { id: 2, name: "ABON GULUNG PREMIUM SPICY", price: 34000, desc: "Abon sapi premium dengan sensasi pedas yang nendang", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1608826569116-2da9e763ceb2?auto=format&fit=crop&w=150&q=80", status: "available" },
            { id: 3, name: "ABON GULUNG PREMIUM ORIGINAL", price: 34000, desc: "Roti lembut berisi abon sapi premium, gurih klasik dan nagih", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", status: "available" }
        ]
    },
    {
        group: "BOLEN LILIT", subGroup: "",
        items: [
            { id: 4, name: "BOLEN LILIT REGULER CHOCOLATE", price: 28000, desc: "Pastry bolen pisang renyah dengan isian cokelat premium", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1608826569116-2da9e763ceb2?auto=format&fit=crop&w=150&q=80", status: "available" },
            { id: 5, name: "BOLEN LILIT REGULER CHOCO CHEESE", price: 28000, desc: "Perpaduan pisang, keju, dan cokelat dalam pastry renyah", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=150&q=80", status: "available" }
        ]
    },
    {
        group: "FOOD", subGroup: "PIZZAREYA",
        items: [
            { id: 6, name: "PIZZAREYA MARGHERITA", price: 125000, desc: "Fresh, clean, and timeless. Classic pizza with bright plum tomato sauce...", stock: "Item Stock < 10", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=80", status: "available" }
        ]
    },
    {
        group: "HEALTHY FOOD", subGroup: "",
        items: [
            { id: 7, name: "HAPPY BERRY DRAGON BOWL", price: 75000, desc: "", stock: "", img: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=150&q=80", status: "sold-out" },
            { id: 8, name: "HEALTHY POWER BOOSTER", price: 75000, desc: "", stock: "", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80", status: "sold-out" }
        ]
    },
    {
        group: "BEVERAGES", subGroup: "AGREYA SIGNATURE",
        items: [
            { id: 9, name: "MONT BLANC ASIH", price: 42000, desc: "Fruity notes, with sea salt cream and fresh an orange", stock: "", img: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&w=150&q=80", status: "available" },
            { id: 10, name: "MONT BLANC DIMAS", price: 42000, desc: "Bold taste, creamy with sea salt twist", stock: "", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=150&q=80", status: "available" }
        ]
    }
];

// STATE APLIKASI
let currentFilter = 'ALL';
let cart = {}; // Menyimpan pesanan { itemId: {qty, price} }

// Inisialisasi Awal
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let tableParam = urlParams.get('table');
    document.getElementById('nomor-meja').innerText = tableParam ? tableParam : "VIP-01";
    
    renderMenu();
});

// ==========================================
// LOGIKA DROPDOWN & FILTER KATEGORI
// ==========================================
function toggleDropdown() {
    const list = document.getElementById('dropdownList');
    list.classList.toggle('show');
}

function filterCategory(groupName, displayName) {
    currentFilter = groupName;
    document.getElementById('activeCategoryText').innerText = displayName;
    toggleDropdown(); // Tutup dropdown
    renderMenu(); // Render ulang sesuai filter
}

// ==========================================
// LOGIKA RENDER TAMPILAN MENU
// ==========================================
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    MENU_DATA.forEach(section => {
        // Cek apakah section ini cocok dengan filter yang aktif
        if (currentFilter !== 'ALL' && section.group !== currentFilter) return;

        if (section.group) {
            const groupTitle = document.createElement('div');
            groupTitle.className = 'group-title';
            groupTitle.innerText = section.group;
            container.appendChild(groupTitle);
        }

        if (section.subGroup) {
            const subGroupTitle = document.createElement('div');
            subGroupTitle.className = 'sub-group-title';
            subGroupTitle.innerText = section.subGroup;
            container.appendChild(subGroupTitle);
        }

        section.items.forEach(item => {
            const isSoldOut = item.status === 'sold-out';
            const itemDiv = document.createElement('div');
            itemDiv.className = `menu-item ${isSoldOut ? 'sold-out' : ''}`;
            
            // Event klik: Hanya bisa klik jika tidak sold out
            if (!isSoldOut) {
                itemDiv.onclick = () => addToCart(item.id, item.price);
            }

            // Cek jumlah pesanan item ini di keranjang
            const qty = cart[item.id] ? cart[item.id].qty : 0;
            const qtyBadge = qty > 0 ? `<div class="qty-badge" id="qty-${item.id}">${qty}</div>` : `<div class="qty-badge" id="qty-${item.id}" style="display:none;">0</div>`;

            let stockHtml = isSoldOut ? `<span class="badge-soldout">Sold out</span>` : 
                            (item.stock ? `<span class="menu-stock">${item.stock}</span>` : '');

            itemDiv.innerHTML = `
                ${qtyBadge}
                <img src="${item.img}" class="menu-img">
                <div class="menu-info">
                    <div class="menu-name">${item.name}</div>
                    ${item.desc ? `<div class="menu-desc">${item.desc}</div>` : ''}
                    <div class="menu-bottom">
                        <span class="menu-price">Rp${item.price.toLocaleString('id-ID')}</span>
                        ${stockHtml}
                    </div>
                </div>
            `;
            container.appendChild(itemDiv);
        });
    });
}

// ==========================================
// LOGIKA KERANJANG BELANJA (CART)
// ==========================================
function addToCart(itemId, price) {
    if (!cart[itemId]) {
        cart[itemId] = { qty: 0, price: price };
    }
    cart[itemId].qty += 1;
    
    // Animasi Pop-up Kuantitas di Kartu
    renderMenu(); 
    updateCartUI();
}

function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;

    Object.keys(cart).forEach(id => {
        totalItems += cart[id].qty;
        totalPrice += (cart[id].qty * cart[id].price);
    });

    const cartBar = document.getElementById('cartBar');
    if (totalItems > 0) {
        cartBar.style.display = 'flex';
        document.getElementById('cartCount').innerText = totalItems;
        document.getElementById('cartTotal').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    } else {
        cartBar.style.display = 'none';
    }
}
