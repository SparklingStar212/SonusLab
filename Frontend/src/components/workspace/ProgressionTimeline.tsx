import { useState } from 'react';
import { X, GripHorizontal } from 'lucide-react';
import type { Chord } from '../../types';

interface ProgressionTimelineProps {
  chords: Chord[];
  onRemoveChord: (index: number) => void;
  onReorderChords: (reorderedChords: Chord[]) => void;
  activeIndex: number | null;
}

export default function ProgressionTimeline({ chords, onRemoveChord, onReorderChords, activeIndex }: ProgressionTimelineProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault(); // Required to allow drop

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newChords = [...chords];
    const [draggedItem] = newChords.splice(draggedIndex, 1); // Remove from old spot
    newChords.splice(dropIndex, 0, draggedItem); // Insert at new spot

    // Update the order properties so the backend stays perfectly synced
    const reorderedChords = newChords.map((chord, i) => ({ ...chord, order: i }));
    onReorderChords(reorderedChords);
    setDraggedIndex(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Progression Timeline</h3>
        <span className="text-xs text-zinc-600 font-medium">
          {chords.length > 0 ? `${chords.length} blocks` : 'Empty'}
        </span>
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-4 min-h-35 flex items-center overflow-x-auto shadow-inner [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {chords.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-zinc-500 space-y-2 h-full">
            <div className="w-16 h-16 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center mb-2">
              <span className="text-2xl text-zinc-700">+</span>
            </div>
            <p className="text-sm font-medium">No chords in this progression yet.</p>
            <p className="text-xs">Tap chords from the palette above to start building.</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {chords.map((chord, index) => (
              <div
                key={chord._id || `chord-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`group relative shrink-0 w-24 h-28 border rounded-xl flex flex-col items-center justify-center transition-all shadow-sm cursor-grab active:cursor-grabbing
              ${draggedIndex === index ? 'opacity-40' : 'opacity-100'} 
              ${activeIndex === index
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/50 scale-105 z-10' // Active playing glow
                    : 'bg-zinc-900 border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800' // Normal state
                  }
            `}
              >
                <div className="absolute top-2 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripHorizontal className="w-4 h-4 text-zinc-600" />
                </div>

                <span className="text-2xl font-bold text-zinc-100">
                  {chord.root}<span className="text-base font-medium">{chord.quality}</span>
                </span>

                <button
                  onClick={() => onRemoveChord(index)}
                  className="absolute -top-2 -right-2 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-rose-500 hover:border-rose-500 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <div className="w-2 shrink-0"></div>
          </div>
        )}
      </div>
    </div>
  );
}