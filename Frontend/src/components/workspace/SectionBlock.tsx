import { X, GripVertical } from 'lucide-react';
import type { Section } from '../../types';

interface SectionBlockProps {
  section: Section;
  onContentChange: (content: string) => void;
  onRemove: () => void;
}

export default function SectionBlock({ section, onContentChange, onRemove }: SectionBlockProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-700 transition-colors group relative shadow-sm">
      {/* Section Header (The "Tape Label") */}
      <div className="flex items-center justify-between bg-zinc-950/50 px-3 py-2 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab active:cursor-grabbing hover:text-zinc-400 transition-colors" />
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            {section.type}
          </span>
        </div>

        <button
          onClick={onRemove}
          className="text-zinc-600 hover:text-rose-600 transition-colors p-1 rounded-md hover:bg-zinc-800/50"
          aria-label="Remove section"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lyric Text Area */}
      <textarea
        value={section.content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={`Write your ${section.type.toLowerCase()} here...`}
        className="w-full bg-transparent text-zinc-300 placeholder:text-zinc-700 p-4 min-h-30 resize-y border-none focus:outline-none focus:ring-0 text-base md:text-lg leading-relaxed"
        spellCheck="false"
      />
    </div>
  );
}