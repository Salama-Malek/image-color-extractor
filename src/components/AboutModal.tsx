import { useEffect } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="About the developer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center text-slate-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-1 text-slate-300 transition hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
          aria-label="Close about modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
          </svg>
        </button>

        <h2 className="text-lg font-semibold tracking-[0.3em] text-indigo-300">About</h2>
        <p className="mt-4 text-sm text-slate-300">
          Built by <span className="font-medium text-white">Salama Malek</span> — Full-Stack Developer.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm font-medium">
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;