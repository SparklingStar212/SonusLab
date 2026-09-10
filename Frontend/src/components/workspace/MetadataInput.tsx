// import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

interface MetadataInputProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'select';
  options?: string[]; // For dropdowns like Key
}

export default function MetadataInput({ icon, label, value, onChange, type = 'text', options }: MetadataInputProps) {
  const baseClasses = "bg-transparent border-none text-zinc-300 text-sm focus:ring-0 p-0 w-full font-medium placeholder:text-zinc-600 focus:outline-none";

  return (
    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 focus-within:border-zinc-600 transition-colors shrink-0">
      <div className="text-zinc-500">{icon}</div>
      <div className="flex flex-col flex-1 min-w-15">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold leading-none mb-1">{label}</span>
        {type === 'select' && options ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseClasses} appearance-none cursor-pointer`}
          >
            {options.map(opt => <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>)}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClasses}
            placeholder={`Set ${label}...`}
          />
        )}
      </div>
    </div>
  );
}