# 🎓 Website Himpunan Mahasiswa PGMI (Hima PGMI)

> Platform digital resmi Himpunan Mahasiswa Pendidikan Guru Madrasah Ibtidaiyah — menjembatani informasi, akademik, dan aspirasi mahasiswa dalam satu ekosistem digital yang modern dan fungsional.

---

## 📌 Tentang Proyek

Website ini dirancang bukan sekadar "kartu nama digital", melainkan sebuah **platform organisasi yang hidup** — tempat mahasiswa PGMI bisa mengakses informasi event, materi akademik, berita organisasi, hingga menyampaikan aspirasi. Tujuan utamanya adalah meningkatkan **kredibilitas, transparansi, dan jangkauan** Hima PGMI di lingkungan kampus maupun eksternal.

---

## 🗂️ Struktur Halaman & Fitur

### 1. 🏠 Halaman Utama (Homepage)
Wajah digital Hima PGMI yang catchy dan informatif.

- **Hero Banner** — Foto kegiatan terbaru atau pesan sambutan ketua hima yang energik
- **Highlight Cards** — Cuplikan berita terbaru, event terdekat, dan capaian prestasi mahasiswa
- **Call to Action (CTA)** — Tombol navigasi cepat ke halaman penting:
  - `Daftar Lomba` → Portal Event
  - `Baca Jurnal` → Pojok Akademik
  - `Kenali Kami` → Profil Himpunan
- **Branding Konsisten** — Logo, warna, dan tipografi yang seragam di seluruh halaman

---

### 2. 🏛️ Profil Himpunan (Tentang Kami)
Transparansi organisasi untuk mahasiswa baru dan pihak eksternal.

- **Visi & Misi** — Arah gerak dan nilai perjuangan Hima PGMI
- **Sejarah Singkat** — Latar belakang pendirian dan milestone penting
- **Struktur Organisasi** — Bagan kepengurusan lengkap:
  - Badan Pengurus Harian (BPH)
  - Departemen / Divisi
  - Foto pengurus + deskripsi tugas singkat

---

### 3. 📅 Portal Program Kerja & Event ⭐ **(Core Feature)**
Pusat manajemen acara dan aktivitas himpunan.

- **Kalender Kegiatan** — Jadwal program kerja sepanjang periode kepengurusan
- **Microsite / Halaman Khusus Event** — Untuk setiap festival, kompetisi, atau seminar besar, tersedia halaman tersendiri yang memuat:
  - Timeline (registrasi → technical meeting → hari H → pengumuman)
  - Petunjuk Teknis (Juknis) yang bisa diunduh
  - Formulir pendaftaran lomba
  - Pengumuman hasil seleksi & pemenang
- **Highlight Event Unggulan** — Banner khusus untuk acara tahunan seperti Festival Pendidikan atau Pekan Ilmiah PGMI

---

### 4. 📚 Pojok Akademik & Bank Data ⭐ **(Core Feature)**
Resource center yang menjadi nilai tambah utama website ini karena spesifik untuk kebutuhan perkuliahan PGMI.

- **Galeri Media Pembelajaran** — Etalase digital karya mahasiswa:
  - Desain Canva, Desmos, PowerPoint interaktif
  - Media berbasis teknologi untuk kelas MI/SD
- **Bank Soal & Referensi** — Kumpulan sumber belajar:
  - E-book dan jurnal pendidikan dasar
  - Referensi skripsi, PTK (Penelitian Tindakan Kelas)
  - Modul ajar dan RPP
- **Info Beasiswa & Karir** — Update berkala:
  - Lowongan magang di lembaga pendidikan
  - Info beasiswa internal dan eksternal kampus

---

### 5. 📰 Media & Publikasi
Corong informasi dan dokumentasi kegiatan himpunan.

- **Artikel / Blog** — Konten berkualitas meliputi:
  - Liputan kegiatan Hima
  - Opini mahasiswa tentang isu pendidikan dasar (PGMI/PGSD)
  - Tips mengajar dan inovasi pembelajaran
- **Galeri Dokumentasi** — Album foto dan video kegiatan yang tertata rapi per kategori/event

---

### 6. 📣 Layanan Advokasi & Kontak
Saluran komunikasi dua arah antara himpunan dan anggotanya.

- **Formulir Aspirasi** — Kotak saran digital (integrasi Google Forms) untuk menyampaikan keluhan atau masukan ke Hima
- **Kontak & Media Sosial** — Tautan langsung ke:
  - Instagram
  - TikTok
  - YouTube
  - Kontak narahubung (WhatsApp/Email) resmi

---

## 🎯 Prioritas Pengembangan

Berdasarkan diskusi, berikut urutan prioritas fitur berdasarkan dampak dan kebutuhan paling mendesak:

