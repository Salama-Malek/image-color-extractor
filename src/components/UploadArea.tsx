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
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors duration-200 ${
        isDragActive
          ? 'border-indigo-400 bg-indigo-500/10'
          : 'border-slate-700 bg-slate-900/40 hover:border-indigo-300'
      } ${isProcessing ? 'opacity-70 pointer-events-none' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
      <div className="flex flex-col items-center gap-3 px-8 py-14 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-indigo-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25V16.5m-18 0A2.25 2.25 0 0 0 5.25 18.75h13.5A2.25 2.25 0 0 0 21 16.5m-18 0v.75A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-.75m-9-9v10.5m0 0-3.75-3.75M12 17.25l3.75-3.75"
            />
          </svg>
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-slate-100">
            {isProcessing ? 'Processing image…' : 'Drop image here'}
          </p>
          <p className="text-sm text-slate-400">or click to browse your files</p>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;