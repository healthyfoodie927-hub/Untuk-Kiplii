import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

class MusicBox {
  private ctx: AudioContext | null = null;
  private timer: NodeJS.Timeout | null = null;
  private currentChordIndex = 0;
  private isPlaying = false;

  private chords = [
    // C Major 7 (Dreamy, sweet, safe)
    [130.81, 196.00, 261.63, 329.63, 392.00, 493.88], // C3, G3, C4, E4, G4, B4
    // F Major 7 (Loving, longing, soft)
    [174.61, 261.63, 349.23, 440.00, 523.25, 659.25], // F3, C4, F4, A4, C5, E5
    // A Minor 7 (Tender, vulnerable, emotional)
    [110.00, 220.00, 293.66, 349.23, 440.00, 523.25], // A2, A3, D4, F4, A4, C5
    // G 6/9 (Warm resolution, positive hope)
    [146.83, 220.00, 293.66, 392.00, 493.88, 587.33]  // D3, A3, D4, G4, B4, D5
  ];

  start() {
    if (this.isPlaying) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isPlaying = true;
      this.currentChordIndex = 0;
      this.playLoop();
    } catch (e) {
      console.error("Audio Context failed to start", e);
    }
  }

  private playNote(freq: number, startTime: number, duration: number, volume: number = 0.1) {
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft sine wave for dreamy music box tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, startTime);
      filter.frequency.exponentialRampToValueAtTime(120, startTime + duration);

      // Smooth attack and long decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Error playing synth note", e);
    }
  }

  private playLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    try {
      const chord = this.chords[this.currentChordIndex];
      const now = this.ctx.currentTime;
      
      // Play arpeggiated piano/music box keys
      chord.forEach((freq, idx) => {
        const noteDelay = idx * 0.45;
        const noteDuration = 4.5 - noteDelay;
        const vol = idx >= 4 ? 0.04 : 0.08; // High notes are softer
        this.playNote(freq, now + noteDelay, noteDuration, vol);
      });

      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

      // Schedule next chord
      this.timer = setTimeout(this.playLoop, 4500);
    } catch (e) {
      console.error("Error in music loop", e);
    }
  };

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export default function AudioPlayer({ autoPlayTriggered }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicBoxRef = useRef<MusicBox | null>(null);

  useEffect(() => {
    musicBoxRef.current = new MusicBox();
    return () => {
      musicBoxRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (autoPlayTriggered && musicBoxRef.current) {
      musicBoxRef.current.start();
      setIsPlaying(true);
    }
  }, [autoPlayTriggered]);

  const togglePlayback = () => {
    if (!musicBoxRef.current) return;
    if (isPlaying) {
      musicBoxRef.current.stop();
      setIsPlaying(false);
    } else {
      musicBoxRef.current.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlayback}
        id="btn-toggle-music"
        className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg border border-sky-100 hover:border-sky-200 transition-all text-sky-600 hover:text-sky-700 font-medium active:scale-95 group"
      >
        <span className="relative flex h-3 w-3">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying ? 'bg-sky-500' : 'bg-gray-400'}`}></span>
        </span>
        
        {isPlaying ? <Volume2 className="h-4 w-4 animate-bounce" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
        
        <span className="text-xs tracking-wide">
          {isPlaying ? 'Melodi Haris' : 'Nyalakan Musik'}
        </span>
        
        {isPlaying && (
          <div className="flex gap-0.5 items-end h-3">
            <div className="w-0.5 bg-sky-500 rounded-full animate-[bounce_0.8s_infinite_0.1s]" style={{ height: '100%' }}></div>
            <div className="w-0.5 bg-sky-500 rounded-full animate-[bounce_0.8s_infinite_0.3s]" style={{ height: '60%' }}></div>
            <div className="w-0.5 bg-sky-500 rounded-full animate-[bounce_0.8s_infinite_0.5s]" style={{ height: '80%' }}></div>
          </div>
        )}
      </button>
    </div>
  );
}
