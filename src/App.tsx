import { useState } from 'react';
import UploadArea from './components/UploadArea';
import { useColorExtraction } from './hooks/useColorExtraction';
import ColorPalette from './components/ColorPalette';
import AboutModal from './components/AboutModal';

const App = () => {
  const { colors, imageSrc, isProcessing, error, processFile, reset } = useColorExtraction({ colorCount: 8 });
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const hasResults = Boolean(colors.length || imageSrc);

  const handleStartOver = () => {
    reset();
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_top,_rgba(99,102,241,0.22),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(14,165,233,0.15),_transparent_45%)]" />

      <nav className="relative z-20 border-b border-white/5 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-sm font-semibold tracking-[0.35em] text-indigo-300 sm:text-base">Image Color Extractor</span>
          <button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
            aria-label="About the developer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9zm0-5.25v-4.5m0-2.25h.008v.008H12z" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-24 pt-12 text-center sm:pt-16">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.6em] text-indigo-300/90">Palette inspiration reimagined</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Instantly craft beautiful color stories</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300/80 sm:text-base">
            Upload an image to reveal its dominant colors and build palettes that shine in your next creative project.
          </p>
        </header>

        <section className="mt-10 flex w-full flex-col items-center gap-6">
          <UploadArea onFileSelect={processFile} isProcessing={isProcessing} />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {hasResults && (
              <button
                type="button"
                onClick={handleStartOver}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-indigo-400/60 hover:bg-indigo-500/10"
              >
                Start Over
              </button>
            )}
          </div>

          {error && (
            <p className="w-full max-w-lg rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-lg">
              {error}
            </p>
          )}

          {imageSrc && (
            <div className="w-full rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-lg">
              <h2 className="mb-3 text-left text-xs uppercase tracking-[0.45em] text-slate-300/70">Preview</h2>
              <div className="overflow-hidden rounded-2xl border border-white/5">
                <img src={imageSrc} alt="Uploaded preview" className="h-full w-full object-cover" />
              </div>
            </div>
          )}

          <ColorPalette colors={colors} />
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950/60 py-6 text-center text-xs text-slate-400">
        © Salama Malek 2025
      </footer>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;