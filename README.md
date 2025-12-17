# 🛍️ Warung Alzhim E-Commerce (Frontend)
![License](https://img.shields.io/badge/license-LGPLv3-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Tech](https://img.shields.io/badge/React-MERN_Stack-blue)

---

## 📖 Tentang Proyek

Proyek ini merupakan bagian dari skripsi berjudul:

> **“Perancangan dan Implementasi Sistem E-commerce Warung Alzhim Berbasis MERN Stack dengan Metode Prototype”**  
> oleh **Alfia Meilani Putri**  
> Fakultas Ilmu Komputer, Universitas Singaperbangsa Karawang (2025)

Aplikasi ini menyediakan antarmuka pengguna berbasis **React.js** yang terhubung dengan backend API.  
Fitur utamanya meliputi proses transaksi, pengelolaan produk, serta tampilan laporan penjualan.

---

## ⚙️ Teknologi yang Digunakan
- ⚛️ React.js  
- 🧭 React Router DOM  
- 🔗 Axios  
- 🎨 Bootstrap / Tailwind CSS  
- 💳 Midtrans Snap API  
- 🔄 Git & GitHub  

---

## 🚀 Panduan Instalasi dan Penggunaan

### 1️⃣ Clone Repository
```bash
git clone https://github.com/alfiameilaniputri/frontend-warung-alzhim.git
cd frontend-warung-alzhim
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Konfigurasi Environment
Buat file `.env` di root proyek:

```bash
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Jangan upload file `.env` ke GitHub.**  
> Tambahkan `.env` ke `.gitignore` untuk mencegah kebocoran data sensitif.

### 4️⃣ Jalankan Aplikasi
```bash
npm run dev
```

Akses melalui browser:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧩 Struktur Direktori

```bash
frontend-warung-alzhim/
├── node_modules/             # Folder dependencies (otomatis dari npm install)
├── public/                   # File statis (favicon, gambar publik, dll)
├── src/                      # Sumber utama kode aplikasi
│   ├── assets/               # Gambar, ikon, dan resource statis
│   │   └── react.svg
│   ├── components/           # Komponen UI reusable
│   ├── layouts/              # Layout utama (Navbar, Sidebar, Footer, dll)
│   ├── pages/                # Halaman aplikasi
│   ├── routes/               # Routing antar halaman
│   ├── stores/               # State management (Context API atau Zustand)
│   ├── App.css
│   ├── App.jsx               # Root komponen React
│   ├── index.css             # Styling global
│   └── main.jsx              # Entry point aplikasi
├── .env                      # Variabel environment (jangan diupload ke GitHub)
├── .env.example              # Contoh konfigurasi environment
├── .gitignore                # File & folder yang diabaikan Git
├── eslint.config.js          # Konfigurasi ESLint
├── index.html                # Halaman utama aplikasi
├── package-lock.json         # Versi dependency yang digunakan
├── package.json              # Metadata dan script proyek
├── LICENSE                   # Lisensi proyek
├── README.md                 # Dokumentasi proyek
├── vercel.json               # Konfigurasi deployment ke Vercel
└── vite.config.js            # Konfigurasi build tool Vite
```

---

## 🧠 Fitur Utama
- ✅ Registrasi & login pengguna  
- ✅ Manajemen produk & stok  
- ✅ Keranjang belanja & checkout  
- ✅ Integrasi pembayaran digital (Midtrans)  
- ✅ Laporan penjualan & statistik  
- ✅ Tampilan responsif di berbagai perangkat  

---

## 🧪 Pengujian
- **Metode:** Black-box Testing & User Acceptance Testing (UAT)  
- **Hasil:** Seluruh fitur utama berjalan sesuai kebutuhan.  
- **Kepuasan Pengguna:** Rata-rata **94,33% (Sangat Baik)** berdasarkan hasil UAT.  

---

## 🛠️ Maintenance Implementation
Tahap *Maintenance* dilakukan untuk memastikan sistem dapat berfungsi dan dikembangkan secara berkelanjutan.  
Langkah-langkah yang dilakukan meliputi:
- 📄 Penyusunan dokumentasi teknis (`README.md`)  
- 🔄 Pengelolaan kode sumber menggunakan Git & GitHub  
- 🔓 Penggunaan lisensi terbuka **LGPL v3.0**  
- 🌐 Publikasi repositori agar dapat diakses untuk pembelajaran & pengembangan lanjutan  

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah **GNU Lesser General Public License v3.0**.  
Lihat file [LICENSE](./LICENSE) untuk detail lengkap.  

---

## 👩‍💻 Pengembang
**Alfia Meilani Putri**  
Fakultas Ilmu Komputer, Universitas Singaperbangsa Karawang (2025)  

📎 **Repositori Backend:**  
[https://github.com/alfiameilaniputri/backend-warung-alzhim](https://github.com/alfiameilaniputri/backend-warung-alzhim)
