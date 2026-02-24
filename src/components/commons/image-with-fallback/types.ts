export interface ImageWithFallbackProps {
  src: string;
  fallbacks?: string[];
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onAllFailed?: () => void;
}

export interface UseImageFallbackResult {
  currentSrc: string;
  hasError: boolean;
  handleError: () => void;
}
