import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  emoji: string;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const emojis = ['💙', '🤍', '✨', '🥺', '🌸', '🐳'];
    const colors = [
      'text-sky-300',
      'text-blue-200',
      'text-cyan-200',
      'text-indigo-200',
      'text-white',
    ];

    const initialHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12, // 12px to 32px
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6, // 6s to 12s
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-50px] animate-float opacity-0 select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
