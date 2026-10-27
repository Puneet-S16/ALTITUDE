import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#161A18] ${containerClassName}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#202A25] to-[#121614] p-6 text-center text-white/80 select-none">
          <Mountain size={36} strokeWidth={1.5} className="text-accent mb-3 opacity-80" />
          <span className="font-mono text-xs uppercase tracking-mono text-accent">
            Himalayan Ridge
          </span>
          <span className="font-serif text-sm text-white/90 mt-1 max-w-[200px] line-clamp-2">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};

