import { useState, useEffect } from 'react';
import { Music, Activity, Mic2, Disc3, CheckCircle2, CircleDashed } from 'lucide-react';
import MetadataInput from './MetadataInput';
import type { Song } from '../../types';

interface WorkspaceHeaderProps {
  song: Song;
  onUpdateSong: (updatedFields: Partial<Song>) => void;
  isSaving: boolean;
}

const MUSICAL_KEYS = ['C Maj', 'G Maj', 'D Maj', 'A Maj', 'E Maj', 'Am', 'Em', 'Bm', 'F#m', 'C#m', 'F Maj', 'Bb Maj', 'Eb Maj'];

export default function WorkspaceHeader({ song, onUpdateSong, isSaving }: WorkspaceHeaderProps) {
  const [title, setTitle] = useState(song.title);

  // Debounce title updates so we don't spam the API on every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (title !== song.title) onUpdateSong({ title });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, song.title, onUpdateSong]);

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/80 pt-4 pb-3 px-4 md:px-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Track"
          className="bg-transparent text-xl md:text-2xl font-bold text-zinc-100 placeholder:text-zinc-700 border-none focus:outline-none focus:ring-0 flex-1 truncate"
        />

        {/* Visual Save Status Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-medium shrink-0">
          {isSaving ? (
            <>
              <CircleDashed className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="text-amber-500 hidden sm:inline">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-zinc-500" />
              <span className="text-zinc-500 hidden sm:inline">Saved</span>
            </>
          )}
        </div>
      </div>

      {/* Horizontally scrollable on mobile to save vertical screen space */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <MetadataInput
          icon={<Music className="w-4 h-4" />}
          label="Key"
          type="select"
          options={MUSICAL_KEYS}
          value={song.metadata.key}
          onChange={(key) => onUpdateSong({ metadata: { ...song.metadata, key } })}
        />
        <MetadataInput
          icon={<Activity className="w-4 h-4" />}
          label="BPM"
          type="number"
          value={song.metadata.bpm}
          onChange={(bpm) => onUpdateSong({ metadata: { ...song.metadata, bpm: Number(bpm) } })}
        />
        <MetadataInput
          icon={<Disc3 className="w-4 h-4" />}
          label="Genre"
          value={song.metadata.genre}
          onChange={(genre) => onUpdateSong({ metadata: { ...song.metadata, genre } })}
        />
        <MetadataInput
          icon={<Mic2 className="w-4 h-4" />}
          label="Mood"
          value={song.metadata.mood}
          onChange={(mood) => onUpdateSong({ metadata: { ...song.metadata, mood } })}
        />
      </div>
    </header>
  );
}