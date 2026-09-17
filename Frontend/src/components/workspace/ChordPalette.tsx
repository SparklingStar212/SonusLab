import { Play } from 'lucide-react';
import { getChordsForKey } from '../../utils/chordTheory';
import { audioEngine } from '../../services/audioEngine';

interface ChordPaletteProps {
  songKey: string;
  onAddChord: (chord: { root: string; quality: string }) => void;
}

export default function ChordPalette({ songKey, onAddChord }: ChordPaletteProps) {
  // 1. Get the smart list of chords for whatever key the user selected
  const availableChords = getChordsForKey(songKey);

  // 2. Handle tapping a chord block
  const handleChordTap = async (root: string, quality: string) => {
    // Unlock the audio context if this is their first click
    await audioEngine.init();

    // Play it out loud so they can hear what they are choosing
    audioEngine.playChord(root, quality);

    // Add it to the actual song progression
    onAddChord({ root, quality });
  };

  return (
    <div className="mb-6 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Chord Palette</h3>
        <span className="text-xs text-zinc-600 font-medium">Tap to hear & add</span>
      </div>

      {/* Modern Horizontal Scroll with CSS Mask Fade (just like the header!) */}
      <div className="relative -mx-4 md:mx-0">
        <div
          className="flex items-center gap-3 overflow-x-auto px-4 md:px-0 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          style={{ maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)' }}
        >
          {availableChords.map((chord, index) => (
            <button
              key={`${chord.root}-${chord.quality}-${index}`}
              onClick={() => handleChordTap(chord.root, chord.quality)}
              className="group relative shrink-0 flex items-center justify-center w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:bg-zinc-800 transition-all active:scale-95"
            >
              <span className="text-xl font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                {chord.root}<span className="text-sm font-medium">{chord.quality}</span>
              </span>

              {/* Subtle play icon that appears on hover */}
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 text-amber-500/70" fill="currentColor" />
              </div>
            </button>
          ))}
          {/* Extra spacing block so the last item can be scrolled fully past the fade mask */}
          <div className="w-4 shrink-0 md:hidden"></div>
        </div>
      </div>
    </div>
  );
}