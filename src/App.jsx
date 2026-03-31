import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Trophy, Play, CheckCircle2, XCircle, Clock, Keyboard, 
  RotateCcw, MonitorPlay, Home, Star, BookOpen, X, Settings
} from 'lucide-react';

// BANK SOAL (Sebagian ditampilkan, Anda bisa menggunakan 150/180 soal yang sudah Anda miliki)
const QUESTION_BANK = [
  // --- HARDWARE ---
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
  // --- SOFTWARE ---
  { q: "Program atau aplikasi di dalam komputer yang tidak bisa diraba secara fisik disebut...", options: ["Hardware", "Software", "Brainware", "CPU"], answer: 1 },
  { q: "Manusia yang menggunakan, mengoperasikan, dan mengatur komputer disebut...", options: ["Hardware", "Software", "Brainware", "Malware"], answer: 2 },
  { q: "Fungsi utama dari sebuah Sistem Operasi (OS) pada komputer adalah...", options: ["Mengetik dokumen", "Bermain game", "Mengelola hardware & software", "Mengedit foto"], answer: 2 },
  { q: "Di bawah ini yang merupakan contoh Sistem Operasi (OS) komputer adalah...", options: ["Microsoft Office", "Windows", "Google", "Instagram"], answer: 1 },
  { q: "Sistem operasi berlogo pinguin yang bersifat gratis dan open-source adalah...", options: ["Windows", "macOS", "Linux", "Android"], answer: 2 },
  // --- JARINGAN ---
  { q: "Jaringan komputer yang hanya mencakup area satu ruangan, gedung, atau sekolah disebut...", options: ["WAN", "MAN", "LAN", "PAN"], answer: 2 },
  { q: "Jaringan komputer global yang saling terhubung mencakup seluruh dunia disebut...", options: ["LAN", "MAN", "WAN", "Internet"], answer: 3 },
  { q: "Jaringan nirkabel (tanpa kabel) sering disebut juga dengan...", options: ["Wired", "Wireless", "Fiber Optik", "LAN"], answer: 1 },
  { q: "Bentuk topologi di mana setiap komputer terhubung ke satu titik pusat (Hub/Switch) disebut...", options: ["Star", "Ring", "Bus", "Mesh"], answer: 0 },
  { q: "Kepanjangan dari Wi-Fi adalah...", options: ["Wireless Fidelity", "Wide Fire", "Wireless File", "Wide Fidelity"], answer: 0 },
  // --- OFFICE ---
  { q: "Perangkat lunak Microsoft yang fungsi utamanya untuk mengetik surat atau makalah adalah...", options: ["Microsoft Word", "Microsoft Excel", "CorelDraw", "Notepad"], answer: 0 },
  { q: "Perangkat lunak yang khusus digunakan untuk mengolah angka dan tabel adalah...", options: ["Microsoft Word", "Microsoft PowerPoint", "Microsoft Excel", "Adobe Photoshop"], answer: 2 },
  { q: "Kombinasi tombol keyboard (shortcut) untuk menyalin teks (Copy) adalah...", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"], answer: 0 },
  { q: "Kombinasi tombol untuk membatalkan perintah terakhir (Undo) adalah...", options: ["Ctrl + U", "Ctrl + Z", "Ctrl + Y", "Ctrl + A"], answer: 1 },
  { q: "Rumus Excel yang digunakan untuk menjumlahkan total sekumpulan angka adalah...", options: ["=AVERAGE", "=SUM", "=MAX", "=MIN"], answer: 1 },
  // --- BERPIKIR KOMPUTASIONAL ---
  { q: "Langkah-langkah logis dan sistematis yang disusun untuk menyelesaikan suatu masalah disebut...", options: ["Algoritma", "Coding", "Program", "Jaringan"], answer: 0 },
  { q: "Cara penulisan algoritma menggunakan bagan atau bentuk-bentuk geometri disebut...", options: ["Grafik", "Flowchart", "Tabel", "Bagan Struktur"], answer: 1 },
  { q: "Cara berpikir memecahkan masalah layaknya seorang ilmuwan komputer disebut...", options: ["Computational Thinking", "Critical Thinking", "Design Thinking", "Creative Thinking"], answer: 0 },
  { q: "Tindakan kejahatan memanipulasi atau menipu orang untuk mencuri password/data disebut...", options: ["Bullying", "Phishing", "Browsing", "Spamming"], answer: 1 },
  { q: "Berita atau informasi palsu yang sengaja disebarkan di internet untuk menipu disebut...", options: ["Fakta", "Hoaks (Hoax)", "Phishing", "Spam"], answer: 1 }
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

    // PENGHAPUSAN setTimeout: Pemain sekarang harus klik tombol "Lanjut"
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