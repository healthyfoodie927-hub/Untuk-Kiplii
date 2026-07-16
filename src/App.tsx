import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Mail, 
  ChevronRight, 
  RefreshCw, 
  CheckCircle, 
  Send,
  User,
  Coffee,
  Smile,
  Music
} from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import AudioPlayer from './components/AudioPlayer';
import ApologyLetter from './components/ApologyLetter';
import LoveMeter from './components/LoveMeter';
import Promises from './components/Promises';
import { AppStage } from './types';

export default function App() {
  const [stage, setStage] = useState<AppStage>('intro');
  const [musicTriggered, setMusicTriggered] = useState(false);
  const [letterFinished, setLetterFinished] = useState(false);
  const [forgivenessPercent, setForgivenessPercent] = useState(0);
  
  // States for the playful "Nggak" button
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [noBtnText, setNoBtnText] = useState('Nggak! 😜');

  // Trigger audio on any first button interaction
  const triggerMusic = () => {
    setMusicTriggered(true);
  };

  const handleOpenEnvelope = () => {
    triggerMusic();
    setStage('envelope');
  };

  const handleBreakSeal = () => {
    setStage('letter');
  };

  const handleNoHoverOrClick = () => {
    // Generate a random position for the button to teleport
    const randomX = (Math.random() - 0.5) * 200; // -100px to 100px
    const randomY = (Math.random() - 0.5) * 150; // -75px to 75px
    setNoBtnPos({ x: randomX, y: randomY });

    const newCount = noCount + 1;
    setNoCount(newCount);

    // Cute Indonesian dynamic texts when Malio tries to click "Nggak"
    const texts = [
      'Nggak! 😜',
      'Yakin nggak mau? 🥺',
      'Masa tega sih... 😭',
      'Nanti kangen lho! ☹️',
      'Satu kesempatan aja? 🙏',
      'Pliss maafin... 💙',
      'Gak bisa diklik wlee! 😜',
      'Harus dimaafin! 🥰'
    ];
    
    if (newCount < texts.length) {
      setNoBtnText(texts[newCount]);
    } else {
      setNoBtnText('Harus dimaafin! 🥰');
    }
  };

  const handleForgive = () => {
    setStage('success');
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      "Harisss! Aku udah baca surat spesialnya dan udah aku maafin kok! 🥰💙 Aku kangen juga, ayo kita ngobrol dan ketawa bareng lagi! 🤍🫶🏻"
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleTelegramRedirect = () => {
    const message = encodeURIComponent(
      "Harisss! Aku udah baca surat spesialnya dan udah aku maafin kok! 🥰💙 Aku kangen juga, ayo kita ngobrol dan ketawa bareng lagi! 🤍🫶🏻"
    );
    window.open(`https://t.me/share/url?url=&text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-sky-50 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Floating Hearts in background */}
      <FloatingHearts />

      {/* Persistent Audio Player component */}
      <AudioPlayer autoPlayTriggered={musicTriggered} />

      {/* Decorative Floating Clouds and sparkles */}
      <div className="absolute top-10 left-10 w-28 h-10 bg-white/40 rounded-full blur-md pointer-events-none animate-pulse" />
      <div className="absolute top-24 right-12 w-36 h-12 bg-white/30 rounded-full blur-lg pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 left-16 w-32 h-10 bg-white/40 rounded-full blur-md pointer-events-none" />

      <main className="w-full max-w-lg z-20 flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: INTRO PORTAL */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-sky-100 shadow-xl max-w-sm w-full mx-auto"
            >
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-sky-200 rounded-full blur-md opacity-60 animate-ping" />
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center border border-sky-200 relative">
                  <User className="h-7 w-7 text-sky-500" />
                  <Heart className="h-4 w-4 text-sky-500 fill-sky-400 absolute -bottom-1 -right-1 animate-bounce" />
                </div>
              </div>

              <h1 className="text-xl font-extrabold text-sky-800 tracking-tight font-sans mb-2">
                Halo Sayang... 🥺💙
              </h1>
              <p className="text-xs text-sky-600/95 leading-relaxed font-semibold mb-6">
                Haris punya pesan penting dan tulus banget yang dikirim khusus buat pacar terbaik sedunia, <strong className="text-sky-700">Malio</strong>. Buka sekarang ya?
              </p>

              <button
                onClick={handleOpenEnvelope}
                id="btn-open-letter"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-sky-100 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Buka Surat Dari Haris 💌</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* STAGE 2: ENVELOPE STAGE */}
          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center w-full max-w-sm mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-sky-100 shadow-xl flex flex-col items-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -1, 1, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-sky-50 rounded-2xl border border-sky-100 shadow-inner flex items-center justify-center cursor-pointer hover:bg-sky-100/50 transition-colors group mb-6 relative"
                  onClick={handleBreakSeal}
                >
                  <Mail className="h-16 w-16 text-sky-400 group-hover:scale-105 transition-transform" />
                  
                  {/* Wax Seal Heart */}
                  <div className="absolute bottom-6 bg-sky-500 hover:bg-sky-600 border-2 border-white rounded-full p-2 shadow-md animate-pulse">
                    <Heart className="h-5 w-5 text-white fill-white" />
                  </div>
                </motion.div>

                <h2 className="text-base font-bold text-sky-800 mb-2">
                  Pesan Tersimpan Aman!
                </h2>
                <p className="text-xs text-sky-600/90 leading-relaxed font-semibold mb-6 max-w-[240px]">
                  Sentuh segel hati di atas untuk membuka surat cinta dan permintaan maaf dari Haris 🥺💙
                </p>

                <button
                  onClick={handleBreakSeal}
                  id="btn-break-seal"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-sky-100"
                >
                  Buka Segel Surat
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: APOLOGY LETTER & DECISION */}
          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full space-y-6"
            >
              {!letterFinished ? (
                <ApologyLetter onLetterFinished={() => setLetterFinished(true)} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Part 1: Promises */}
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-sky-100">
                    <Promises />
                  </div>

                  {/* Part 2: Interactive Love Meter */}
                  <LoveMeter onForgivenessProgress={setForgivenessPercent} />

                  {/* Part 3: Decision Box */}
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-sky-100 text-center space-y-4">
                    <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center border border-sky-100 mx-auto">
                      <Heart className="h-5 w-5 text-sky-500 animate-pulse" fill="currentColor" />
                    </div>
                    
                    <h2 className="text-base font-extrabold text-sky-800 font-sans">
                      Gimana Malio sayang... Maafin Haris ya? 🥺💙
                    </h2>
                    
                    <p className="text-[11px] text-sky-600 max-w-xs mx-auto">
                      Haris beneran nyesel dan kangen banget ketawa bareng kamu lagi. Sentuh tombol di bawah ini yaa!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2 relative min-h-[60px]">
                      {/* YES BUTTON */}
                      <button
                        onClick={handleForgive}
                        id="btn-yes-forgive"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-emerald-100 hover:shadow-emerald-200 transition-all active:scale-95 text-sm z-30 flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                      >
                        <span>Iya, dimaafin! 🥰💙</span>
                      </button>

                      {/* PLAYFUL NO BUTTON */}
                      {noCount < 8 && (
                        <motion.button
                          id="btn-no-forgive"
                          onMouseEnter={handleNoHoverOrClick}
                          onClick={handleNoHoverOrClick}
                          animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-2.5 px-6 rounded-full text-xs border border-gray-200 transition-all cursor-pointer w-full sm:w-auto"
                        >
                          {noBtnText}
                        </motion.button>
                      )}
                    </div>
                    
                    {noCount >= 3 && (
                      <p className="text-[10px] text-sky-500/80 italic font-semibold">
                        Tuh kan, tombol &quot;Nggak&quot;-nya ngambek juga gak mau diklik! Harus dimaafin berarti! 😜✨
                      </p>
                    )}
                  </div>

                  {/* Reset view capability */}
                  <button
                    onClick={() => setLetterFinished(false)}
                    className="mx-auto flex items-center gap-1 text-[11px] text-sky-500 hover:text-sky-600 font-bold bg-white/50 hover:bg-white/80 py-1.5 px-3.5 rounded-full border border-sky-100 transition-all"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Baca Ulang Surat
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STAGE 4: CELEBRATION SUCCESS STAGE */}
          {stage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center w-full max-w-md mx-auto space-y-6"
            >
              {/* Confetti celebration card */}
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-xl space-y-5 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-400" />
                
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 mx-auto relative">
                  <CheckCircle className="h-8 w-8 text-emerald-500 animate-pulse" />
                  <Sparkles className="h-4 w-4 text-emerald-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <h1 className="text-xl font-black text-sky-800 tracking-wide font-sans">
                  YAAAY! DAMAI! 🥰🎉💙
                </h1>
                
                <p className="text-xs text-sky-600 font-medium leading-relaxed max-w-xs mx-auto">
                  Makasih banyak ya sayangku <strong className="text-sky-700">Malio</strong> udah maafin Haris. Haris janji bakal beneran jaga perasaan kamu dan jadi pacar yang lebih baik lagi. 🤍
                </p>

                {/* VIRTUAL RECONCILIATION VOUCHER */}
                <div className="bg-sky-50/80 rounded-2xl p-4 border border-dashed border-sky-200 text-left space-y-3 relative overflow-hidden shadow-inner">
                  <div className="absolute right-[-10px] top-[-10px] w-12 h-12 bg-sky-100 rounded-full blur-xs opacity-50" />
                  <div className="absolute left-[-10px] bottom-[-10px] w-12 h-12 bg-sky-100 rounded-full blur-xs opacity-50" />
                  
                  <div className="flex justify-between items-center border-b border-sky-100 pb-2">
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest font-mono">
                      VOUCHER RESMI BAIKAN
                    </span>
                    <Heart className="h-4 w-4 text-sky-500 fill-sky-400" />
                  </div>

                  <h3 className="text-xs font-black text-sky-800 tracking-wide text-center py-1">
                    🎁 VOUCHER PELUK & MANJA SEPUASNYA 🤗
                  </h3>

                  <div className="text-[11px] text-sky-900/95 space-y-1 font-sans">
                    <p><strong>Untuk:</strong> Malio cowok paling disayang sedunia</p>
                    <p><strong>Dari:</strong> Haris yang paling sayang kamu</p>
                    <p className="text-[10px] text-sky-500 pt-1 leading-relaxed border-t border-sky-100/50 mt-1 italic font-medium">
                      * Voucher ini berlaku seumur hidup dan bisa ditukarkan kapan saja dengan pelukan hangat, telfonan berjam-jam, atau bermanja-manja bareng! 📞🤍
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-sky-500/90 font-semibold italic">
                  Silakan screenshot voucher ini dan kirim ke Haris yaa! 😉
                </p>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleTelegramRedirect}
                    id="btn-send-tg"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Kirim Bukti ke Telegram Haris ✈️
                  </button>

                  <button
                    onClick={() => {
                      setStage('intro');
                      setLetterFinished(false);
                      setNoCount(0);
                    }}
                    className="w-full text-[11px] text-sky-500 hover:text-sky-600 font-bold py-1.5 transition-all hover:underline"
                  >
                    Mulai dari Awal
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer credits following design rules without larping status labels */}
      <footer className="mt-8 text-[11px] text-sky-500/75 select-none text-center font-semibold">
        Dibuat penuh kasih sayang oleh Haris untuk Malio 🤍
      </footer>
    </div>
  );
}
