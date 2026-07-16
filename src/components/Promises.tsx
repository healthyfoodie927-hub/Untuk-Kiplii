import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HeartHandshake, Gift, Heart, Sparkles } from 'lucide-react';
import { PromiseItem } from '../types';

export default function Promises() {
  const [activePromise, setActivePromise] = useState<string | null>(null);

  const promises: PromiseItem[] = [
    {
      id: 'p1',
      title: 'Lebih Ngertiin',
      emoji: '🥺',
      description: 'Haris janji bakal dengerin semua keluh kesah Malio, lebih perhatian sama mood kamu, dan selalu ada buat kamu dalam kondisi apa pun.'
    },
    {
      id: 'p2',
      title: 'Lebih Hati-Hati',
      emoji: '🌸',
      description: 'Haris bakal mikir dua kali sebelum bersikap biar gak bikin hati Malio sedih atau tersinggung lagi. Aku sayang Malio selamanya.'
    },
    {
      id: 'p3',
      title: 'Tebusan Spesial',
      emoji: '🎁',
      description: 'Aku bener-bener minta maaf sekali lagi yaa sayang... Aku nyesel banget udah bikin kamu sedih atau kesel, dan aku janji bakal terus berusaha jadi pacar yang lebih baik lagi buat kamu ke depannya. 🥺💙'
    },
    {
      id: 'p4',
      title: 'Sabar Menghadapi',
      emoji: '🤝',
      description: 'Nggak bakal ikut-ikutan egois. Haris janji bakal berusaha jadi penenang pas Malio lagi capek, pusing, atau kesel.'
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-sky-800 flex items-center justify-center gap-2 mb-4 font-sans">
        <HeartHandshake className="h-5 w-5 text-sky-500 animate-pulse" />
        Janji Tulus Haris buat Malio:
      </h3>
      <p className="text-xs text-sky-600/80 text-center mb-6 max-w-sm mx-auto">
        Klik kartu di bawah ini untuk melihat apa yang bakal Haris lakuin buat nebus kesalahan yaa! 💙
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {promises.map((promise) => (
          <button
            key={promise.id}
            id={`btn-promise-${promise.id}`}
            onClick={() => setActivePromise(activePromise === promise.id ? null : promise.id)}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden select-none active:scale-98 ${
              activePromise === promise.id
                ? 'bg-sky-500 border-sky-400 text-white shadow-md shadow-sky-100'
                : 'bg-white/80 backdrop-blur-xs border-sky-100 hover:border-sky-200 text-sky-900 hover:bg-sky-50/50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">{promise.emoji}</span>
              <Sparkles className={`h-4 w-4 ${activePromise === promise.id ? 'text-white' : 'text-sky-300'}`} />
            </div>
            <h4 className="font-bold text-sm tracking-wide">{promise.title}</h4>
            <span className={`text-[10px] block mt-1 ${activePromise === promise.id ? 'text-sky-100' : 'text-sky-500'}`}>
              {activePromise === promise.id ? 'Ketuk untuk menutup' : 'Klik detail →'}
            </span>
          </button>
        ))}
      </div>

      <div className="h-28 mt-4 relative max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {activePromise ? (
            <motion.div
              key={activePromise}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-sky-50 border border-sky-100 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-inner"
            >
              <Heart className="h-5 w-5 text-sky-500 mb-1 animate-bounce" fill="currentColor" />
              <p className="text-xs text-sky-900 leading-relaxed font-medium">
                {promises.find((p) => p.id === activePromise)?.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border border-dashed border-sky-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center text-sky-400/80"
            >
              <ShieldCheck className="h-6 w-6 mb-1 text-sky-300" />
              <span className="text-xs">Klik salah satu kartu janji di atas</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
