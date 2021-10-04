import { ImageSourcePropType } from "react-native";

export const images = {
  Raspberries: require("@assets/images/Raspberries.png"),
  Mushroom: require("@assets/images/Mushroom.png"),
  Honey: require("@assets/images/Honey.png"),
  "Turnip stew": require("@assets/images/Turnip_stew.png"),
};

const READY_TO_EAT = "Ready To Eat";
const CAULDRON_1 = "Cauldron lvl 1";

export interface Food {
  name: string;
  icon: ImageSourcePropType;
  cookedAt: typeof READY_TO_EAT | typeof CAULDRON_1;
  ingredients: { item: Food; amount: number }[];
  health: number;
  stamina: number;
  healing: number;
}
const raspberries: Food = {
  name: "Raspberries",
  icon: images["Raspberries"],
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 7,
  stamina: 20,
  healing: 1,
};
const mushroom: Food = {
  name: "Mushroom",
  icon: images["Mushroom"],
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 15,
  stamina: 15,
  healing: 1,
};
const honey: Food = {
  name: "Honey",
  icon: images["Honey"],
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 8,
  stamina: 35,
  healing: 1,
};
const foods: Food[] = [
  raspberries,
  mushroom,
  honey,
  {
    name: "Turnip stew",
    icon: images["Turnip stew"],
    cookedAt: CAULDRON_1,
    ingredients: [
      {
        item: raspberries,
        amount: 1,
      },
    ],
    health: 7,
    stamina: 20,
    healing: 1,
  },
];

export default foods;
