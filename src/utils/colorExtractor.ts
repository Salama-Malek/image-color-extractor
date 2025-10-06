export interface ColorExtractionOptions {
  colorCount?: number;
  sampleStep?: number;
  minimumAlpha?: number;
}

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const extractDominantColors = (
  image: HTMLImageElement,
  options: ColorExtractionOptions = {}
): string[] => {
  const {
    colorCount = 6,
    sampleStep = 4,
    minimumAlpha = 128,
  } = options;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) {
    throw new Error('Unable to access drawing context for color extraction.');
  }

  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const colorFrequency = new Map<string, number>();

  for (let i = 0; i < data.length; i += 4 * sampleStep) {
    const alpha = data[i + 3];
    if (alpha < minimumAlpha) {
      continue;
    }

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const quantizedR = Math.round(r / 17);
    const quantizedG = Math.round(g / 17);
    const quantizedB = Math.round(b / 17);

    const key = `${quantizedR}-${quantizedG}-${quantizedB}`;
    const count = colorFrequency.get(key) ?? 0;
    colorFrequency.set(key, count + 1);
  }

  const sortedColors = Array.from(colorFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([key]) => {
      const [qR, qG, qB] = key.split('-').map((value) => Number.parseInt(value, 10));
      const r = Math.min(255, Math.round(qR * 17));
      const g = Math.min(255, Math.round(qG * 17));
      const b = Math.min(255, Math.round(qB * 17));
      return rgbToHex(r, g, b);
    });

  return sortedColors;
};