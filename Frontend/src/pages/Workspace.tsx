import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import SectionBoard from '../components/workspace/SectionBoard';
import type { Song, Section } from '../types';

export default function Workspace() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mock fetch
  useEffect(() => {
    setSong({
      _id: id || 'new',
      title: 'Midnight Thoughts',
      metadata: { genre: 'Indie Folk', mood: 'Melancholic', key: 'Am', bpm: 85 },
      sections: [
        { _id: 's1', type: 'Verse', content: 'The streetlights flicker in the rain\nAnother night I\'m awake again', order: 0 }
      ],
      updatedAt: new Date().toISOString()
    });
  }, [id]);

  const handleUpdateSong = (updatedFields: Partial<Song>) => {
    if (!song) return;
    setIsSaving(true);
    setSong({ ...song, ...updatedFields });

    setTimeout(() => {
      setIsSaving(false);
      console.log('Saved to DB:', updatedFields);
    }, 800);
  };

  const handleUpdateSections = (sections: Section[]) => {
    handleUpdateSong({ sections });
  };

  if (!song) return <div className="h-full flex items-center justify-center text-zinc-500">Loading tape...</div>;

  return (
    <div className="min-h-full flex flex-col relative bg-zinc-950">
      <WorkspaceHeader song={song} onUpdateSong={handleUpdateSong} isSaving={isSaving} />

      <main className="flex-1 p-4 md:p-8 max-w-3xl w-full mx-auto">
        <SectionBoard
          sections={song.sections}
          onUpdateSections={handleUpdateSections}
        />
      </main>
    </div>
  );
}