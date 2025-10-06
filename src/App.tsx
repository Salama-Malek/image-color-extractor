import ColorPalette from './components/ColorPalette';
import UploadArea from './components/UploadArea';
import { useColorExtraction } from './hooks/useColorExtraction';

const App = () => {
  const { colors, imageSrc, isProcessing, error, processFile } = useColorExtraction({ colorCount: 8 });

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 pt-16">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-400">Image Color Extractor</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100 sm:text-4xl">Instantly build palettes from your photos</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-400">
            Upload any image to discover its most dominant colors. Perfect for quick palette inspiration and creative projects.
          </p>
        </header>

        <UploadArea onFileSelect={processFile} isProcessing={isProcessing} />

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p>
        )}

        {imageSrc && (
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl">
            <h2 className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Preview</h2>
            <div className="overflow-hidden rounded-xl">
              <img src={imageSrc} alt="Uploaded preview" className="h-full w-full object-cover" />
            </div>
          </div>
        )}

        <ColorPalette colors={colors} />
      </div>
    </div>
  );
};

export default App;