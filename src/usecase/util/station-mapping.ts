import { VALHARVEST_STATION_MAPPING } from "@/domain/constants";

export const getDisplayStation = (
  station: string,
  useValharvestStations: boolean
): string => {
  if (useValharvestStations) {
    return VALHARVEST_STATION_MAPPING[station] || station;
  }
  return station;
};
