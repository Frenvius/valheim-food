"use client";

import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { getFoodImageFallbacks, CARD_BACKGROUND } from "@/components/commons";

export interface FoodImageCellProps {
  imagePath: string;
  prefab: string;
  name: string;
}

const getFoodImagePaths = (imagePath: string, prefab: string): string[] => {
  return [imagePath, ...getFoodImageFallbacks(prefab)];
};

export const FoodImageCell: React.FC<FoodImageCellProps> = ({
  imagePath,
  prefab,
  name,
}) => {
  const fallbacks = React.useMemo(
    () => getFoodImagePaths(imagePath, prefab).slice(1),
    [imagePath, prefab]
  );

  const [imgSrc, setImgSrc] = React.useState(imagePath);
  const [fallbackIndex, setFallbackIndex] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);

  const handleError = React.useCallback(() => {
    if (fallbackIndex < fallbacks.length) {
      setImgSrc(fallbacks[fallbackIndex]);
      setFallbackIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  }, [fallbackIndex, fallbacks]);

  if (hasError) {
    return (
      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
        ?
      </div>
    );
  }

  return (
    <Tooltip
      className="p-0"
      content={
        <div
          className="w-32 h-32 rounded-md bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url('${CARD_BACKGROUND}')` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={name}
            width={96}
            height={96}
            className="w-24 h-24 object-contain"
            onError={handleError}
          />
        </div>
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={name}
        className="w-8 h-8 object-contain cursor-pointer"
        onError={handleError}
      />
    </Tooltip>
  );
};
