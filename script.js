// --- LOGIKA 1: DETEKSI URUTAN NOMOR MEJA ---
const urlParams = new URLSearchParams(window.location.search);
let nomorMeja = urlParams.get('table');
const elemenMeja = document.getElementById('nomor-meja');

if (nomorMeja) {
    elemenMeja.innerText = "Meja " + nomorMeja;
} else {
    nomorMeja = "Tanpa Meja";
    elemenMeja.innerText = "Scan QR Code Meja";
    elemenMeja.style.background = "#d9534f";
    elemenMeja.style.color = "#ffffff";
}

// --- LOGIKA 2: SWITCH TAB KATEGORI ---
function switchCategory(categoryName) {
    // Nonaktifkan semua tab & wrapper menu
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.menu-wrapper').forEach(wrapper => wrapper.classList.remove('active'));
    
    // Aktifkan tab yang di-klik
    event.target.classList.add('active');
    document.getElementById('cat-' + categoryName).classList.add('active');
}

// --- LOGIKA 3: KASIR & KERANJANG BELANJA (CART) ---
let cart = [];

function addToCart(namaProduk, hargaProduk) {
    // Cek apakah item sudah ada di keranjang
    const existingItem = cart.find(item => item.name === namaProduk);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: namaProduk, price: hargaProduk, quantity: 1 });
    }
    
    updateCartUI();
}

function updateCartUI() {
    const cartBar = document.getElementById('cartBar');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemsList = document.getElementById('cartItemsList');
    const modalTotal = document.getElementById('modalTotal');
    
    if (cart.length === 0) {
        cartBar.style.display = 'none';
        return;
    }
    
    // Tampilkan Floating Bar jika ada item
    cartBar.style.display = 'flex';
    
    let totalItems = 0;
    let totalPrice = 0;
    cartItemsList.innerHTML = ''; // Reset list modal
    
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);
        
        // Buat element baris di dalam modal keranjang
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div style="font-size:12px; color:#888;">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <div style="font-weight:600;">x${item.quantity}</div>
        `;
        cartItemsList.appendChild(row);
    });
    
    // Update angka & total harga di UI
    cartCount.innerText = totalItems;
    cartTotal.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    modalTotal.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// Open/Close Pop-up Modal Keranjang
function toggleModal(show) {
    const modal = document.getElementById('cartModal');
    if (show) {
        modal.classList.add('show');
    } else {
        modal.classList.remove('show');
    }
}

// Aksi Akhir Mengirim Pesanan
function submitOrder() {
    alert(`Pesanan sukses dikirim ke Barista Dapur untuk Meja: ${nomorMeja}!`);
    cart = []; // Reset keranjang
    updateCartUI();
    toggleModal(false);
}
