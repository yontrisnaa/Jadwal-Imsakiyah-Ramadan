# 🌙 Jadwal Imsakiyah & Shalat: Bimas Islam

![Live App](https://img.shields.io/badge/Live_App-Online-brightgreen?style=for-the-badge&logo=vercel)
![Serverless](https://img.shields.io/badge/Serverless-Ready-blueviolet?style=for-the-badge&logo=node.js)
![No API Key](https://img.shields.io/badge/API_Key-Not_Required-orange?style=for-the-badge)

Aplikasi web modern, dinamis, dan responsif untuk mengecek **Jadwal Imsakiyah Ramadan** (30 hari penuh) maupun **Jadwal Shalat Masehi Bulanan**. Semua data di-_scrape_ secara _real-time_ ke *database* resmi [Bimas Islam Kementerian Agama RI](https://bimasislam.kemenag.go.id/) tanpa memerlukan *API Key* maupun token pendaftaran.

Aplikasi ini didesain menggunakan **Vanilla HTML, CSS, dan Javascript** di sisi *frontend* (ditambah estestika _Glassmorphism_ & Dark Mode) dan **Node.js Serverless Function (Vercel)** di sisi *backend* untuk menjembatani sistem sekuriti Bimas Islam (seperti *referer checks*, session handling, dan mem-bypass *Illegal Key*).

### Fitur Utama 🌟

- Murni mem-bypass validasi akses / "Illegal Key" website Bimas Islam.
- **2 Mode Jadwal:** Jadwal bulanan Shalat & Jadwal 1 bulanan Ramadan (Imsakiyah).
- **Auto-Deteksi Lokasi**: Memanfaatkan _Geolocation_ dan _IP API_ secara *fuzzy matching* sehingga kota dan provinsi langsung terisi begitu website di-_load_.
- **Estetika Maksimal:** Desain UI/UX _Glassmorphism_ modern yang memanjakan mata, dilengkapi fitur geser tema Terang/Gelap *(Dark Mode)*.
- **Serverless Ready:** Dirancang khusus supaya bisa langsung di-*deploy_ secara gratis ke platform seperti Vercel. Fitur komputasi berada di folder `api/`.

---

## 🔗 Live Demo
Coba aplikasi live yang kami jalankan gratis menggunakan *Edge Server* milik Vercel:

👉 **[Jadwal Imsakiyah Online](https://jadwalimsakiyah.vercel.app/)**

Atau URL alternatif cadangan: [ramadanimsakiyah.vercel.app](https://ramadanimsakiyah.vercel.app/)

---

## 👨‍💻 Cara Menjalankan di Localhost (Komputer Anda)

Jika Anda ingin menjalankan atau mengembangkan situs ini di komputer (localhost), cukup ikuti panduan berikut.
Syarat Utama: Pastikan Anda telah menginstal Node.js di komputer Anda.

1. **Clone Repositori Ini:**
   ```bash
   git clone https://github.com/yontrisnaa/Jadwal-Imsakiyah-Ramadan.git
   cd Jadwal-Imsakiyah-Ramadan
   ```

2. **Jalankan Instalasi Dependency (Local Server)**
   Kami telah menggunakan Express.js untuk men-simulasikan server Vercel di localhost. Lakukan *setup* menggunakan NPM:
   ```bash
   npm install
   ```
   
3. **Mulai Local Server**
   Jalankan perintah ini di tab terminal Anda.
   ```bash
   npm start
   ```

4. **Buka Browser**
   Buka `http://localhost:3000` di web browser kesayangan Anda (Chrome, Safari, dll).
   Selamat, Aplikasi sudah jalan lokal di mesin Anda dengan _behavior_ yang mirip 100% dengan kondisi Serverless Vercel nantinya! 💻

---

## 🚀 Cara Deploy Ulang ke Vercel

Sistem ini sangat transparan bagi *engine* Vercel. Karena adanya folder `/api/`, maka *endpoint* `api/imsakiyah.js` akan disulap otomatis sebagai *REST API Endpoint* (*Severless Function*).

* **Cara Mudah (Tanpa Terminal)**:
  1. Login ke [Vercel.com](https://vercel.com/)
  2. Klik menu **Add New Project**
  3. *Import* dari repositori GitHub ini Anda.
  4. Langsung klik **Deploy**. Tidak perlu ada pengaturan variabel lingkungan *(environment variables)* lagi!
  
* **Cara Pro (Dengan Terminal)**:
  Bila Anda telah memodifikasi aplikasinya dan ingin _deploy_ melalui Vercel CLI langsung dari Terminal komputer Anda:
  ```bash
  # Instal Vercel CLI secara global di komputermu
  npm i -g vercel
  
  # Masuk/Login ke akun Vercel
  vercel login
  
  # Jalankan Deploy langsung ke Production!
  vercel --prod
  ```

---

*Didukung secara sukarela untuk kepentingan open-source.* 🕌✨
