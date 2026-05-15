# 🔐 Panduan Admin Panel – Website Hima PGMI

> Dokumen ini khusus untuk pengurus Hima PGMI yang bertugas mengelola konten website. Tidak perlu keahlian coding sama sekali — cukup klik, isi form, simpan.

---

## 🚪 Cara Masuk ke Admin Panel (Tersembunyi)

Admin panel **tidak memiliki tombol atau ikon login** di tampilan publik. Akses dilakukan lewat URL khusus yang hanya diketahui pengurus berwenang.

### Cara Akses:
> Buka browser, ketik langsung URL berikut di address bar:
> ```
> https://hima-pgmi.vercel.app/admin
> ```
> Halaman login akan muncul. Pengunjung biasa yang tidak tahu URL ini tidak akan bisa mengaksesnya.

### Kredensial Default:
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `pgmi2025` |

> ⚠️ **Segera ganti password** setelah pertama kali login melalui menu **Pengaturan**.

### Keamanan Tambahan (Rekomendasi):
- Jangan bagikan URL `/admin` ke umum
- Aktifkan **Vercel Password Protection** untuk lapisan keamanan ekstra sebelum halaman login muncul
- Pertimbangkan tambah **2FA** di pengembangan berikutnya

---

## 🗂️ Menu Admin & Cara Penggunaannya

Setelah login, kamu akan masuk ke dashboard admin dengan sidebar berisi 7 menu utama:

---

### 📊 1. Dashboard
Halaman ringkasan yang menampilkan:
- Jumlah total berita, event, anggota, dan jurnal yang sudah diupload
- Konten terbaru yang ditambahkan
- Tombol pintasan ke menu yang sering digunakan

---

### 🖼️ 2. Galeri Foto

Digunakan untuk mengelola foto dokumentasi kegiatan Hima.

**Cara menambah foto:**
1. Klik tombol **"+ Tambah Foto"**
2. Isi judul foto (contoh: *"Ospek Mahasiswa Baru 2025"*)
3. Pilih kategori (Kegiatan, Seminar, Lomba, dll.)
4. Klik **"Pilih File"** → pilih foto dari perangkatmu
5. Klik **"Simpan"**

**Cara hapus foto:**
- Klik ikon 🗑️ di pojok kartu foto → konfirmasi hapus

> 💡 Format yang didukung: JPG, PNG, WEBP. Ukuran maksimal disarankan 2MB per foto agar website tetap cepat.

---

### 👥 3. Struktur Organisasi

Digunakan untuk menampilkan bagan kepengurusan Hima PGMI.

**Cara menambah pengurus:**
1. Klik **"+ Tambah Pengurus"**
2. Isi form berikut:
   - **Nama Lengkap** – nama pengurus
   - **Jabatan** – contoh: *Ketua Umum*, *Sekretaris*, *Bendahara*
   - **Divisi/Departemen** – contoh: *BPH*, *Divisi Akademik*, *Divisi Media*
   - **Deskripsi Tugas** *(opsional)* – tugas singkat jabatan tersebut
   - **Foto** – upload foto profil pengurus
3. Klik **"Simpan"**

**Cara edit pengurus:**
- Klik ikon ✏️ pada kartu pengurus → ubah data → **"Simpan"**

**Cara hapus:**
- Klik ikon 🗑️ → konfirmasi hapus

> 💡 Urutkan pengurus dari jabatan tertinggi ke bawah agar tampil rapi di halaman publik.

---

### 📰 4. Berita & Artikel

Digunakan untuk mempublikasikan liputan kegiatan, opini, atau informasi penting.

**Cara membuat berita baru:**
1. Klik **"+ Tulis Berita"**
2. Isi form:
   - **Judul Berita** – usahakan singkat dan menarik
   - **Tanggal Terbit** – pilih dari kalender
   - **Isi Berita** – tulis konten di kotak teks yang tersedia (mendukung paragraf panjang)
   - **Foto Sampul** *(opsional)* – gambar utama yang muncul di kartu berita
3. Klik **"Publikasikan"**

**Cara edit berita:**
- Klik ✏️ di kartu berita → ubah → **"Simpan Perubahan"**

