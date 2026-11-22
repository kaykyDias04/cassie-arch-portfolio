'use client';

import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface ImageLightboxTriggerProps {
  src: string;
  fullSrc?: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  priorityHint?: string;
}

/**
 * Imagem clicável com ampliação em modal (Lightbox) para inspeção detalhada
 * de pranchas, plantas baixas e fotografias arquitetônicas.
 */
export default function ZoomableImage({
  src,
  fullSrc,
  alt,
  caption,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  loading = 'lazy',
}: ImageLightboxTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group/zoom relative block w-full text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-luminex-red focus-visible:outline-offset-2 ${className}`}
        aria-label={alt ? `Ampliar imagem: ${alt}` : 'Ampliar imagem'}
      >
        <img src={src} alt={alt} className={imgClassName} loading={loading} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-title-black/80 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/zoom:opacity-100"
        >
          <Maximize2 size={12} />
          Ampliar
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Visualização ampliada da imagem'}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-title-black/92 p-4 sm:p-8 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase text-white hover:bg-luminex-red hover:border-luminex-red transition-colors cursor-pointer focus-visible:outline-white"
            aria-label="Fechar visualização ampliada"
          >
            <X size={16} />
            <span className="hidden sm:inline">Fechar</span>
          </button>

          <div
            className="relative max-w-6xl max-h-[88vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullSrc || src}
              alt={alt}
              className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl bg-black/20"
            />
            {(caption || alt) && (
              <p className="text-center text-xs sm:text-sm text-white/80 max-w-2xl px-2">
                {caption || alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
