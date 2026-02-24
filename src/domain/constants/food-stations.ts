export const VALHARVEST_STATION_MAPPING: Record<string, string> = {
  rk_prep: "piece_prep_table",
  rk_griddle: "piece_cooking_pot",
  rk_grill: "piece_cooking_pot",
};

export const VALHARVEST_STATIONS = new Set([
  "piece_prep_table",
  "piece_cooking_pot",
]);

export const isBoneAppetitStation = (station: string): boolean => {
  return station.startsWith("rk_");
};

export const isValharvestStation = (station: string): boolean => {
  return station.startsWith("vh_") || VALHARVEST_STATIONS.has(station);
};
