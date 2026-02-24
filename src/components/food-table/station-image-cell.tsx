"use client";

import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { getStationImageFallbacks, CARD_BACKGROUND } from "@/components/commons";
import { getDisplayStation } from "@/usecase/util";

export interface StationImageCellProps {
  station: string | null;
  useValharvestStations: boolean;
}

interface StationImageProps {
  station: string;
  size?: "small" | "large";
  useValharvestStations?: boolean;
}

const StationImage: React.FC<StationImageProps> = ({
  station,
  size = "small",
  useValharvestStations = false,
}) => {
  const displayStation = getDisplayStation(station, useValharvestStations);
  const fallbacks = React.useMemo(
    () => getStationImageFallbacks(displayStation),
    [displayStation]
  );

  const [imgSrc, setImgSrc] = React.useState(fallbacks[0]);
  const [fallbackIndex, setFallbackIndex] = React.useState(0);

  React.useEffect(() => {
    setImgSrc(fallbacks[0]);
    setFallbackIndex(0);
  }, [fallbacks]);

  const sizeClass = size === "large" ? "w-24 h-24 object-contain" : "w-8 h-8";
  const cursorClass = size === "small" ? "cursor-pointer" : "";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={displayStation}
      className={`${sizeClass} ${cursorClass}`}
      onError={() => {
        const nextIndex = fallbackIndex + 1;
        if (nextIndex < fallbacks.length) {
          setFallbackIndex(nextIndex);
          setImgSrc(fallbacks[nextIndex]);
        }
      }}
    />
  );
};

export const StationImageCell: React.FC<StationImageCellProps> = ({
  station,
  useValharvestStations,
}) => {
  if (!station) return null;

  const displayStationName = getDisplayStation(station, useValharvestStations);

  return (
    <div className="flex justify-center">
      <Tooltip
        className="p-0"
        content={
          <div className="flex flex-col items-center">
            <div
              className="w-32 h-32 bg-cover bg-center flex items-center justify-center rounded-t-md"
              style={{ backgroundImage: `url('${CARD_BACKGROUND}')` }}
            >
              <StationImage
                key={`${station}-${useValharvestStations}-large`}
                station={station}
                size="large"
                useValharvestStations={useValharvestStations}
              />
            </div>
            <div className="w-full bg-black/60 text-center py-1 px-2 rounded-b-md">
              <span className="text-xs text-white">{displayStationName}</span>
            </div>
          </div>
        }
      >
        <StationImage
          key={`${station}-${useValharvestStations}-small`}
          station={station}
          size="small"
          useValharvestStations={useValharvestStations}
        />
      </Tooltip>
    </div>
  );
};
