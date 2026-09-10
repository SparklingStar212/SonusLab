import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';
import type { Song } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);

  // Placeholder for future API fetch
  useEffect(() => {
    // Mock data to visualize the UI before wiring up the backend
    setSongs([
      {
        _id: '1',
        title: 'Midnight Thoughts',
        metadata: { genre: 'Indie Folk', mood: 'Melancholic', key: 'Am', bpm: 85 },
        sections: [{ type: 'Verse', content: '', order: 1 }],
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Electric Horizon',
        metadata: { genre: 'Synthwave', mood: 'Energetic', key: 'Fm', bpm: 125 },
        sections: [],
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]);
  }, []);

  const handleCreateNew = () => {
    // Will eventually hit POST /api/songs then navigate to the new ID
    console.log('Creating new project...');
    navigate('/workspace/new');
  };

  return (
    <div className="min-h-full flex flex-col bg-zinc-950 relative">
      <DashboardHeader onCreateNew={handleCreateNew} songCount={songs.length} />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-zinc-500 mb-4">Your lab is empty. Start your first session.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {songs.map(song => (
              <ProjectCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile-First Floating Action Button (FAB) */}
      <button
        onClick={handleCreateNew}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-amber-500 text-zinc-950 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-transform z-40"
        aria-label="Create new track"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}