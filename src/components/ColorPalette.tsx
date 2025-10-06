import { useEffect, useState } from 'react';
import ColorCard from './ColorCard';

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette = ({ colors }: ColorPaletteProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!colors.length) {
      setIsVisible(false);
      return;
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 30);

    return () => {
      clearTimeout(timeout);
      setIsVisible(false);
    };
  }, [colors]);

  if (!colors.length) {
    return null;
  }

  return (
    <section
      className={`w-full transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-left text-xs uppercase tracking-[0.35em] text-slate-300/80">
        <span>Palette</span>
        <span className="text-[0.7rem] font-semibold text-indigo-300/90">{colors.length} colors</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {colors.map((color, index) => (
          <div
            key={color}
            style={{ transitionDelay: `${index * 60}ms` }}
            className={`transition-all duration-500 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <ColorCard hex={color} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ColorPalette;