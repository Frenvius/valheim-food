import { ASSET_PATHS } from "./constants";
import {
  isBoneAppetitStation,
  isValharvestStation,
} from "@/domain/constants";
import { valheimIconLookup } from "@/usecase/converter/valheim-icon-lookup";

const getIconPath = (folder: string, name: string, useIconSuffix = true): string => {
  return useIconSuffix ? `${folder}/${name}_icon.png` : `${folder}/${name}.png`;
};

const getValheimIconPath = (name: string): string => {
  return valheimIconLookup.getIconPath(name);
};

export const getFoodImageFallbacks = (prefab: string): string[] => {
  return [
    getIconPath(ASSET_PATHS.VALHARVEST, prefab),
    getIconPath(ASSET_PATHS.BONEAPPETIT, prefab),
    getValheimIconPath(prefab),
  ];
};

export const getStationImageFallbacks = (station: string): string[] => {
  if (isBoneAppetitStation(station)) {
    return [
      getIconPath(ASSET_PATHS.BONEAPPETIT, station),
      getIconPath(ASSET_PATHS.VALHARVEST, station),
      getValheimIconPath(station),
    ];
  }

  if (isValharvestStation(station)) {
    return [
      getIconPath(ASSET_PATHS.VALHARVEST, station),
      getValheimIconPath(station),
      getIconPath(ASSET_PATHS.BONEAPPETIT, station),
    ];
  }

  return [
    getValheimIconPath(station),
    getIconPath(ASSET_PATHS.VALHARVEST, station),
    getIconPath(ASSET_PATHS.BONEAPPETIT, station),
  ];
};

export const getIngredientImageFallbacks = (ingredientName: string): string[] => {
  if (ingredientName.startsWith("rk_")) {
    return [
      getIconPath(ASSET_PATHS.BONEAPPETIT, ingredientName),
      getIconPath(ASSET_PATHS.VALHARVEST, ingredientName),
      getValheimIconPath(ingredientName),
    ];
  }

  const firstChar = ingredientName.charAt(0);
  if (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase()) {
    return [
      getIconPath(ASSET_PATHS.VALHARVEST, ingredientName),
      getValheimIconPath(ingredientName),
      getIconPath(ASSET_PATHS.BONEAPPETIT, ingredientName),
    ];
  }

  return [
    getValheimIconPath(ingredientName),
    getIconPath(ASSET_PATHS.VALHARVEST, ingredientName),
    getIconPath(ASSET_PATHS.BONEAPPETIT, ingredientName),
  ];
};
