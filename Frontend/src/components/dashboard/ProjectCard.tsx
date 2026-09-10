import { Link } from 'react-router-dom';
import { Clock, Music2, ChevronRight } from 'lucide-react';
import type { Song } from '../../types';

interface ProjectCardProps {
  song: Song;
}

export default function ProjectCard({ song }: ProjectCardProps) {
  // Format date like "Sep 10, 2026"
  const formattedDate = new Date(song.updatedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Link
      to={`/workspace/${song._id}`}
      className="block bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-zinc-100 font-medium text-lg truncate pr-6">{song.title}</h3>
        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-500 absolute right-4 top-4 transition-colors" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-400 font-medium">
          {song.metadata.key || 'C Maj'}
        </span>
        <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-400 font-medium">
          {song.metadata.bpm || 120} BPM
        </span>
        {song.metadata.genre && (
          <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-400 font-medium">
            {song.metadata.genre}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-zinc-500 text-xs mt-2 border-t border-zinc-800/50 pt-3">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Music2 className="w-3.5 h-3.5" />
          <span>{song.sections?.length || 0} sections</span>
        </div>
      </div>
    </Link>
  );
}