**Cara hapus:**
- Klik 🗑️ → konfirmasi

> 💡 Tips menulis judul: gunakan kata aktif dan spesifik. Contoh: *"Tim Debat PGMI Raih Juara 2 Tingkat Nasional"* lebih menarik dari *"Prestasi Mahasiswa"*.

---

### 📚 5. Jurnal & Materi Akademik

Digunakan untuk mengelola bank materi: e-book, jurnal, referensi skripsi, modul ajar, dll.

**Cara menambah materi:**
1. Klik **"+ Tambah Materi"**
2. Isi form:
   - **Judul** – nama dokumen atau materi
   - **Tipe** – pilih salah satu: `Jurnal`, `E-Book`, `Referensi Skripsi`, `Modul Ajar`, `PTK`, `Beasiswa`, `Info Karir`
   - **Deskripsi Singkat** – gambaran isi dokumen
   - **Link / URL** *(jika file ada di Google Drive atau website lain)* – tempel link-nya
   - **Upload File** *(opsional)* – upload langsung file PDF dari perangkatmu
3. Klik **"Simpan"**

**Cara hapus materi:**
- Klik 🗑️ → konfirmasi

> 💡 Disarankan simpan file besar (e-book, jurnal) di Google Drive lalu tempel link-nya, agar performa website tetap ringan.

---

### 📅 6. Event & Kegiatan

Digunakan untuk menampilkan jadwal dan informasi acara Hima.

**Cara menambah event:**
1. Klik **"+ Tambah Event"**
2. Isi form:
   - **Nama Event** – contoh: *"Festival Pendidikan PGMI 2025"*
   - **Tanggal Pelaksanaan** – pilih dari kalender
   - **Status** – pilih: `Akan Datang`, `Sedang Berlangsung`, atau `Selesai`
   - **Deskripsi** – detail singkat acara (tema, tempat, dll.)
   - **Poster / Banner** *(opsional)* – upload gambar poster acara
   - **Link Pendaftaran** *(opsional)* – link Google Form pendaftaran peserta
3. Klik **"Simpan"**

**Update status event:**
- Setelah acara selesai, klik ✏️ lalu ubah status menjadi `Selesai` agar tampilan website selalu akurat.

> 💡 Buat event seawal mungkin agar peserta punya waktu untuk mempersiapkan diri. Status `Akan Datang` akan otomatis tampil dengan label kuning di halaman publik.

---

### ⚙️ 7. Pengaturan

Digunakan untuk mengatur informasi umum website dan akun admin.

**Yang bisa diubah:**
- **Teks Hero Banner** – judul dan subjudul di halaman utama
- **Link Media Sosial** – Instagram, TikTok, YouTube, WhatsApp resmi Hima
- **Username Admin** – ganti username login
- **Password Admin** – ganti password login

**Cara ganti password:**
1. Masuk ke menu **Pengaturan**
2. Scroll ke bagian *Keamanan Akun*
3. Isi password lama → isi password baru → konfirmasi password baru
4. Klik **"Simpan Perubahan"**

> ⚠️ Catat password baru di tempat yang aman. Fitur reset password bisa ditambahkan via Supabase Auth di pengembangan berikutnya.

---

## 💾 Arsitektur Penyimpanan Data

Website ini menggunakan **backend berbasis cloud** sehingga semua data tersimpan secara permanen dan bisa diakses dari perangkat manapun.

### Stack yang Digunakan:

