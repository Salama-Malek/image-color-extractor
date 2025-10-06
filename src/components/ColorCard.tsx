import { useState } from 'react';

interface ColorCardProps {
  hex: string;
}

const ColorCard = ({ hex }: ColorCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg transition-transform duration-200 hover:-translate-y-1">
      <div className="flex h-24 items-center justify-center" style={{ backgroundColor: hex }} />
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-sm text-slate-200">{hex}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:bg-indigo-500/80 hover:text-white"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default ColorCard;