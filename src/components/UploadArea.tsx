import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

const UploadArea = ({ onFileSelect, isProcessing = false }: UploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      event.target.value = '';
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isDragActive) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`relative w-full max-w-3xl rounded-3xl border-2 border-dashed p-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/70 ${
        isDragActive
          ? 'border-indigo-400/70 shadow-[0_0_25px_rgba(99,102,241,0.25)]'
          : 'border-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.45)]'
      } ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-busy={isProcessing}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      <div
        className={`flex flex-col items-center gap-4 rounded-[calc(1.5rem-1px)] bg-slate-900/70 px-10 py-16 text-center transition-colors duration-300 ${
          isDragActive ? 'bg-indigo-500/10' : ''
        }`}
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-indigo-300 shadow-inner shadow-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25V16.5m-18 0A2.25 2.25 0 0 0 5.25 18.75h13.5A2.25 2.25 0 0 0 21 16.5m-18 0v.75A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-.75m-9-9v10.5m0 0-3.75-3.75M12 17.25l3.75-3.75"
            />
          </svg>
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-white sm:text-xl">
            {isProcessing ? 'Processing image…' : 'Drag & drop an image'}
          </p>
          <p className="text-sm text-slate-300/80 sm:text-base">or click to browse your files</p>
        </div>
        <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Supports PNG, JPG, GIF &amp; more</p>
      </div>
    </div>
  );
};

export default UploadArea;