| Layer | Teknologi | Fungsi |
|-------|-----------|--------|
| **Hosting / Frontend** | [Vercel](https://vercel.com) | Deploy website & routing `/admin` |
| **Database** | [Supabase](https://supabase.com) | Simpan data berita, event, struktur, jurnal |
| **File Storage** | Supabase Storage | Simpan foto, poster, dokumen PDF |
| **Auth Admin** | Supabase Auth | Login admin yang aman |

### Tabel Database di Supabase:

```
📦 supabase/
├── 🗄️ tabel: berita         → id, judul, isi, tanggal, foto_url
├── 🗄️ tabel: event          → id, nama, tanggal, status, deskripsi, poster_url, link_daftar
├── 🗄️ tabel: struktur       → id, nama, jabatan, divisi, deskripsi, foto_url, urutan
├── 🗄️ tabel: jurnal         → id, judul, tipe, deskripsi, link, file_url
├── 🗄️ tabel: galeri         → id, judul, kategori, foto_url, tanggal
└── 🪣 storage bucket: media  → semua file foto & dokumen
```

### Keuntungan dibanding localStorage:

| ✅ Dengan Supabase + Vercel | ❌ Kalau pakai localStorage |
|-----------------------------|------------------------------|
| Data tersimpan permanen di server | Data hilang kalau cache dihapus |
| Bisa dikelola dari HP, laptop, warnet | Hanya dari browser yang sama |
| Foto tersimpan di cloud CDN | Foto tersimpan di browser lokal |
| Bisa multi-admin sekaligus | Hanya 1 browser |
| Backup otomatis | Tidak ada backup |

### Environment Variables yang Harus Diset di Vercel:

Masuk ke **Vercel Dashboard → Project → Settings → Environment Variables**, lalu tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
```

> Nilai-nilai ini bisa didapat dari **Supabase Dashboard → Project → Settings → API**.

---

## 🔄 Alur Kerja Konten (SOP Singkat)

```
Ada kegiatan baru?
  └─> Login admin (klik logo 5x) 
       └─> Menu Event → Tambah Event
       └─> Menu Galeri → Upload foto dokumentasi (setelah acara)
       └─> Menu Berita → Tulis liputan kegiatan

Ada pengurus baru?
  └─> Menu Struktur Organisasi → Tambah Pengurus

Ada materi akademik?
  └─> Menu Jurnal & Materi → Tambah Materi

Mau update info kontak/sosmed?
  └─> Menu Pengaturan → Ubah Link Sosial Media
```

---

## 👤 Siapa yang Memegang Akses Admin?

Disarankan hanya **1–2 orang** yang memegang akses admin:
- **Sekretaris Umum** – untuk berita, dokumentasi, dan event
- **Divisi Media / Humas** – untuk galeri dan publikasi konten

Jangan bagikan username & password ke seluruh pengurus untuk menjaga keamanan konten.

---

## 🚀 Setup Awal (Untuk Developer)

### 1. Buat Project Supabase
Buka [supabase.com](https://supabase.com) → New Project → lalu jalankan SQL berikut di **SQL Editor**:

```sql
create table berita (
  id uuid default gen_random_uuid() primary key,
  judul text, isi text, tanggal date, foto_url text,
  created_at timestamptz default now()
);
create table event (
  id uuid default gen_random_uuid() primary key,
  nama text, tanggal date, status text,
  deskripsi text, poster_url text, link_daftar text
);
create table struktur (
  id uuid default gen_random_uuid() primary key,
  nama text, jabatan text, divisi text,
  deskripsi text, foto_url text, urutan int
);
create table jurnal (
  id uuid default gen_random_uuid() primary key,
  judul text, tipe text, deskripsi text, link text, file_url text
);
create table galeri (
  id uuid default gen_random_uuid() primary key,
  judul text, kategori text, foto_url text, tanggal date
);
```

Lalu buat **Storage Bucket** bernama `media` di menu Storage → New Bucket → centang Public.

### 2. Set Environment Variables di Vercel

Masuk ke **Vercel Dashboard → Project → Settings → Environment Variables**, tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL        = https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY       = eyJhbGci...
```

Nilai-nilai ini ada di **Supabase → Settings → API**.

### 3. Deploy & Akses Admin

```bash
# Push ke GitHub → auto deploy via Vercel
# Setelah deploy, akses admin di:
https://nama-project.vercel.app/admin
```

---

## 📞 Butuh Bantuan Teknis?

Jika ada fitur yang error atau ingin pengembangan lebih lanjut (misalnya: tambah fitur pendaftaran lomba, integrasi database, atau domain custom), hubungi:

> 🛠️ **Developer Website:** [Nama & Kontak Developer]
> 📧 **Email:** [email-developer]

---

<div align="center">

Dokumen ini bersifat **INTERNAL** — hanya untuk pengurus yang berwenang.

*Hima PGMI – Bergerak untuk Pendidikan, Berinovasi untuk Masa Depan* 🌿

</div>
