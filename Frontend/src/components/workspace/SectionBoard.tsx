import { Plus } from 'lucide-react';
import SectionBlock from './SectionBlock';
import type { Section } from '../../types';

interface SectionBoardProps {
  sections: Section[];
  onUpdateSections: (sections: Section[]) => void;
}

const SECTION_TYPES: Section['type'][] = ['Verse', 'Chorus', 'Pre-Chorus', 'Bridge', 'Intro', 'Outro', 'Idea'];

export default function SectionBoard({ sections, onUpdateSections }: SectionBoardProps) {

  const handleAddSection = (type: Section['type']) => {
    const newSection: Section = {
      type,
      content: '',
      order: sections.length
    };
    onUpdateSections([...sections, newSection]);
  };

  const handleUpdateContent = (index: number, content: string) => {
    const updated = [...sections];
    updated[index].content = content;
    onUpdateSections(updated);
  };

  const handleRemoveSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    // Re-calculate order after removal
    const reordered = updated.map((sec, i) => ({ ...sec, order: i }));
    onUpdateSections(reordered);
  };

  return (
    <div className="flex flex-col gap-6 pb-24">

      {/* The Vertical Stack of Lyrics */}
      <div className="flex flex-col gap-4">
        {sections.length === 0 ? (
          <div className="h-48 border-2 border-dashed border-zinc-800/80 rounded-xl flex items-center justify-center text-zinc-600 text-sm font-medium">
            No sections added yet. Start arranging below.
          </div>
        ) : (
          sections.map((section, index) => (
            <SectionBlock
              key={section._id || index}
              section={section}
              onContentChange={(content) => handleUpdateContent(index, content)}
              onRemove={() => handleRemoveSection(index)}
            />
          ))
        )}
      </div>

      {/* Tape Dispenser: Add New Sections */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest pl-1">
          Add Building Block
        </span>
        {/* Thumb-friendly horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {SECTION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handleAddSection(type)}
              className="flex items-center gap-1.5 whitespace-nowrap bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-zinc-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              {type}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}