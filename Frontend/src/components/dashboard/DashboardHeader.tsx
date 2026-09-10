import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onCreateNew: () => void;
  songCount: number;
}

export default function DashboardHeader({ onCreateNew, songCount }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8 border-b border-zinc-800/50">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Projects</h1>
        <p className="text-sm text-zinc-500 mt-1">{songCount} tracks in the lab</p>
      </div>

      {/* Desktop Primary Button (Hidden on Mobile in favor of a FAB) */}
      <button
        onClick={onCreateNew}
        className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>New Track</span>
      </button>
    </header>
  );
}