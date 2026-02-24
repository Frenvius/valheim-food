"use client";

import React from "react";
import { useImageFallback } from "./use-image-fallback";
import type { ImageWithFallbackProps } from "./types";

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbacks = [],
  alt,
  className,
  width,
  height,
  onAllFailed,
}) => {
  const { currentSrc, hasError, handleError } = useImageFallback(src, fallbacks);

  React.useEffect(() => {
    if (hasError && onAllFailed) {
      onAllFailed();
    }
  }, [hasError, onAllFailed]);

  if (hasError) {
    return (
      <div
        className={`bg-muted rounded flex items-center justify-center text-xs text-muted-foreground ${className}`}
        style={{ width, height }}
      >
        ?
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

export { useImageFallback } from "./use-image-fallback";
export type { ImageWithFallbackProps, UseImageFallbackResult } from "./types";
