export enum GameMod {
  VALHEIM = "valheim",
  VALHARVEST = "valharvest",
  BONEAPPETIT = "boneappetit",
}

export const MOD_NAMES: Record<GameMod, string> = {
  [GameMod.VALHEIM]: "Valheim",
  [GameMod.VALHARVEST]: "Valharvest",
  [GameMod.BONEAPPETIT]: "BoneAppetit",
};

export const MOD_IMAGE_FOLDERS: Record<GameMod, string> = {
  [GameMod.VALHEIM]: "/img",
  [GameMod.VALHARVEST]: "/img/valharvest",
  [GameMod.BONEAPPETIT]: "/img/boneappetit",
};
