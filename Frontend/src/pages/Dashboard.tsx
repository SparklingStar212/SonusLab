import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';
import type { Song } from '../types';
import { api } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await api.getSongs();
        setSongs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handleCreateNew = async () => {
    try {
      const newSong = await api.createSong();
      navigate(`/workspace/${newSong._id}`);
    } catch (error) {
      console.error("Couldn't create track:", error);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-zinc-950 relative">
      <DashboardHeader onCreateNew={handleCreateNew} songCount={songs.length} />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {isLoading ? (
          <div className="text-zinc-500 text-center mt-20">Loading lab...</div>
        ) : songs.length === 0 ? (
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

      <button
        onClick={handleCreateNew}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-amber-500 text-zinc-950 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-transform z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}