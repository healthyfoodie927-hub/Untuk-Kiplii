import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Heart, Sparkles, Quote } from 'lucide-react';

interface ApologyLetterProps {
  onLetterFinished: () => void;
}

export default function ApologyLetter({ onLetterFinished }: ApologyLetterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paragraphs = [
    {
      title: "Sayangku Malio... 🥺💙",
      content: "sayangg... maaf yaa. 🥺🤍\n\naku dari tadi kepikiran terus. rasanya nggak tenang karena tau kamu lagi kesel sama aku. maaf yaa kalau sikap aku yang bikin hati kamu nggak enak. aku beneran nggak bermaksud kayak gitu. itu murni emang kesalahan aku sayang:(",
      emoji: "🥺",
      highlight: "Aku kepikiran terus... :("
    },
    {
      title: "Sepi Tanpa Kamu... ☹️",
      content: "aku cuma nggak suka kalau kita lagi begini. rasanya sepi banget kalau kamu diem. aku jadi kangen chat kamu, kangen kamu yang suka usil, kangen semuanya. ☹️",
      emoji: "☹️",
      highlight: "Kangen diusilin kamu..."
    },
    {
      title: "Satu Kesempatan Lagi? 🙏",
      content: "please jangan marah lama-lama yaa. kasih aku kesempatan buat nebus kesalahanku. aku janji bakal berusaha jadi lebih baik, lebih ngertiin kamu, dan lebih hati-hati lagi. aku nggak mau kehilangan kamu cuma karena kesalahanku sendiri.",
      emoji: "🤝",
      highlight: "Aku janji bakal berusaha jadi lebih baik..."
    },
    {
      title: "I Love You So Much, Malio 🤍",
      content: "jadi... maafin aku yaa? 🥺 nanti kalau udah baikan, aku mau ngobrol sama kamu lagi, ketawa bareng lagi, dan gangguin cowok paling disayang sedunia lagi. jangan ngambek terus yaa, aku sayang banget sama kamuuu. 🤍🫶🏻",
      emoji: "🫶🏻",
      highlight: "Jangan ngambek terus ya sayang..."
    }
  ];

  const handleNext = () => {
    if (currentIndex < paragraphs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onLetterFinished();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-sky-100 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
      {/* Background soft textures */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100 rounded-full blur-2xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-sky-100/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 font-bold border border-sky-100 text-xs">
            {currentIndex + 1}/{paragraphs.length}
          </div>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider font-sans">
            Lembar Surat
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4 text-sky-400 fill-sky-200 animate-pulse" />
          <span className="text-[10px] font-bold text-sky-400 font-sans">Dari Haris</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{paragraphs[currentIndex].emoji}</span>
              <h2 className="text-lg font-bold text-sky-800 font-sans tracking-wide">
                {paragraphs[currentIndex].title}
              </h2>
            </div>

            <div className="relative mb-4 bg-sky-50/40 p-4 rounded-2xl border border-sky-50 min-h-[160px] flex items-center">
              <Quote className="absolute top-2 left-2 h-7 w-7 text-sky-200 opacity-40 transform rotate-180" />
              <p className="text-sm text-sky-900 leading-relaxed font-sans whitespace-pre-wrap pl-4 pr-2 font-medium">
                {paragraphs[currentIndex].content}
              </p>
            </div>

            {paragraphs[currentIndex].highlight && (
              <div className="mt-auto inline-flex items-center gap-1.5 bg-sky-50 border border-sky-100/50 px-3 py-1.5 rounded-full text-[11px] text-sky-700 font-bold self-start animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                <span>{paragraphs[currentIndex].highlight}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-sky-100/80">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          id="btn-prev-page"
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition-all select-none ${
            currentIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700 active:scale-95'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </button>

        <div className="flex gap-1">
          {paragraphs.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-sky-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          id="btn-next-page"
          className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full text-xs font-bold transition-all hover:shadow-md hover:shadow-sky-100 active:scale-95 select-none"
        >
          {currentIndex === paragraphs.length - 1 ? 'Selesai Membaca 💙' : 'Selanjutnya'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
