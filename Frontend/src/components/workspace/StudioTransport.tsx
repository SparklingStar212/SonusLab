import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import type { Chord } from '../../types';

interface StudioTransportProps {
  chords: Chord[];
  bpm: number;
}

export default function StudioTransport({ chords, bpm }: StudioTransportProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Safety cleanup: stop audio if the user leaves the page
  useEffect(() => {
    return () => audioEngine.stop();
  }, []);

  const togglePlayback = async () => {
    if (chords.length === 0) return;

    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      await audioEngine.playProgression(chords, bpm);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-lg mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayback}
          disabled={chords.length === 0}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${isPlaying
              ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
              : 'bg-zinc-100 text-zinc-950 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-zinc-100'
            }`}
        >
          {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        </button>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-200">
            {isPlaying ? 'Playing Loop' : 'Studio Transport'}
          </span>
          <span className="text-xs text-zinc-500">
            {bpm} BPM • {chords.length} Bars
          </span>
        </div>
      </div>
    </div>
  );
}