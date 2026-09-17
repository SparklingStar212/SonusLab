import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkspaceHeader from '../components/workspace/WorkspaceHeader';
import SectionBoard from '../components/workspace/SectionBoard';
import type { Song, Section, Chord } from '../types';
import { api } from '../services/api';
import ChordPalette from '../components/workspace/ChordPalette';
import ProgressionTimeline from '../components/workspace/ProgressionTimeline';
import StudioTransport from '../components/workspace/StudioTransport';

export default function Workspace() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Store the timeout ID so we can cancel it if the user keeps typing
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getSong(id)
      .then(fetchedSong => {
        // Fallback for older V1 saves that lack the progression array
        setSong({
          ...fetchedSong,
          progression: fetchedSong.progression || []
        });
      })
      .catch(err => console.error("Failed to load tape:", err));
  }, [id]);

  const handleUpdateSong = (updatedFields: Partial<Song>) => {
    if (!song) return;

    // 1. Optimistic UI Update
    const updatedSong = { ...song, ...updatedFields };
    setSong(updatedSong);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        // Create a clean copy of the payload
        const payloadToSave = { ...updatedFields };

        // If sections are being updated, strip out any fake UUIDs before sending to MongoDB
        if (payloadToSave.sections) {
          payloadToSave.sections = payloadToSave.sections.map(section => {
            // If the _id is not a 24-character hex string (MongoDB format), remove it
            if (section._id && section._id.length !== 24) {
              const { _id, ...cleanSection } = section;
              return cleanSection;
            }
            return section;
          });
        }

        await api.updateSong(updatedSong._id, payloadToSave);
      } catch (err) {
        console.error('Save failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  const handleDeleteSong = async () => {
    if (!song) return;

    // Safety check
    if (window.confirm('Are you sure you want to delete this track? This cannot be undone.')) {
      try {
        await api.deleteSong(song._id);
        navigate('/'); // Kick them back to the dashboard
      } catch (err) {
        console.error('Failed to delete:', err);
        alert('Failed to delete the track. Please try again.');
      }
    }
  };

  // 1. Add a new chord to the end of the timeline
  const handleAddChord = (chordDef: { root: string; quality: string }) => {
    if (!song) return;
    const newChord = { ...chordDef, order: song.progression.length };
    const newProgression = [...song.progression, newChord];
    handleUpdateSong({ progression: newProgression });
  };

  // 2. Remove a specific block
  const handleRemoveChord = (index: number) => {
    if (!song) return;
    const newProgression = song.progression.filter((_, i) => i !== index);
    // Re-index the order property so the backend stays perfectly synced
    const reindexed = newProgression.map((c, i) => ({ ...c, order: i }));
    handleUpdateSong({ progression: reindexed });
  };

  // 3. Update the backend when chords are dragged into a new order
  const handleReorderChords = (reorderedChords: Chord[]) => {
    handleUpdateSong({ progression: reorderedChords });
  };

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  if (!song) return <div className="h-full flex items-center justify-center text-zinc-500">Loading tape...</div>;

  return (
    <div className="min-h-full flex flex-col relative bg-zinc-950">
      <WorkspaceHeader
        song={song}
        onUpdateSong={handleUpdateSong}
        onDeleteSong={handleDeleteSong}
        isSaving={isSaving}
      />
      <main className="flex-1 p-4 md:p-8 max-w-3xl w-full mx-auto">
        <ChordPalette
          songKey={song.metadata.key}
          onAddChord={handleAddChord}
        />

        {/* The Play/Stop Controls */}
        <StudioTransport
          bpm={song.metadata.bpm}
          chords={song.progression}
          onTick={setPlayingIndex}
        />

        {/* Pass the active index to the Timeline so it can highlight */}
        <ProgressionTimeline
          chords={song.progression}
          onRemoveChord={handleRemoveChord}
          onReorderChords={handleReorderChords}
          activeIndex={playingIndex}
        />

        <SectionBoard
          sections={song.sections}
          onUpdateSections={(sections: Section[]) => handleUpdateSong({ sections })}
        />
      </main>
    </div>
  );
}