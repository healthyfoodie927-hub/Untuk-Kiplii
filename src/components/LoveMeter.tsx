import React, { useState } from 'react';
import { Sparkles, Laugh, Heart } from 'lucide-react';

interface LoveMeterProps {
  onForgivenessProgress: (value: number) => void;
}

export default function LoveMeter({ onForgivenessProgress }: LoveMeterProps) {
  const [angerLevel, setAngerLevel] = useState(100);

  const getMoodConfig = (level: number) => {
    if (level > 80) {
      return {
        emoji: '😤',
        label: 'Masih kesel banget!',
        sub: 'Bujuk aku lagi, masih cemberut nih... 😡',
        color: 'from-blue-500 to-sky-400',
        textColor: 'text-blue-800'
      };
    } else if (level > 55) {
      return {
        emoji: '🥺',
        label: 'Ngambek dikit...',
        sub: 'Tapi udah kangen juga sih sebenernya 🫣',
        color: 'from-sky-400 to-sky-300',
        textColor: 'text-sky-800'
      };
    } else if (level > 30) {
      return {
        emoji: '🫣',
        label: 'Mulai luluh...',
        sub: 'Sedikit lagi dimaafin, buruan kasih es krim! 🍦',
        color: 'from-sky-300 to-cyan-200',
        textColor: 'text-sky-700'
      };
    } else if (level > 10) {
      return {
        emoji: '🤫',
        label: 'Udah senyum-senyum',
        sub: 'Siap-siap baikan dan ketawa bareng lagi! ✨',
        color: 'from-cyan-300 to-blue-200',
        textColor: 'text-sky-700'
      };
    } else {
      return {
        emoji: '🥰',
        label: 'Udah dimaafin 100%!',
        sub: 'Haris dimaafin! Ayo kangen-kangenan lagi! 🤍🫶🏻',
        color: 'from-emerald-300 via-sky-300 to-teal-300',
        textColor: 'text-emerald-800'
      };
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAngerLevel(value);
    onForgivenessProgress(100 - value); // Send forgiveness percentage up (0 to 100)
  };

  const currentMood = getMoodConfig(angerLevel);

  return (
    <div className="w-full bg-white/70 backdrop-blur-xs border border-sky-100 p-5 rounded-3xl shadow-xs max-w-md mx-auto">
      <h3 className="text-sm font-bold text-sky-800 text-center mb-3 flex items-center justify-center gap-1.5 font-sans">
        <Laugh className="h-4 w-4 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
        Seberapa ngambek Malio sekarang?
      </h3>

      <div className="flex flex-col items-center my-4">
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center border border-sky-100 text-4xl mb-3 shadow-inner relative transition-transform transform duration-300 hover:scale-110">
          <span className="animate-pulse">{currentMood.emoji}</span>
          <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full border border-sky-100">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>
        
        <span className={`text-base font-bold font-sans ${currentMood.textColor}`}>
          {currentMood.label}
        </span>
        <span className="text-[11px] text-sky-600/90 text-center mt-1 font-medium h-8 flex items-center px-4">
          {currentMood.sub}
        </span>
      </div>

      <div className="space-y-2 mt-2">
        <div className="flex justify-between text-[10px] text-sky-500 font-bold px-1">
          <span>0% Marah (Adem)</span>
          <span>100% Marah (Kesel)</span>
        </div>
        
        <input
          type="range"
          id="ranger-anger"
          min="0"
          max="100"
          value={angerLevel}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-500 outline-hidden transition-all focus:ring-2 focus:ring-sky-300"
        />
        
        <div className="w-full bg-sky-100/50 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${currentMood.color} transition-all duration-300`}
            style={{ width: `${angerLevel}%` }}
          />
        </div>
      </div>
    </div>
  );
}