| Prioritas | Fitur | Alasan |
|-----------|-------|--------|
| 🔴 Utama | Portal Event & Pendaftaran Lomba | Kebutuhan operasional langsung; jadi garda depan engagement |
| 🔴 Utama | Pojok Akademik (Bank Data & Media Pembelajaran) | Core value spesifik PGMI; pembeda dari hima lain |
| 🟡 Penting | Profil & Struktur Organisasi | Kredibilitas & transparansi organisasi |
| 🟡 Penting | Berita & Galeri Dokumentasi | Membangun rekam jejak dan narasi organisasi |
| 🟢 Pelengkap | Formulir Aspirasi & Kontak | Menambah dimensi responsivitas organisasi |

---

## 🛠️ Teknologi yang Direkomendasikan

### Opsi A — Tanpa Coding (No-Code / Low-Code)
Cocok jika tim tidak memiliki developer, cepat di-launch, dan mudah dikelola secara mandiri.

| Kebutuhan | Tools |
|-----------|-------|
| Pembuatan website | [Webflow](https://webflow.com), [Notion](https://notion.so), [Framer](https://framer.com) |
| Formulir & pendaftaran | Google Forms + Google Sheets |
| Galeri & media | Google Drive / Canva embed |
| Domain | Niagahoster / Domainesia (.org / .id) |

### Opsi B — Full Development
Cocok jika ada anggota Hima yang memiliki kemampuan web development.

| Layer | Teknologi |
|-------|-----------|
| Frontend | React.js / Next.js |
| Styling | Tailwind CSS |
| Backend / CMS | Strapi, Sanity, atau WordPress Headless |
| Database | Supabase / Firebase |
| Hosting | Vercel (frontend) + Railway / Render (backend) |
| Domain | `.pgmi.ac.id` atau `.pgmi.org` |

---

## 📁 Struktur Folder (Opsi Full Dev)

```
hima-pgmi-web/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── logos/
│   │   └── documents/    # Juknis, e-book, dll.
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── EventCard.jsx
│   │   ├── ResourceCard.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── index.jsx          # Homepage
│   │   ├── tentang.jsx        # Profil Himpunan
│   │   ├── event/
│   │   │   ├── index.jsx      # Daftar semua event
│   │   │   └── [slug].jsx     # Microsite per event
│   │   ├── akademik.jsx       # Pojok Akademik
│   │   ├── berita/
│   │   │   ├── index.jsx
│   │   │   └── [slug].jsx
│   │   ├── galeri.jsx
│   │   └── kontak.jsx
│   ├── styles/
│   └── utils/
├── README.md
└── package.json
```

---

## 🎨 Panduan Branding

Pastikan identitas visual Hima PGMI konsisten di seluruh elemen website:

- **Logo** — Gunakan format SVG / PNG transparan resolusi tinggi
- **Warna Utama** — Sesuaikan dengan warna almamater / identitas kampus (perlu dikonfirmasi)
- **Tipografi** — Kombinasi font formal untuk heading + font readable untuk body text
- **Tone of Voice** — Profesional namun hangat; mencerminkan semangat mahasiswa pendidikan

---

## 👥 Tim yang Dibutuhkan

| Peran | Tugas |
|-------|-------|
| Project Manager | Koordinasi jadwal, konten, dan review |
| Content Writer | Mengisi artikel, profil, dan copywriting halaman |
| Desainer UI/UX | Membuat mockup, aset visual, dan panduan branding |
| Web Developer | Membangun dan memelihara website (opsional jika no-code) |
| Admin Konten | Update rutin berita, event, dan galeri |

---

## 🚀 Roadmap Peluncuran

```
Fase 1 — Fondasi (Minggu 1–2)
  ✅ Tentukan domain & hosting
  ✅ Finalisasi branding & color palette
  ✅ Setup CMS / platform

Fase 2 — Pengembangan Core (Minggu 3–5)
  ✅ Bangun Homepage, Profil, dan Kontak
  ✅ Setup Portal Event pertama
  ✅ Upload konten awal Pojok Akademik

Fase 3 — Publikasi & Sosialisasi (Minggu 6)
  ✅ Soft launch & testing
  ✅ Promosi via media sosial Hima
  ✅ Pengumpulan feedback dari mahasiswa

Fase 4 — Iterasi & Pengembangan Lanjutan
  🔄 Tambah fitur berdasarkan feedback
  🔄 Optimasi SEO
  🔄 Integrasi sistem pendaftaran event lebih lengkap
```

---

## 📞 Kontak Proyek

> Untuk pertanyaan, kontribusi konten, atau kolaborasi pengembangan website ini, hubungi:
>
> 📧 **Email:** [email-resmi-hima@pgmi.ac.id]
> 📱 **Instagram:** [@hima_pgmi]
> 💬 **WhatsApp:** [Nomor Narahubung Resmi]

---

<div align="center">

**Hima PGMI** — *Bergerak untuk Pendidikan, Berinovasi untuk Masa Depan*

© 2025 Himpunan Mahasiswa PGMI. All rights reserved.

</div>
#   H M P _ P G M I _ U N I R A _ M A L A N G  
 