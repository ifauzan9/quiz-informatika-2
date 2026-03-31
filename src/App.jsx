import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, Play, CheckCircle2, XCircle, Clock, Keyboard, 
  RotateCcw, MonitorPlay, Home, Star, BookOpen, X, Settings
} from 'lucide-react';

// BANK SOAL (180 Soal Unik Tingkat SMP/SMA)
const QUESTION_BANK = [
  // ==========================================
  // KATEGORI 1: HARDWARE (30 Soal)
  // ==========================================
  { q: "Perangkat keras komputer yang berfungsi sebagai otak utama untuk memproses data adalah...", options: ["RAM", "CPU (Prosesor)", "Hardisk", "Motherboard"], answer: 1 },
  { q: "Berikut ini yang termasuk perangkat keluaran (Output Device) adalah...", options: ["Mouse", "Keyboard", "Scanner", "Printer"], answer: 3 },
  { q: "Perangkat keras yang digunakan untuk memasukkan huruf dan angka ke dalam komputer adalah...", options: ["Monitor", "Mouse", "Keyboard", "Printer"], answer: 2 },
  { q: "Perangkat yang berfungsi untuk memindahkan penunjuk atau kursor pada layar adalah...", options: ["Mouse", "Keyboard", "Flashdisk", "Speaker"], answer: 0 },
  { q: "Layar yang menampilkan gambar dan tulisan dari komputer disebut...", options: ["Proyektor", "Printer", "Monitor", "Scanner"], answer: 2 },
  { q: "Perangkat yang digunakan untuk mencetak dokumen dari komputer ke atas kertas adalah...", options: ["Scanner", "Printer", "Monitor", "Webcam"], answer: 1 },
  { q: "Perangkat yang berfungsi memindai dokumen fisik menjadi file digital adalah...", options: ["Printer", "Scanner", "Monitor", "Webcam"], answer: 1 },
  { q: "Singkatan dari RAM adalah...", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Real Access Memory"], answer: 0 },
  { q: "Memori penyimpanan sementara yang isinya hilang saat komputer dimatikan disebut...", options: ["ROM", "Flashdisk", "SSD", "RAM"], answer: 3 },
  { q: "Jenis memori yang isinya permanen dan tidak hilang meski komputer dimatikan adalah...", options: ["RAM", "Cache", "ROM", "Register"], answer: 2 },
  { q: "Perangkat yang berfungsi untuk menyimpan data secara permanen dengan kapasitas besar adalah...", options: ["RAM", "Prosesor", "Hard Drive (HDD)", "VGA Card"], answer: 2 },
  { q: "Papan sirkuit utama tempat semua komponen komputer terhubung disebut...", options: ["Processor", "Motherboard", "Power Supply", "Hardisk"], answer: 1 },
  { q: "Perangkat yang menyuplai arus listrik ke seluruh komponen di dalam CPU adalah...", options: ["Power Supply (PSU)", "Motherboard", "Stabilizer", "RAM"], answer: 0 },
  { q: "Kartu ekspansi yang berfungsi memproses grafis untuk ditampilkan ke monitor adalah...", options: ["Sound Card", "Network Card", "VGA Card", "RAM Card"], answer: 2 },
  { q: "Media penyimpanan data yang ukurannya kecil, portabel, dan ditancapkan ke port USB adalah...", options: ["Hardisk Internal", "CD-ROM", "Disket", "Flashdisk"], answer: 3 },
  { q: "Generasi penyimpanan yang lebih cepat dari HDD dan tidak menggunakan piringan magnetik adalah...", options: ["FDD", "SSD", "CD", "DVD"], answer: 1 },
  { q: "Perangkat input yang digunakan untuk bermain game, biasanya memiliki tuas dan tombol adalah...", options: ["Mouse", "Keyboard", "Joystick", "Scanner"], answer: 2 },
  { q: "Alat yang berfungsi merubah suara menjadi data digital ke dalam komputer adalah...", options: ["Speaker", "Microphone", "Headset", "Soundcard"], answer: 1 },
  { q: "Kamera kecil yang biasanya terpasang di atas monitor komputer atau laptop disebut...", options: ["CCTV", "Webcam", "Handycam", "Kamera Digital"], answer: 1 },
  { q: "Perangkat yang menampilkan layar komputer ke dinding atau layar lebar adalah...", options: ["Monitor", "Televisi", "Proyektor LCD", "Scanner"], answer: 2 },
  { q: "Baterai kecil di motherboard yang menjaga agar waktu dan tanggal tetap berjalan adalah...", options: ["Baterai AAA", "Baterai CMOS", "Baterai Li-ion", "Power Bank"], answer: 1 },
  { q: "Kipas pendingin yang menempel di atas prosesor untuk mencegah overheat disebut...", options: ["Exhaust Fan", "Heatsink Fan", "Cooling Pad", "Chiller"], answer: 1 },
  { q: "Perangkat untuk membaca dan menulis data pada kepingan CD atau DVD adalah...", options: ["Flash Drive", "Optical Drive", "Hard Drive", "SSD Drive"], answer: 1 },
  { q: "Port berbentuk persegi panjang yang paling umum digunakan untuk flashdisk dan mouse adalah...", options: ["Port VGA", "Port HDMI", "Port USB", "Port Audio"], answer: 2 },
  { q: "Port yang berfungsi untuk menyalurkan video dan audio berkualitas tinggi (HD) sekaligus adalah...", options: ["Port USB", "Port VGA", "Port HDMI", "Port LAN"], answer: 2 },
  { q: "Alat pemindai garis-garis hitam putih pada kemasan produk di kasir disebut...", options: ["Webcam", "Printer", "Barcode Scanner", "Proyektor"], answer: 2 },
  { q: "Perangkat yang berfungsi seperti mouse, tetapi menyatu pada badan laptop disebut...", options: ["Trackball", "Touchpad", "Touchscreen", "Stylus"], answer: 1 },
  { q: "Berapa bit yang terdapat dalam 1 Byte?", options: ["2 Bit", "4 Bit", "8 Bit", "16 Bit"], answer: 2 },
  { q: "Berapa kapasitas penyimpanan standar dari sebuah CD-R?", options: ["700 MB", "1.44 MB", "4.7 GB", "1 TB"], answer: 0 },
  { q: "Perangkat tambahan yang memberikan daya cadangan sementara saat listrik tiba-tiba mati adalah...", options: ["Stabilizer", "Genset", "UPS", "Power Supply"], answer: 2 },

  // ==========================================
  // KATEGORI 2: SOFTWARE & OS (30 Soal)
  // ==========================================
  { q: "Program atau aplikasi di dalam komputer yang tidak bisa diraba secara fisik disebut...", options: ["Hardware", "Software", "Brainware", "CPU"], answer: 1 },
  { q: "Manusia yang menggunakan, mengoperasikan, dan mengatur komputer disebut...", options: ["Hardware", "Software", "Brainware", "Malware"], answer: 2 },
  { q: "Fungsi utama dari sebuah Sistem Operasi (OS) pada komputer adalah...", options: ["Mengetik dokumen", "Bermain game", "Mengelola hardware & software", "Mengedit foto"], answer: 2 },
  { q: "Di bawah ini yang merupakan contoh Sistem Operasi (OS) untuk PC/Laptop adalah...", options: ["Microsoft Word", "Windows", "Google Chrome", "Instagram"], answer: 1 },
  { q: "Sistem operasi berlogo pinguin yang bersifat gratis dan open-source adalah...", options: ["Windows", "macOS", "Linux", "Android"], answer: 2 },
  { q: "Sistem operasi buatan perusahaan Apple yang digunakan khusus untuk perangkat Mac adalah...", options: ["Windows", "Android", "Linux", "macOS"], answer: 3 },
  { q: "Sistem operasi mobile paling populer di dunia yang dikembangkan oleh Google adalah...", options: ["iOS", "Symbian", "Android", "BlackBerry OS"], answer: 2 },
  { q: "Software yang kode sumbernya terbuka dan bebas dimodifikasi oleh siapa saja disebut...", options: ["Freeware", "Shareware", "Open Source", "Commercial"], answer: 2 },
  { q: "Aplikasi yang digunakan untuk memutar file musik dan video disebut...", options: ["Web Browser", "Media Player", "Word Processor", "Spreadsheet"], answer: 1 },
  { q: "Software yang dirancang khusus untuk merusak atau menyusup ke sistem komputer disebut...", options: ["Hardware", "Freeware", "Malware", "Firmware"], answer: 2 },
  { q: "Program yang berfungsi untuk mendeteksi dan menghapus virus komputer adalah...", options: ["Web Browser", "Antivirus", "Media Player", "Firewall"], answer: 1 },
  { q: "Di bawah ini yang merupakan aplikasi desain grafis pengolah gambar vektor adalah...", options: ["CorelDraw", "Microsoft Word", "Notepad", "Winamp"], answer: 0 },
  { q: "Aplikasi Adobe yang paling populer digunakan untuk mengedit/memanipulasi foto (bitmap) adalah...", options: ["Adobe Premiere", "Adobe Illustrator", "Adobe Photoshop", "Adobe Reader"], answer: 2 },
  { q: "Aplikasi yang digunakan untuk membaca dokumen dalam format PDF adalah...", options: ["Microsoft Excel", "Adobe Reader", "Notepad", "Paint"], answer: 1 },
  { q: "Software utility yang digunakan untuk mengompres atau mengecilkan ukuran file adalah...", options: ["VLC", "WinRAR", "Chrome", "Avast"], answer: 1 },
  { q: "Perangkat lunak gratis namun menampilkan banyak iklan di dalamnya disebut...", options: ["Spyware", "Adware", "Malware", "Open Source"], answer: 1 },
  { q: "Software uji coba yang bisa digunakan gratis tetapi dengan batasan waktu/fitur disebut...", options: ["Shareware", "Freeware", "Open Source", "Firmware"], answer: 0 },
  { q: "Istilah untuk tampilan antarmuka pengguna berbasis grafis (ikon, jendela) adalah...", options: ["CLI", "GUI", "DOS", "BIOS"], answer: 1 },
  { q: "Tampilan awal saat komputer pertama kali selesai booting pada Windows disebut...", options: ["Taskbar", "Start Menu", "Desktop", "Screensaver"], answer: 2 },
  { q: "Aplikasi bawaan Windows yang digunakan untuk menggambar sederhana adalah...", options: ["Corel", "Photoshop", "Paint", "Calculator"], answer: 2 },
  { q: "Sistem operasi berbasis teks (Command Line) yang populer sebelum era Windows adalah...", options: ["Android", "macOS", "MS-DOS", "Ubuntu"], answer: 2 },
  { q: "Pusat pengaturan sistem pada OS Windows dimana kita bisa menghapus aplikasi disebut...", options: ["My Computer", "Control Panel", "Recycle Bin", "Command Prompt"], answer: 1 },
  { q: "Tempat penampungan file sementara setelah dihapus (sebelum dihapus permanen) pada Windows adalah...", options: ["My Documents", "Local Disk C", "Recycle Bin", "Downloads"], answer: 2 },
  { q: "Kombinasi tombol keyboard untuk menutup paksa aplikasi yang 'Not Responding' (Task Manager) adalah...", options: ["Ctrl + Alt + Del", "Ctrl + C", "Alt + F4", "Windows + D"], answer: 0 },
  { q: "Ekstensi (format) file standar untuk aplikasi program yang bisa dieksekusi di Windows adalah...", options: [".jpg", ".mp3", ".exe", ".txt"], answer: 2 },
  { q: "Ekstensi file standar untuk sebuah gambar/foto adalah...", options: [".doc", ".jpg / .png", ".mp4", ".xls"], answer: 1 },
  { q: "Aplikasi bawaan Windows yang paling dasar untuk mengetik teks tanpa format adalah...", options: ["WordPad", "Microsoft Word", "Notepad", "Excel"], answer: 2 },
  { q: "Perangkat lunak yang ditanamkan secara permanen ke dalam chip memori (contoh: BIOS) disebut...", options: ["Software", "Malware", "Firmware", "Hardware"], answer: 2 },
  { q: "Aplikasi yang berfungsi menjembatani komunikasi antara OS dengan perangkat keras tertentu disebut...", options: ["Driver", "Antivirus", "Browser", "Compiler"], answer: 0 },
  { q: "Sistem operasi Linux yang sangat populer dengan logo lingkaran oranye-merah-kuning adalah...", options: ["Debian", "Ubuntu", "Kali Linux", "Fedora"], answer: 1 },

  // ==========================================
  // KATEGORI 3: JARINGAN & INTERNET (30 Soal)
  // ==========================================
  { q: "Jaringan komputer yang hanya mencakup area satu ruangan, gedung, atau sekolah disebut...", options: ["WAN", "MAN", "LAN", "PAN"], answer: 2 },
  { q: "Jaringan komputer yang menghubungkan jaringan antarkota atau provinsi disebut...", options: ["LAN", "MAN", "WAN", "Internet"], answer: 1 },
  { q: "Jaringan komputer global yang saling terhubung mencakup seluruh dunia disebut...", options: ["LAN", "MAN", "WAN", "Internet"], answer: 3 },
  { q: "Jaringan nirkabel (tanpa kabel) sering disebut juga dengan...", options: ["Wired", "Wireless", "Fiber Optik", "Ethernet"], answer: 1 },
  { q: "Bentuk topologi di mana setiap komputer terhubung ke satu titik pusat (Hub/Switch) disebut...", options: ["Star", "Ring", "Bus", "Mesh"], answer: 0 },
  { q: "Topologi jaringan dimana komputer dihubungkan membentuk sebuah lingkaran tertutup disebut topologi...", options: ["Bus", "Star", "Ring", "Tree"], answer: 2 },
  { q: "Kepanjangan dari Wi-Fi adalah...", options: ["Wireless Fidelity", "Wide Fire", "Wireless File", "Wide Fidelity"], answer: 0 },
  { q: "Perangkat keras yang berfungsi untuk membagi sinyal internet / memancarkan sinyal Wi-Fi adalah...", options: ["Switch", "Hub", "Router", "LAN Card"], answer: 2 },
  { q: "Alamat identitas numerik (angka) untuk komputer yang terhubung dalam jaringan disebut...", options: ["MAC Address", "IP Address", "URL Address", "Email Address"], answer: 1 },
  { q: "Kepanjangan dari WWW pada alamat website adalah...", options: ["World Wide Web", "World Web Wide", "Word Wide Web", "Web Wide World"], answer: 0 },
  { q: "Aplikasi perangkat lunak yang digunakan untuk membuka/menjelajahi halaman web disebut...", options: ["Search Engine", "Web Browser", "Web Server", "Web Design"], answer: 1 },
  { q: "Di bawah ini yang TIDAK termasuk Web Browser adalah...", options: ["Mozilla Firefox", "Google Chrome", "Google Search", "Microsoft Edge"], answer: 2 },
  { q: "Mesin pencari (Search Engine) yang paling populer dan banyak digunakan di dunia adalah...", options: ["Yahoo!", "Bing", "Google", "DuckDuckGo"], answer: 2 },
  { q: "Perusahaan atau organisasi yang menyediakan layanan sambungan internet (seperti Telkomsel/Indihome) disebut...", options: ["ISP", "ASP", "WWW", "HTTP"], answer: 0 },
  { q: "Singkatan dari ISP adalah...", options: ["Internet Service Protocol", "Internet Service Provider", "Internal System Provider", "Internet Secure Protocol"], answer: 1 },
  { q: "Protokol standar yang digunakan untuk mentransfer data halaman web (biasa ada di depan URL) adalah...", options: ["FTP", "SMTP", "HTTP", "TCP"], answer: 2 },
  { q: "Huruf 'S' pada HTTPS (seperti https://www.google.com) merupakan singkatan dari...", options: ["System", "Secure", "Server", "Speed"], answer: 1 },
  { q: "Sistem yang menerjemahkan alamat IP berupa angka menjadi nama domain (misal google.com) disebut...", options: ["DNS", "DHCP", "FTP", "TCP/IP"], answer: 0 },
  { q: "Nama atau alamat unik untuk mengidentifikasi sebuah website di internet disebut...", options: ["Domain", "IP Address", "Hosting", "Server"], answer: 0 },
  { q: "Tempat penyimpanan data dari sebuah website di internet agar bisa diakses 24 jam disebut...", options: ["Domain", "Browser", "Web Hosting", "Client"], answer: 2 },
  { q: "Jenis kabel jaringan tembaga berlilitan yang paling umum digunakan untuk LAN adalah...", options: ["Kabel Coaxial", "Kabel Fiber Optik", "Kabel Listrik", "Kabel UTP"], answer: 3 },
  { q: "Konektor transparan yang dipasang di ujung kabel UTP jaringan LAN disebut...", options: ["RJ-11", "RJ-45", "USB", "HDMI"], answer: 1 },
  { q: "Kabel jaringan masa kini yang menggunakan cahaya untuk mentransfer data berkecepatan tinggi adalah...", options: ["Coaxial", "UTP", "Fiber Optik", "STP"], answer: 2 },
  { q: "Kepanjangan dari URL adalah...", options: ["Uniform Resource Locator", "Universal Routing Line", "Unified Resource Link", "User Routing Locator"], answer: 0 },
  { q: "Kegiatan memindahkan file (mengambil) dari server internet ke komputer kita disebut...", options: ["Upload", "Download", "Browsing", "Chatting"], answer: 1 },
  { q: "Kegiatan mengirimkan file dari komputer kita ke server internet disebut...", options: ["Download", "Upload", "Streaming", "Surfing"], answer: 1 },
  { q: "Menonton video secara langsung di internet tanpa harus mengunduh file-nya secara utuh disebut...", options: ["Downloading", "Uploading", "Streaming", "Browsing"], answer: 2 },
  { q: "Jaringan privat internal sebuah perusahaan/sekolah yang menggunakan teknologi internet disebut...", options: ["Ekstranet", "Intranet", "Internet", "Localnet"], answer: 1 },
  { q: "Tanda '@' pada sebuah alamat e-mail dibaca dengan sebutan...", options: ["At", "A-keong", "And", "About"], answer: 0 },
  { q: "Protokol jaringan yang secara spesifik digunakan untuk mengirim e-mail adalah...", options: ["HTTP", "FTP", "DHCP", "SMTP"], answer: 3 },

  // ==========================================
  // KATEGORI 4: OFFICE (Word, Excel, PPT) (30 Soal)
  // ==========================================
  { q: "Perangkat lunak Microsoft yang fungsi utamanya untuk mengetik surat atau makalah adalah...", options: ["Microsoft Word", "Microsoft Excel", "CorelDraw", "Notepad"], answer: 0 },
  { q: "Perangkat lunak yang khusus digunakan untuk mengolah angka dan tabel adalah...", options: ["Microsoft Word", "Microsoft PowerPoint", "Microsoft Excel", "Adobe Photoshop"], answer: 2 },
  { q: "Aplikasi Microsoft yang dirancang khusus untuk membuat tayangan presentasi adalah...", options: ["Microsoft Word", "Microsoft Access", "Microsoft Publisher", "Microsoft PowerPoint"], answer: 3 },
  { q: "Kombinasi tombol keyboard (shortcut) untuk menyalin teks (Copy) adalah...", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"], answer: 0 },
  { q: "Kombinasi tombol keyboard (shortcut) untuk menempelkan teks (Paste) adalah...", options: ["Ctrl + C", "Ctrl + P", "Ctrl + V", "Ctrl + X"], answer: 2 },
  { q: "Kombinasi tombol keyboard untuk memotong (Cut) teks/gambar adalah...", options: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + Z"], answer: 1 },
  { q: "Kombinasi tombol untuk membatalkan perintah terakhir (Undo) adalah...", options: ["Ctrl + U", "Ctrl + Z", "Ctrl + Y", "Ctrl + A"], answer: 1 },
  { q: "Kombinasi tombol Ctrl + S pada aplikasi Office berfungsi untuk...", options: ["Menghapus File", "Membuka File", "Menyimpan File (Save)", "Mencetak File"], answer: 2 },
  { q: "Kombinasi tombol Ctrl + P pada aplikasi Office berfungsi untuk...", options: ["Paste", "Print (Mencetak)", "Paragraph", "Properties"], answer: 1 },
  { q: "Pada Microsoft Word, perataan teks sehingga rata kiri dan kanan (penuh) disebut...", options: ["Align Left", "Align Right", "Center", "Justify"], answer: 3 },
  { q: "Fungsi dari ikon 'Bold' (berlogo B tebal) pada Word adalah...", options: ["Membuat huruf miring", "Memberi garis bawah", "Menebalkan huruf", "Mewarnai huruf"], answer: 2 },
  { q: "Shortcut keyboard untuk menebalkan teks (Bold) adalah...", options: ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + D"], answer: 0 },
  { q: "Fungsi dari ikon 'Italic' (berlogo I miring) adalah...", options: ["Menebalkan tulisan", "Membuat tulisan miring", "Mencetak dokumen", "Memberi garis bawah"], answer: 1 },
  { q: "Jarak antara teks dengan tepi kertas (atas, bawah, kiri, kanan) disebut...", options: ["Spacing", "Indent", "Margin", "Border"], answer: 2 },
  { q: "Satu kotak pertemuan antara kolom (Column) dan baris (Row) pada Excel disebut...", options: ["Table", "Box", "Cell (Sel)", "Range"], answer: 2 },
  { q: "Kumpulan dari beberapa Cell pada Excel (misal blok dari A1 sampai C3) disebut...", options: ["Row", "Column", "Sheet", "Range"], answer: 3 },
  { q: "Setiap penulisan rumus fungsi di Microsoft Excel harus selalu diawali dengan tanda...", options: ["+", "-", "=", ":"], answer: 2 },
  { q: "Rumus Excel yang digunakan untuk menjumlahkan total sekumpulan angka adalah...", options: ["=AVERAGE", "=SUM", "=MAX", "=MIN"], answer: 1 },
  { q: "Rumus Excel yang digunakan untuk mencari nilai rata-rata adalah...", options: ["=TOTAL", "=COUNT", "=SUM", "=AVERAGE"], answer: 3 },
  { q: "Rumus Excel yang digunakan untuk mencari nilai tertinggi (terbesar) adalah...", options: ["=HIGH", "=TOP", "=MAX", "=MIN"], answer: 2 },
  { q: "Rumus Excel yang digunakan untuk mencari nilai terendah (terkecil) adalah...", options: ["=LOW", "=MAX", "=MIN", "=BOTTOM"], answer: 2 },
  { q: "Fungsi/rumus logika pada Excel yang bisa menghasilkan nilai Benar (True) atau Salah (False) adalah fungsi...", options: ["=IF", "=VLOOKUP", "=COUNT", "=SUM"], answer: 0 },
  { q: "Lembar kerja utama dalam sebuah file Microsoft Excel disebut dengan...", options: ["Slide", "Document", "Worksheet", "Page"], answer: 2 },
  { q: "Satu lembar kerja presentasi di dalam Microsoft PowerPoint disebut...", options: ["Page", "Sheet", "Slide", "Panel"], answer: 2 },
  { q: "Efek animasi pergerakan ketika berpindah dari satu slide ke slide lainnya di PPT disebut...", options: ["Animation", "Transition", "Design", "Effect"], answer: 1 },
  { q: "Tombol fungsi di keyboard yang digunakan untuk memulai Slide Show dari slide pertama adalah...", options: ["F1", "F3", "F5", "F12"], answer: 2 },
  { q: "Tombol yang ditekan untuk keluar dari mode layar penuh (Slide Show) pada presentasi adalah...", options: ["Enter", "Space", "Shift", "Esc"], answer: 3 },
  { q: "Jika kita ingin menambahkan gambar ke dalam slide presentasi, kita memilih menu...", options: ["Home -> Picture", "Insert -> Pictures", "Design -> Image", "View -> Photo"], answer: 1 },
  { q: "Pada Word, fitur untuk membuat daftar berurut menggunakan angka/huruf (1, 2, 3...) disebut...", options: ["Bullets", "Numbering", "Multilevel", "Sorting"], answer: 1 },
  { q: "Aplikasi Office online gratis buatan Google yang setara dengan Microsoft Excel adalah...", options: ["Google Docs", "Google Slides", "Google Drive", "Google Sheets"], answer: 3 },

  // ==========================================
  // KATEGORI 5: BERPIKIR KOMPUTASIONAL & CODING (30 Soal)
  // ==========================================
  { q: "Langkah-langkah logis dan sistematis yang disusun untuk menyelesaikan suatu masalah disebut...", options: ["Algoritma", "Coding", "Program", "Jaringan"], answer: 0 },
  { q: "Cara penulisan algoritma menggunakan bagan atau bentuk-bentuk geometri disebut...", options: ["Grafik", "Flowchart", "Tabel", "Bagan Struktur"], answer: 1 },
  { q: "Cara berpikir memecahkan masalah layaknya seorang ilmuwan komputer disebut...", options: ["Computational Thinking", "Critical Thinking", "Design Thinking", "Creative Thinking"], answer: 0 },
  { q: "Dalam berpikir komputasional, memecah masalah besar yang kompleks menjadi bagian-bagian kecil yang lebih mudah dikerjakan disebut...", options: ["Pengenalan Pola", "Dekomposisi", "Abstraksi", "Algoritma"], answer: 1 },
  { q: "Mengabaikan detail-detail yang tidak penting dan hanya fokus pada informasi utama dari suatu masalah disebut...", options: ["Dekomposisi", "Pengenalan Pola", "Abstraksi", "Evaluasi"], answer: 2 },
  { q: "Mencari persamaan atau perbedaan dari berbagai masalah/data (mencari trend/keteraturan) disebut...", options: ["Dekomposisi", "Pengenalan Pola", "Abstraksi", "Algoritma"], answer: 1 },
  { q: "Tahapan menuliskan kode program (menerjemahkan algoritma ke bahasa pemrograman) disebut...", options: ["Testing", "Coding", "Debugging", "Designing"], answer: 1 },
  { q: "Orang yang pekerjaannya menulis kode/merancang perangkat lunak komputer disebut...", options: ["Hacker", "Gamer", "Programmer", "Animator"], answer: 2 },
  { q: "Dalam flowchart, simbol berbentuk 'Oval/Elips' digunakan untuk...", options: ["Input/Output data", "Proses perhitungan", "Kondisi/Pilihan", "Mulai (Start) dan Selesai (End)"], answer: 3 },
  { q: "Dalam flowchart, simbol berbentuk 'Jajar Genjang' melambangkan...", options: ["Proses", "Keputusan/Kondisi", "Mulai/Selesai", "Input / Output"], answer: 3 },
  { q: "Dalam flowchart, simbol berbentuk 'Persegi Panjang' melambangkan...", options: ["Proses/Aksi", "Input/Output", "Keputusan", "Start"], answer: 0 },
  { q: "Dalam flowchart, simbol berbentuk 'Belah Ketupat (Diamond)' melambangkan...", options: ["Mulai", "Proses", "Keputusan / Percabangan", "Tamat"], answer: 2 },
  { q: "Bahasa pemrograman visual yang menggunakan blok-blok puzzle (drag-and-drop), sangat cocok untuk pemula/anak-anak adalah...", options: ["Python", "C++", "Scratch", "Java"], answer: 2 },
  { q: "Kesalahan, cacat, atau kegagalan pada suatu program komputer yang membuatnya tidak berfungsi dengan benar disebut...", options: ["Virus", "Bug", "Spam", "Lag"], answer: 1 },
  { q: "Proses mencari dan memperbaiki kesalahan/bug di dalam sebuah kode program disebut...", options: ["Coding", "Compiling", "Debugging", "Executing"], answer: 2 },
  { q: "Tempat atau wadah di memori komputer yang digunakan untuk menyimpan suatu nilai/data sementara di dalam program disebut...", options: ["Fungsi", "Looping", "Variabel", "Operator"], answer: 2 },
  { q: "Tipe data yang hanya menyimpan nilai kebenaran: True (Benar) atau False (Salah) disebut...", options: ["Integer", "String", "Boolean", "Float"], answer: 2 },
  { q: "Tipe data yang digunakan untuk menyimpan teks (kumpulan huruf/karakter) adalah...", options: ["Integer", "String", "Float", "Boolean"], answer: 1 },
  { q: "Tipe data yang digunakan untuk menyimpan bilangan bulat (tanpa koma/desimal) adalah...", options: ["String", "Float", "Char", "Integer"], answer: 3 },
  { q: "Proses berulang (mengulang suatu blok kode selama kondisi terpenuhi) dalam pemrograman disebut...", options: ["Looping (Perulangan)", "Branching (Percabangan)", "Variable", "Array"], answer: 0 },
  { q: "Struktur logika yang memilih jalan/kode mana yang dieksekusi berdasarkan suatu kondisi (If-Else) disebut...", options: ["Looping", "Percabangan (Branching)", "Sequence", "Input"], answer: 1 },
  { q: "Cara penulisan algoritma yang menyerupai bahasa pemrograman sesungguhnya (tapi bukan sintaks baku) agar mudah dipahami manusia disebut...", options: ["Flowchart", "Pseudocode", "Source Code", "Machine Code"], answer: 1 },
  { q: "Operator matematika dalam pemrograman yang digunakan untuk operasi perkalian adalah simbol...", options: ["x", ":", "* (Bintang)", "/ (Garis miring)"], answer: 2 },
  { q: "Program atau alat yang menerjemahkan seluruh bahasa pemrograman manusia menjadi bahasa mesin sekaligus adalah...", options: ["Compiler", "Editor", "Debugger", "Browser"], answer: 0 },
  { q: "Bahasa tingkat sangat rendah (low-level language) yang hanya terdiri dari angka 0 dan 1 disebut...", options: ["Bahasa Assembly", "Bahasa Mesin (Biner)", "Bahasa Python", "Bahasa Inggris"], answer: 1 },
  { q: "Bahasa pemrograman populer yang sangat identik dengan kecerdasan buatan (AI) dan sintaksnya sangat sederhana adalah...", options: ["HTML", "C++", "Java", "Python"], answer: 3 },
  { q: "Bahasa markup standar yang digunakan untuk membuat struktur halaman web di internet adalah...", options: ["CSS", "PHP", "JavaScript", "HTML"], answer: 3 },
  { q: "Perangkat lunak yang digunakan sebagai tempat programmer mengetikkan baris-baris kode (seperti VS Code, Sublime) disebut...", options: ["Text Editor / IDE", "Web Browser", "Terminal", "Spreadsheet"], answer: 0 },
  { q: "Berikut ini yang BUKAN merupakan bahasa pemrograman adalah...", options: ["Python", "Java", "C++", "Microsoft Word"], answer: 3 },
  { q: "Operator logika yang mengharuskan KEDUA kondisi bernilai BENAR agar hasilnya BENAR adalah...", options: ["OR", "NOT", "AND", "XOR"], answer: 2 },

  // ==========================================
  // KATEGORI 6: KEAMANAN, SOSMED & ETIKA (30 Soal)
  // ==========================================
  { q: "Tindakan kejahatan memanipulasi atau menipu orang untuk mencuri password/data dengan membuat web/email palsu disebut...", options: ["Bullying", "Phishing", "Browsing", "Spamming"], answer: 1 },
  { q: "Berita atau informasi palsu yang sengaja disebarkan di internet untuk menipu dan meresahkan disebut...", options: ["Fakta", "Hoaks (Hoax)", "Phishing", "Spam"], answer: 1 },
  { q: "Istilah untuk sampah digital, yaitu pesan/email promosi berantai yang dikirim secara massal tanpa kita kehendaki adalah...", options: ["Virus", "Bug", "Spam", "Scam"], answer: 2 },
  { q: "Tindakan perundungan, pengejekan, atau pelecehan yang dilakukan melalui media sosial/internet disebut...", options: ["Cyberstalking", "Cyberbullying", "Phishing", "Hacking"], answer: 1 },
  { q: "Kumpulan rekaman aktivitas, postingan, dan riwayat kunjungan kita yang tertinggal permanen di internet disebut...", options: ["Jejak Kaki", "Jejak Digital (Digital Footprint)", "Cookie", "History Log"], answer: 1 },
  { q: "Berikut ini ciri-ciri password yang KUAT dan aman, kecuali...", options: ["Terdiri dari huruf besar & kecil", "Mengandung angka & simbol", "Panjangnya lebih dari 8 karakter", "Menggunakan tanggal lahir sendiri"], answer: 3 },
  { q: "Kode sandi rahasia satu kali pakai yang dikirimkan via SMS/WhatsApp untuk memverifikasi login disebut...", options: ["PIN", "Password", "OTP (One Time Password)", "Barcode"], answer: 2 },
  { q: "Fitur keamanan berlapis dimana kita butuh password DAN kode OTP untuk login disebut...", options: ["Antivirus", "2FA (Two-Factor Authentication)", "Incognito Mode", "Firewall"], answer: 1 },
  { q: "Tindakan mengambil karya, tulisan, atau gambar orang lain di internet dan mengakuinya sebagai karya sendiri disebut...", options: ["Modifikasi", "Inspirasi", "Plagiarisme", "Kutipan"], answer: 2 },
  { q: "Etika atau tata krama saat berkomunikasi di dunia maya (internet) disebut...", options: ["Manners", "Etiquette", "Netiquette (Netizen Etiquette)", "Rules"], answer: 2 },
  { q: "Mengubah teks asli menjadi kode rahasia yang tidak dapat dibaca orang lain demi keamanan data disebut...", options: ["Deskripsi", "Enkripsi", "Ekstraksi", "Kompresi"], answer: 1 },
  { q: "Seseorang yang memiliki keahlian komputer dan secara ilegal meretas masuk sistem untuk merusak/mencuri data (jahat) disebut...", options: ["White Hat Hacker", "Cracker / Black Hat Hacker", "Programmer", "Admin Server"], answer: 1 },
  { q: "Program jahat yang menyandera/mengunci file komputer korban dan meminta tebusan uang untuk membukanya disebut...", options: ["Ransomware", "Adware", "Trojan", "Worm"], answer: 0 },
  { q: "Malware yang menyamar sebagai program aplikasi asli/berguna padahal di dalamnya terdapat kode jahat disebut...", options: ["Trojan Horse", "Worm", "Spyware", "Ransomware"], answer: 0 },
  { q: "Program jahat yang merekam setiap tombol keyboard yang diketik pengguna untuk mencuri password disebut...", options: ["Adware", "Keylogger", "Worm", "Botnet"], answer: 1 },
  { q: "Sistem keamanan pada jaringan (biasanya berupa software/hardware) yang berfungsi memblokir akses ilegal disebut...", options: ["Antivirus", "Router", "Firewall", "Web Server"], answer: 2 },
  { q: "UU di Indonesia yang mengatur tentang informasi dan transaksi elektronik serta tindak pidana siber adalah...", options: ["UU HAM", "UU ITE", "UU Hak Cipta", "UU Lalu Lintas"], answer: 1 },
  { q: "Sikap yang BENAR saat menerima berita provokatif di grup WhatsApp yang belum jelas kebenarannya adalah...", options: ["Langsung bagikan (forward) ke grup lain", "Balas dengan marah-marah", "Cari tahu kebenarannya (Saring sebelum Sharing)", "Percaya 100% pada berita tersebut"], answer: 2 },
  { q: "Istilah untuk pengguna internet atau warga dunia maya adalah...", options: ["Citizen", "Netizen", "Gamer", "Surfer"], answer: 1 },
  { q: "Hak eksklusif bagi pencipta untuk mengizinkan/melarang orang lain menggunakan karya ciptaannya disebut...", options: ["Hak Paten", "Hak Merek", "Hak Cipta (Copyright)", "Hak Guna"], answer: 2 },
  { q: "Situs web media sosial populer untuk berbagi video berdurasi pendek yang berasal dari Tiongkok adalah...", options: ["Twitter", "Instagram", "TikTok", "Facebook"], answer: 2 },
  { q: "Platform media sosial profesional yang digunakan untuk mencari pekerjaan dan membangun relasi karir adalah...", options: ["Snapchat", "LinkedIn", "Pinterest", "WhatsApp"], answer: 1 },
  { q: "Fitur untuk menjelajahi internet tanpa menyimpan riwayat browsing, cookies, dan data situs di browser disebut...", options: ["Safe Mode", "Airplane Mode", "Incognito Mode / Private Window", "Dark Mode"], answer: 2 },
  { q: "Istilah untuk penipuan finansial secara online, misal penjual palsu yang kabur setelah dibayar disebut...", options: ["Phishing", "Scamming (Scam)", "Spamming", "Hacking"], answer: 1 },
  { q: "Sebutan untuk foto atau video asli yang dimanipulasi dengan AI sehingga tampak seperti tokoh asli yang mengatakan sesuatu yang tidak pernah ia katakan adalah...", options: ["Photoshop", "Deepfake", "Filter", "CGI"], answer: 1 },
  { q: "Kegiatan membongkar/menyebarkan informasi pribadi seseorang (KTP, alamat, nomor HP) di internet tanpa izin untuk tujuan intimidasi disebut...", options: ["Phishing", "Stalking", "Doxing", "Spamming"], answer: 2 },
  { q: "Jenis serangan siber yang mengirimkan lalu lintas palsu dalam jumlah sangat besar agar sebuah website lumpuh/down disebut...", options: ["DDoS Attack", "SQL Injection", "Man-in-the-Middle", "Ransomware"], answer: 0 },
  { q: "Apabila kita menggunakan Wi-Fi publik tanpa password (di kafe/bandara), risiko keamanan yang paling mungkin terjadi adalah...", options: ["Komputer meledak", "Pencurian data/penyadapan oleh orang di jaringan yang sama", "Layar monitor berkedip", "Kecepatan internet menjadi sangat cepat"], answer: 1 },
  { q: "Tindakan yang sebaiknya dilakukan jika tiba-tiba menerima SMS yang memenangkan hadiah undian ratusan juta rupiah beserta link web tidak dikenal adalah...", options: ["Segera klik link tersebut untuk klaim", "Kirimkan nomor rekening bank", "Telepon nomor pengirim", "Abaikan dan hapus SMS tersebut karena itu penipuan (Scam/Phishing)"], answer: 3 },
  { q: "Pengaturan pada akun media sosial agar foto profil dan postingan kita HANYA bisa dilihat oleh teman yang disetujui disebut...", options: ["Public", "Private Account", "Business Account", "Verified Account"], answer: 1 }
];

export default function App() {
  // --- STATES GAME ---
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [scoreMerah, setScoreMerah] = useState(0);
  const [scoreBiru, setScoreBiru] = useState(0);
  
  const [answerMerah, setAnswerMerah] = useState(null);
  const [answerBiru, setAnswerBiru] = useState(null);
  const [answerOrder, setAnswerOrder] = useState([]); // STATE BARU: Melacak urutan pemain yang menjawab
  
  const [historyMerah, setHistoryMerah] = useState([]); // STATE BARU: Track riwayat jawaban Merah
  const [historyBiru, setHistoryBiru] = useState([]);   // STATE BARU: Track riwayat jawaban Biru
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false); // STATE BARU: Konfirmasi kembali ke menu

  // --- REFS (Mencegah Double-Tap / Sentuhan Multi-Jari Secara Instan) ---
  const lockMerah = useRef(false);
  const lockBiru = useRef(false);

  // --- STATES PENGATURAN (SETTINGS) ---
  const [settingQuestionCount, setSettingQuestionCount] = useState(15);
  const [settingTimeLimit, setSettingTimeLimit] = useState(15);

  // --- GAME LOGIC ---
  const startGame = () => {
    // Mengacak bank soal
    let shuffledBank = [...QUESTION_BANK];
    for (let i = shuffledBank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBank[i], shuffledBank[j]] = [shuffledBank[j], shuffledBank[i]];
    }

    // Pastikan tidak mengambil lebih dari jumlah soal yang tersedia
    const maxQuestions = Math.min(settingQuestionCount, shuffledBank.length);

    setQuestions(shuffledBank.slice(0, maxQuestions));
    setCurrentQuestionIndex(0);
    setScoreMerah(0);
    setScoreBiru(0);
    setAnswerMerah(null);
    setAnswerBiru(null);
    setAnswerOrder([]); // RESET URUTAN
    lockMerah.current = false;
    lockBiru.current = false;
    setHistoryMerah([]); // RESET HISTORY
    setHistoryBiru([]);  // RESET HISTORY
    setTimeLeft(settingTimeLimit);
    setIsTransitioning(false);
    setShowQuitModal(false); // Tutup modal jika sebelumnya terbuka
    setGameState('playing');
  };

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswerMerah(null);
      setAnswerBiru(null);
      setAnswerOrder([]); // RESET URUTAN
      lockMerah.current = false;
      lockBiru.current = false;
      setTimeLeft(settingTimeLimit);
      setIsTransitioning(false);
    } else {
      setGameState('finished');
    }
  }, [currentQuestionIndex, questions.length, settingTimeLimit]);

  // Fungsi Evaluasi: Dijalankan ketika KEDUANYA sudah menjawab, ATAU waktu habis
  const evaluateAnswers = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const correctAns = questions[currentQuestionIndex].answer;

    // --- REKAM HISTORY MERAH ---
    const statusMerah = answerMerah === null ? 'miss' : (answerMerah === correctAns ? 'correct' : 'wrong');
    setHistoryMerah(prev => {
      const newHist = [...prev];
      newHist[currentQuestionIndex] = statusMerah;
      return newHist;
    });

    // Evaluasi Merah
    if (answerMerah !== null) {
      if (answerMerah === correctAns) {
        // Cek apakah merah yang menjawab pertama kali
        const points = answerOrder[0] === 'merah' ? 15 : 10;
        setScoreMerah(s => s + points);
      } else {
        setScoreMerah(s => Math.max(0, s - 5));
      }
    }

    // --- REKAM HISTORY BIRU ---
    const statusBiru = answerBiru === null ? 'miss' : (answerBiru === correctAns ? 'correct' : 'wrong');
    setHistoryBiru(prev => {
      const newHist = [...prev];
      newHist[currentQuestionIndex] = statusBiru;
      return newHist;
    });

    // Evaluasi Biru
    if (answerBiru !== null) {
      if (answerBiru === correctAns) {
        // Cek apakah biru yang menjawab pertama kali
        const points = answerOrder[0] === 'biru' ? 15 : 10;
        setScoreBiru(s => s + points);
      } else {
        setScoreBiru(s => Math.max(0, s - 5));
      }
    }

  }, [isTransitioning, questions, currentQuestionIndex, answerMerah, answerBiru, answerOrder]);

  // Handle Input Pemain: Menyimpan jawaban tanpa langsung mengevaluasi
  const handlePlayerInput = useCallback((player, selectedOption) => {
    if (isTransitioning) return; // Abaikan input jika sedang masa transisi antar soal

    if (player === 'merah' && !lockMerah.current) {
      lockMerah.current = true; // Kunci seketika! Cegah sentuhan beruntun dalam milidetik yang sama
      setAnswerMerah(selectedOption);
      setAnswerOrder(prev => [...prev, 'merah']);
    } else if (player === 'biru' && !lockBiru.current) {
      lockBiru.current = true; // Kunci seketika!
      setAnswerBiru(selectedOption);
      setAnswerOrder(prev => [...prev, 'biru']);
    }
  }, [isTransitioning]);

  // --- EFFECT: CEK JIKA KEDUA PEMAIN SUDAH MENJAWAB ---
  useEffect(() => {
    if (answerMerah !== null && answerBiru !== null && !isTransitioning) {
      evaluateAnswers(); // Langsung evaluasi tanpa menunggu timer habis
    }
  }, [answerMerah, answerBiru, isTransitioning, evaluateAnswers]);

  // --- EFFECT: TIMER ---
  useEffect(() => {
    // Timer otomatis berhenti jika sedang transisi ATAU pop-up konfirmasi keluar muncul
    if (gameState !== 'playing' || isTransitioning || showQuitModal) return;

    if (timeLeft <= 0) {
      evaluateAnswers(); // Waktu habis, evaluasi jawaban siapapun yang sudah masuk
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isTransitioning, timeLeft, evaluateAnswers]);


  // --- RENDER HELPERS ---
  const currentQ = questions[currentQuestionIndex];

  // ==========================================
  // VIEW: MAIN MENU
  // ==========================================
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <button 
          onClick={() => setShowHelpModal(true)}
          className="absolute top-4 right-4 z-40 bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 sm:px-4 rounded-full shadow-lg transition-colors border border-slate-700 flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm hidden sm:block">Cara Bermain</span>
        </button>

        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
          <MonitorPlay className="w-20 h-20 text-blue-500 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-wide">QUIZ INFORMATIKA <span className="text-blue-500">1v1</span></h1>
          <p className="text-slate-400 mb-6">Adu Cepat & Tepat! (Multiplayer Lokal)</p>
          
          <div className="bg-slate-900/60 p-5 rounded-xl mb-8 border border-slate-700/50 text-left shadow-inner">
            <h3 className="text-slate-200 font-bold flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <Settings className="w-4 h-4 text-slate-400" />
              Pengaturan Permainan
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Jumlah Soal per Ronde:
                </label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20, 30].map(num => (
                    <button
                      key={num}
                      onClick={() => setSettingQuestionCount(num)}
                      className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${settingQuestionCount === num ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Waktu per Soal (Detik):
                </label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20, 30].map(time => (
                    <button
                      key={time}
                      onClick={() => setSettingTimeLimit(time)}
                      className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${settingTimeLimit === time ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'}`}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition duration-200 flex items-center justify-center gap-3 text-lg group"
          >
            <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            Mulai Permainan
          </button>
        </div>

        {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      </div>
    );
  }

  // ==========================================
  // VIEW: GAME FINISHED
  // ==========================================
  if (gameState === 'finished') {
    const isMerahWin = scoreMerah > scoreBiru;
    const isBiruWin = scoreBiru > scoreMerah;
    const isDraw = scoreMerah === scoreBiru;

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center animate-in zoom-in">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-2">Permainan Selesai!</h1>
          
          <div className="flex justify-center items-center gap-8 my-10">
            <div className={`p-6 rounded-xl border-2 ${isMerahWin ? 'bg-red-900/40 border-red-500 scale-110' : 'bg-slate-800/50 border-slate-700'} transition-transform`}>
              <h2 className="text-xl font-bold text-red-400 mb-2">MERAH</h2>
              <p className="text-5xl font-black text-white">{scoreMerah}</p>
            </div>
            
            <div className="text-3xl font-bold text-slate-500">VS</div>
            
            <div className={`p-6 rounded-xl border-2 ${isBiruWin ? 'bg-blue-900/40 border-blue-500 scale-110' : 'bg-slate-800/50 border-slate-700'} transition-transform`}>
              <h2 className="text-xl font-bold text-blue-400 mb-2">BIRU</h2>
              <p className="text-5xl font-black text-white">{scoreBiru}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-yellow-400 mb-8">
            {isDraw ? "HASIL SERI!" : `PEMENANG: PEMAIN ${isMerahWin ? 'MERAH' : 'BIRU'}!`}
          </h3>

          <div className="flex justify-center gap-4">
            <button onClick={() => setGameState('menu')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition flex items-center gap-2">
              <Home className="w-5 h-5" /> Menu Utama
            </button>
            <button onClick={startGame} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Main Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: PLAYING
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-slate-200">
      
      {/* Header Info */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-start z-10 shadow-md">
        
        {/* Papan Skor & Status Merah */}
        <div className="flex flex-col gap-2 w-36 md:w-56">
          <div className="bg-red-950/50 border border-red-900 px-4 py-2 rounded-lg flex items-center justify-between shadow-inner">
            <span className="font-bold text-red-400 text-sm md:text-base">MERAH</span>
            <span className="text-xl md:text-2xl font-black text-white">{scoreMerah}</span>
          </div>
          
          {/* TRACKER PENALTI MERAH */}
          <div className="flex flex-wrap gap-1 mt-1 justify-start">
            {questions.map((_, idx) => {
              const status = historyMerah[idx];
              let bgColor = "bg-slate-800 border border-slate-700/50"; // Default (Belum)
              if (status === 'correct') bgColor = "bg-emerald-500 border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
              else if (status === 'wrong' || status === 'miss') bgColor = "bg-red-500 border border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.5)]";
              
              return (
                <div 
                  key={`track-merah-${idx}`} 
                  className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ${bgColor} transition-colors duration-300`}
                  title={`Soal ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Status Indikator Menjawab */}
          <div className="h-6">
            {answerMerah !== null && !isTransitioning && (
              <div className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-400 text-xs font-bold py-1 px-2 rounded flex items-center justify-center gap-1 animate-pulse shadow-sm">
                <CheckCircle2 className="w-3 h-3" /> Sudah Menjawab
              </div>
            )}
          </div>
        </div>

        {/* Info Timer & Soal */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-1">
            <button 
              onClick={() => setShowQuitModal(true)} 
              className="text-slate-500 hover:text-red-400 transition" 
              title="Kembali ke Menu"
            >
              <Home className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-slate-400">Soal {currentQuestionIndex + 1}/{questions.length}</span>
            <div className="w-5"></div> {/* Spacer kosong agar teks tetap di tengah */}
          </div>
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xl font-bold border shadow-inner ${timeLeft <= 5 ? 'bg-red-950 border-red-900 text-red-400 animate-pulse' : 'bg-slate-950 border-slate-800 text-blue-400'}`}>
            <Clock className="w-5 h-5" />
            {timeLeft}s
          </div>
        </div>

        {/* Papan Skor & Status Biru */}
        <div className="flex flex-col gap-2 w-36 md:w-56">
          <div className="bg-blue-950/50 border border-blue-900 px-4 py-2 rounded-lg flex items-center justify-between shadow-inner">
            <span className="text-xl md:text-2xl font-black text-white">{scoreBiru}</span>
            <span className="font-bold text-blue-400 text-sm md:text-base">BIRU</span>
          </div>
          
          {/* TRACKER PENALTI BIRU */}
          <div className="flex flex-wrap gap-1 mt-1 justify-end">
            {questions.map((_, idx) => {
              const status = historyBiru[idx];
              let bgColor = "bg-slate-800 border border-slate-700/50"; // Default (Belum)
              if (status === 'correct') bgColor = "bg-emerald-500 border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
              else if (status === 'wrong' || status === 'miss') bgColor = "bg-red-500 border border-red-400 shadow-[0_0_8px_rgba(220,38,38,0.5)]";
              
              return (
                <div 
                  key={`track-biru-${idx}`} 
                  className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ${bgColor} transition-colors duration-300`}
                  title={`Soal ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Status Indikator Menjawab */}
          <div className="h-6">
            {answerBiru !== null && !isTransitioning && (
              <div className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-400 text-xs font-bold py-1 px-2 rounded flex items-center justify-center gap-1 animate-pulse shadow-sm">
                <CheckCircle2 className="w-3 h-3" /> Sudah Menjawab
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content: Question & Options */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-10 max-w-4xl leading-relaxed">
          {currentQ.q}
        </h2>

        {/* --- LAYOUT SPLIT BARU: AREA MERAH & AREA BIRU --- */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 md:gap-12">
          
          {/* AREA MERAH */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-red-500 text-center mb-2 uppercase tracking-widest border-b border-red-900/50 pb-2">Area Merah</h3>
            
            {/* NOTIFIKASI STATUS MERAH */}
            {isTransitioning && (
              <div className="animate-in zoom-in duration-300">
                {answerMerah === null ? (
                  <div className="flex items-center justify-center py-3 bg-slate-800/50 rounded-xl text-slate-500 font-bold border border-slate-700/50">
                    WAKTU HABIS
                  </div>
                ) : answerMerah === currentQ.answer ? (
                  <div className="flex items-center justify-center gap-2 py-3 bg-emerald-950/80 rounded-xl text-emerald-400 font-black border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-6 h-6" /> BENAR! (+{answerOrder[0] === 'merah' ? 15 : 10} Poin)
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 bg-red-950/80 rounded-xl text-red-400 font-black border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    <XCircle className="w-6 h-6" /> SALAH! (-5 Poin)
                  </div>
                )}
              </div>
            )}

            {currentQ.options.map((opt, idx) => {
              const isCorrectAnswer = isTransitioning && idx === currentQ.answer;
              const isSelected = answerMerah === idx;
              
              let boxColor = "bg-slate-800 border-slate-700 text-slate-200";
              if (isTransitioning) {
                if (isCorrectAnswer) boxColor = "bg-emerald-900/80 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                else if (isSelected) boxColor = "bg-red-900/80 border-red-500 text-red-100 opacity-60";
                else boxColor = "bg-slate-800/40 border-slate-700/40 text-slate-500 opacity-30";
              } else {
                if (isSelected) boxColor = "bg-red-900/30 border-red-500/30 text-slate-100";
                else boxColor += " hover:bg-slate-700 hover:border-slate-600";
              }

              return (
                <div 
                  key={`merah-${idx}`} 
                  onPointerDown={() => handlePlayerInput('merah', idx)}
                  className={`relative p-4 md:p-5 rounded-xl border-2 transition-all duration-300 ${boxColor} flex items-center min-h-[4rem] touch-none select-none ${answerMerah === null && !isTransitioning ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : 'cursor-default'}`}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-slate-900 text-slate-400 font-bold text-xs px-3 py-1.5 rounded shadow-inner">
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  <p className="text-sm md:text-base font-medium ml-12 pr-10">{opt}</p>
                  
                  {isSelected && (
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full ${isTransitioning ? 'bg-red-500' : 'bg-red-500/20 border border-red-500/50'} flex items-center justify-center shadow-lg animate-in zoom-in`}>
                      {isTransitioning ? (isCorrectAnswer ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />) : <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-red-300" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Garis Pemisah Tengah (Hanya di Desktop) */}
          <div className="hidden md:flex w-px bg-slate-700/50"></div>

          {/* AREA BIRU */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-blue-500 text-center mb-2 uppercase tracking-widest border-b border-blue-900/50 pb-2">Area Biru</h3>
            
            {/* NOTIFIKASI STATUS BIRU */}
            {isTransitioning && (
              <div className="animate-in zoom-in duration-300">
                {answerBiru === null ? (
                  <div className="flex items-center justify-center py-3 bg-slate-800/50 rounded-xl text-slate-500 font-bold border border-slate-700/50">
                    WAKTU HABIS
                  </div>
                ) : answerBiru === currentQ.answer ? (
                  <div className="flex items-center justify-center gap-2 py-3 bg-emerald-950/80 rounded-xl text-emerald-400 font-black border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-6 h-6" /> BENAR! (+{answerOrder[0] === 'biru' ? 15 : 10} Poin)
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 bg-red-950/80 rounded-xl text-red-400 font-black border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    <XCircle className="w-6 h-6" /> SALAH! (-5 Poin)
                  </div>
                )}
              </div>
            )}

            {currentQ.options.map((opt, idx) => {
              const isCorrectAnswer = isTransitioning && idx === currentQ.answer;
              const isSelected = answerBiru === idx;
              
              let boxColor = "bg-slate-800 border-slate-700 text-slate-200";
              if (isTransitioning) {
                if (isCorrectAnswer) boxColor = "bg-emerald-900/80 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                else if (isSelected) boxColor = "bg-blue-900/80 border-blue-500 text-blue-100 opacity-60";
                else boxColor = "bg-slate-800/40 border-slate-700/40 text-slate-500 opacity-30";
              } else {
                if (isSelected) boxColor = "bg-blue-900/30 border-blue-500/30 text-slate-100";
                else boxColor += " hover:bg-slate-700 hover:border-slate-600";
              }

              return (
                <div 
                  key={`biru-${idx}`} 
                  onPointerDown={() => handlePlayerInput('biru', idx)}
                  className={`relative p-4 md:p-5 rounded-xl border-2 transition-all duration-300 ${boxColor} flex items-center min-h-[4rem] touch-none select-none ${answerBiru === null && !isTransitioning ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : 'cursor-default'}`}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-slate-900 text-slate-400 font-bold text-xs px-3 py-1.5 rounded shadow-inner">
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  <p className="text-sm md:text-base font-medium ml-12 pr-10">{opt}</p>
                  
                  {isSelected && (
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full ${isTransitioning ? 'bg-blue-500' : 'bg-blue-500/20 border border-blue-500/50'} flex items-center justify-center shadow-lg animate-in zoom-in`}>
                      {isTransitioning ? (isCorrectAnswer ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />) : <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* TOMBOL LANJUT (Muncul hanya setelah evaluasi nilai) */}
        {isTransitioning && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4">
            <button
              onClick={nextQuestion}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-3 text-lg border-2 border-emerald-400 animate-bounce"
            >
              Lanjut Soal Berikutnya <Play className="w-5 h-5 fill-current" />
            </button>
          </div>
        )}
      </main>

      {/* Footer Info Baru */}
      <footer className="bg-slate-950 p-3 border-t border-slate-800 z-10 flex justify-center text-center px-6 relative">
         <div className="text-slate-400 font-semibold text-xs md:text-sm animate-pulse">
           ⚡ Adu Cepat! Jawaban Benar Pertama: <span className="text-emerald-400">+15 Poin</span> | Benar Kedua: <span className="text-emerald-400">+10 Poin</span> | Salah: <span className="text-red-400">-5 Poin</span> ⚡
         </div>
      </footer>

      {/* MODAL KONFIRMASI KELUAR */}
      {showQuitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center animate-in zoom-in duration-200 shadow-2xl">
            <Home className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Kembali ke Menu?</h3>
            <p className="text-slate-400 text-sm mb-6">Permainan yang sedang berlangsung akan dihentikan dan progres skor akan hilang.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowQuitModal(false)} 
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition"
              >
                Batal
              </button>
              <button 
                onClick={() => { setShowQuitModal(false); setGameState('menu'); }} 
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENT: HELP MODAL
// ==========================================
function HelpModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col my-auto relative animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-800 p-5 rounded-t-2xl flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" /> Aturan & Cara Bermain
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 text-slate-300 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" /> Tujuan Permainan</h3>
            <p className="text-sm leading-relaxed">
              Kuis ini adalah permainan adu cepat 1 lawan 1 menggunakan sentuhan/klik. Dua pemain saling berlomba menjawab pertanyaan dengan menekan pilihan pada areanya masing-masing. <strong className="text-white">Sistem akan menunggu kedua pemain menjawab atau waktu habis sebelum membuka kunci jawaban.</strong>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <h4 className="font-bold text-red-400 mb-2">🔴 Pemain Merah (Kiri)</h4>
              <p className="text-xs">Sentuh / Klik langsung pada kotak jawaban di area kiri layar.</p>
            </div>
            <div className="bg-blue-950/30 border border-blue-900/50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <h4 className="font-bold text-blue-400 mb-2">🔵 Pemain Biru (Kanan)</h4>
              <p className="text-xs">Sentuh / Klik langsung pada kotak jawaban di area kanan layar.</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Star className="w-5 h-5 text-emerald-400" /> Sistem Poin (Adu Cepat)</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Menjawab <strong>Benar (Pertama)</strong>: <strong className="text-emerald-400">+15 Poin</strong>.</li>
              <li>Menjawab <strong>Benar (Kedua)</strong>: <strong className="text-emerald-400">+10 Poin</strong>.</li>
              <li>Jawaban <strong>Salah</strong>: <strong className="text-red-400">-5 Poin</strong>.</li>
            </ul>
          </div>
        </div>
        <div className="p-5 border-t border-slate-800 bg-slate-800/50 rounded-b-2xl">
          <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2">
            <Play className="w-5 h-5 fill-current" /> Saya Mengerti, Tutup Penjelasan!
          </button>
        </div>
      </div>
    </div>
  );
}