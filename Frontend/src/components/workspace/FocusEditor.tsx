import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface FocusEditorProps {
  type: string;
  initialContent: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

export default function FocusEditor({ type, initialContent, onSave, onClose }: FocusEditorProps) {
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea when the mode opens and place cursor at the end
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, []);

  const handleSaveAndClose = () => {
    onSave(content);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 bg-zinc-950 flex flex-col animate-in fade-in duration-200">
      {/* Minimalist Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
        <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
          Focus Mode: {type}
        </span>
        <button
          onClick={handleSaveAndClose}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2 rounded-full transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Done</span>
        </button>
      </header>

      {/* Expansive Writing Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-6 md:p-12">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write your ${type.toLowerCase()} here...`}
          className="w-full h-full bg-transparent text-zinc-200 placeholder:text-zinc-700 resize-none border-none focus:outline-none focus:ring-0 text-xl md:text-3xl leading-relaxed md:leading-loose font-medium"
          spellCheck="false"
        />
      </main>
    </div>
  );
}