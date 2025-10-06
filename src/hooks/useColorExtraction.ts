import { useCallback, useEffect, useRef, useState } from 'react';
import { extractDominantColors } from '../utils/colorExtractor';

interface UseColorExtractionOptions {
  colorCount?: number;
}

export const useColorExtraction = (options: UseColorExtractionOptions = {}) => {
  const { colorCount = 6 } = options;
  const [colors, setColors] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  const revokePreviousUrl = useCallback(() => {
    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
      previousUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      revokePreviousUrl();
    };
  }, [revokePreviousUrl]);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }

      setError(null);
      setIsProcessing(true);

      revokePreviousUrl();

      const objectUrl = URL.createObjectURL(file);
      previousUrlRef.current = objectUrl;

      try {
        const image = await loadImage(objectUrl);
        const extractedColors = extractDominantColors(image, { colorCount });
        setColors(extractedColors);
        setImageSrc(objectUrl);
      } catch (extractionError) {
        console.error(extractionError);
        setError('Unable to extract colors from the provided image.');
        setColors([]);
        setImageSrc(null);
      } finally {
        setIsProcessing(false);
      }
    },
    [colorCount, revokePreviousUrl]
  );

  const reset = useCallback(() => {
    revokePreviousUrl();
    setColors([]);
    setImageSrc(null);
    setError(null);
    setIsProcessing(false);
  }, [revokePreviousUrl]);

  return {
    colors,
    imageSrc,
    isProcessing,
    error,
    processFile,
    reset,
  };
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image failed to load.'));
    image.src = src;
  });
};