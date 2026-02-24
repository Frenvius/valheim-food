"use client";

import React from "react";
import { ImageWithFallback } from "../image-with-fallback";
import {
  getFoodImageFallbacks,
  getStationImageFallbacks,
  getIngredientImageFallbacks,
} from "./utils";

export type AssetType = "food" | "station" | "ingredient";

export interface GameAssetImageProps {
  type: AssetType;
  name: string;
  primarySrc?: string;
  alt?: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

const SIZE_CLASSES = {
  small: "w-8 h-8",
  medium: "w-16 h-16",
  large: "w-24 h-24",
} as const;

export const GameAssetImage: React.FC<GameAssetImageProps> = ({
  type,
  name,
  primarySrc,
  alt,
  className = "",
  size = "small",
}) => {
  const fallbacks = React.useMemo(() => {
    switch (type) {
      case "food":
        return getFoodImageFallbacks(name);
      case "station":
        return getStationImageFallbacks(name);
      case "ingredient":
        return getIngredientImageFallbacks(name);
      default:
        return [];
    }
  }, [type, name]);

  const src = primarySrc || fallbacks[0];
  const remainingFallbacks = primarySrc ? fallbacks : fallbacks.slice(1);

  return (
    <ImageWithFallback
      src={src}
      fallbacks={remainingFallbacks}
      alt={alt || name}
      className={`object-contain ${SIZE_CLASSES[size]} ${className}`}
    />
  );
};

export { ASSET_PATHS, CARD_BACKGROUND } from "./constants";
export {
  getFoodImageFallbacks,
  getStationImageFallbacks,
  getIngredientImageFallbacks,
} from "./utils";
