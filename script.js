// 1. Ambil query string dari URL browser
const urlParams = new URLSearchParams(window.location.search);

// 2. Cari parameter bernama 'table'
const nomorMeja = urlParams.get('table');

// 3. Ambil elemen HTML yang ingin kita ubah teksnya
const elemenMeja = document.getElementById('nomor-meja');

// 4. Cek apakah parameter meja ada di URL
if (nomorMeja) {
    elemenMeja.innerText = "Meja " + nomorMeja;
} else {
    // Jika diakses langsung tanpa scan QR meja
    elemenMeja.innerText = "Meja Tidak Terdeteksi (Silakan Scan QR di Meja Anda)";
    elemenMeja.style.background = "#d9534f"; // Mengubah warna badge jadi merah sebagai penanda
}
