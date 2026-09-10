import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import SectionBoard from '../components/workspace/SectionBoard';
import type { Song, Section } from '../types';
import { api } from '../services/api';

export default function Workspace() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Store the timeout ID so we can cancel it if the user keeps typing
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getSong(id)
      .then(setSong)
      .catch(err => console.error("Failed to load tape:", err));
  }, [id]);

  const handleUpdateSong = (updatedFields: Partial<Song>) => {
    if (!song) return;

    // 1. Optimistic UI Update (instant response for the creator)
    const updatedSong = { ...song, ...updatedFields };
    setSong(updatedSong);

    // 2. Clear the previous timer if they are still making changes
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    // 3. Set a new timer to save after 1 second of inactivity
    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await api.updateSong(updatedSong._id, updatedFields);
      } catch (err) {
        console.error('Save failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  if (!song) return <div className="h-full flex items-center justify-center text-zinc-500">Loading tape...</div>;

  return (
    <div className="min-h-full flex flex-col relative bg-zinc-950">
      <WorkspaceHeader song={song} onUpdateSong={handleUpdateSong} isSaving={isSaving} />
      <main className="flex-1 p-4 md:p-8 max-w-3xl w-full mx-auto">
        <SectionBoard
          sections={song.sections}
          onUpdateSections={(sections: Section[]) => handleUpdateSong({ sections })}
        />
      </main>
    </div>
  );
}