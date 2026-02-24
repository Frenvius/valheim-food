"use client";

import React from "react";
import type { UseImageFallbackResult } from "./types";

export const useImageFallback = (
  primarySrc: string,
  fallbacks: string[] = []
): UseImageFallbackResult => {
  const allSources = React.useMemo(
    () => [primarySrc, ...fallbacks],
    [primarySrc, fallbacks]
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
  }, [primarySrc]);

  const handleError = React.useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < allSources.length) {
      setCurrentIndex(nextIndex);
    } else {
      setHasError(true);
    }
  }, [currentIndex, allSources.length]);

  const currentSrc = hasError ? "" : allSources[currentIndex];

  return {
    currentSrc,
    hasError,
    handleError,
  };
};
