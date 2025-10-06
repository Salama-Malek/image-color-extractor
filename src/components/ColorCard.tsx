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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(15,23,42,0.45)]">
      <div className="flex h-28 items-center justify-center" style={{ backgroundColor: hex }} />
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-mono text-sm tracking-wide text-slate-100">{hex}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:border-indigo-400/60 hover:bg-indigo-500/20"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default ColorCard;