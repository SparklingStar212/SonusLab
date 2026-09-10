import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import type { Song } from '../types';

export default function Workspace() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mock fetching the song data
  useEffect(() => {
    // Simulate API load
    setSong({
      _id: id || 'new',
      title: 'Midnight Thoughts',
      metadata: { genre: 'Indie Folk', mood: 'Melancholic', key: 'Am', bpm: 85 },
      sections: [],
      updatedAt: new Date().toISOString()
    });
  }, [id]);

  const handleUpdateSong = (updatedFields: Partial<Song>) => {
    if (!song) return;

    setIsSaving(true);
    // Optimistic UI update
    setSong({ ...song, ...updatedFields });

    // Mock API save delay
    setTimeout(() => {
      setIsSaving(false);
      console.log('Saved to DB:', updatedFields);
    }, 800);
  };

  if (!song) {
    return <div className="h-full flex items-center justify-center text-zinc-500">Loading tape...</div>;
  }

  return (
    <div className="min-h-full flex flex-col relative bg-zinc-950">
      <WorkspaceHeader
        song={song}
        onUpdateSong={handleUpdateSong}
        isSaving={isSaving}
      />

      <main className="flex-1 p-4 md:p-8 max-w-3xl w-full mx-auto flex flex-col gap-4">
        {/* Step 7: The Modular Section Board will go here */}
        <div className="h-64 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600">
          Section Board Canvas
        </div>
      </main>
    </div>
  );
}