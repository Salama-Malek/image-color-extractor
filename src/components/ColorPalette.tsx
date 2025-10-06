import ColorCard from './ColorCard';

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette = ({ colors }: ColorPaletteProps) => {
  if (!colors.length) {
    return null;
  }

  return (
    <section className="w-full">
      <h2 className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Palette</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {colors.map((color) => (
          <ColorCard key={color} hex={color} />
        ))}
      </div>
    </section>
  );
};

export default ColorPalette;