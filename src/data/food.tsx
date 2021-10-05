import { ImageSourcePropType } from "react-native";

const READY_TO_EAT = "Ready To Eat";
const COOKING_STATION = "Cooking Station";
const CAULDRON_1 = "Cauldron lvl 1";
const CAULDRON_2 = "Cauldron lvl 2";
const CAULDRON_3 = "Cauldron lvl 3";
const CAULDRON_4 = "Cauldron lvl 4";
const CAULDRON_OVEN = "Cauldron lvl 4 And Oven";
export interface InedibleItem {
  name: string;
  icon: ImageSourcePropType;
  link: string;
}
export interface Food extends InedibleItem {
  cookedAt:
    | typeof READY_TO_EAT
    | typeof COOKING_STATION
    | typeof CAULDRON_1
    | typeof CAULDRON_2
    | typeof CAULDRON_3
    | typeof CAULDRON_4
    | typeof CAULDRON_OVEN;
  ingredients: { item: Food | InedibleItem; amount: number }[];
  health: number;
  stamina: number;
  healing: number;
  duration: number; // seconds
}
const raspberries: Food = {
  name: "Raspberries",
  icon: require("@assets/images/Raspberries.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 7,
  stamina: 20,
  healing: 1,
  duration: 600,
  link: "https://valheim.fandom.com/wiki/Raspberries",
};
const mushroom: Food = {
  name: "Mushroom",
  icon: require("@assets/images/Mushroom.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 15,
  stamina: 15,
  healing: 1,
  duration: 900,
  link: "https://valheim.fandom.com/wiki/Mushroom",
};
const honey: Food = {
  name: "Honey",
  icon: require("@assets/images/Honey.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 8,
  stamina: 35,
  healing: 1,
  duration: 900,
  link: "https://valheim.fandom.com/wiki/Honey",
};

const neckTail: InedibleItem = {
  name: "Neck tail",
  icon: require("@assets/images/Neck_tail.png"),
  link: "https://valheim.fandom.com/wiki/Neck_tail",
};

const grilledNeckTail: Food = {
  name: "Grilled neck tail",
  icon: require("@assets/images/Grilled_neck_tail.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: neckTail,
      amount: 1,
    },
  ],
  health: 25,
  stamina: 8,
  healing: 2,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Grilled_neck_tail",
};

const boarMeat: InedibleItem = {
  name: "Boar meat",
  icon: require("@assets/images/Boar_meat.png"),
  link: "https://valheim.fandom.com/wiki/Boar_meat",
};

const cookedBoarMeet: Food = {
  name: "Cooked boar meat",
  icon: require("@assets/images/Cooked_meat.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: boarMeat,
      amount: 1,
    },
  ],
  health: 30,
  stamina: 10,
  healing: 2,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Cooked_boar_meat",
};

const boarJerky: Food = {
  name: "Boar jerky",
  icon: require("@assets/images/Boar_jerky.png"),
  cookedAt: CAULDRON_1,
  ingredients: [
    {
      item: boarMeat,
      amount: 1,
    },
    {
      item: honey,
      amount: 1,
    },
  ],
  health: 23,
  stamina: 23,
  healing: 2,
  duration: 1800,
  link: "https://valheim.fandom.com/wiki/Boar_jerky",
};

const deerMeat: InedibleItem = {
  name: "Deer meat",
  icon: require("@assets/images/Deer_meat.png"),
  link: "https://valheim.fandom.com/wiki/Deer_meat",
};

const cookedDeerMeat: Food = {
  name: "Cooked deer meat",
  icon: require("@assets/images/Deer_meat_cooked.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: deerMeat,
      amount: 1,
    },
  ],
  health: 35,
  stamina: 12,
  healing: 2,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Cooked_deer_meat",
};

const bukeperries: Food = {
  name: "Cooked deer meat",
  icon: require("@assets/images/Pukeberries.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 0,
  stamina: 0,
  healing: 0,
  duration: 15,
  link: "https://valheim.fandom.com/wiki/Bukeperries",
};

const blueberries: Food = {
  name: "Blueberries",
  icon: require("@assets/images/Blueberries.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 8,
  stamina: 25,
  healing: 1,
  duration: 600,
  link: "https://valheim.fandom.com/wiki/Blueberries",
};

const carrot: Food = {
  name: "Carrot",
  icon: require("@assets/images/Carrot.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 15,
  stamina: 15,
  healing: 1,
  duration: 600,
  link: "https://valheim.fandom.com/wiki/Carrot",
};

const yellowMushroom: Food = {
  name: "Yellow Mushroom",
  icon: require("@assets/images/Yellow_mushroom.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 10,
  stamina: 30,
  healing: 1,
  duration: 600,
  link: "https://valheim.fandom.com/wiki/Yellow_mushroom",
};

const carrotSoup: Food = {
  name: "Carrot Soup",
  icon: require("@assets/images/Carrot_soup.png"),
  cookedAt: CAULDRON_1,
  ingredients: [
    {
      item: carrot,
      amount: 3,
    },
    {
      item: mushroom,
      amount: 1,
    },
  ],
  health: 15,
  stamina: 45,
  healing: 2,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Carrot_soup",
};

const queensJam: Food = {
  name: "Queens jam",
  icon: require("@assets/images/Queens_jam.png"),
  cookedAt: CAULDRON_1,
  ingredients: [
    {
      item: raspberries,
      amount: 2,
    },
    {
      item: blueberries,
      amount: parseFloat((4 / 6).toFixed(2)),
    },
  ],
  health: 14,
  stamina: 40,
  healing: 2,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Queens_jam",
};

const rawFish: InedibleItem = {
  name: "Raw fish",
  icon: require("@assets/images/Raw_fish.png"),
  link: "https://valheim.fandom.com/wiki/Raw_fish",
};

const cookedFish: Food = {
  name: "Cooked Fish",
  icon: require("@assets/images/Cooked_fish.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: rawFish,
      amount: 1,
    },
  ],
  health: 45,
  stamina: 20,
  healing: 2,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Cooked_fish",
};

const deerStew: Food = {
  name: "Deer Stew",
  icon: require("@assets/images/Deer_Stew.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: blueberries,
      amount: 1,
    },
    {
      item: carrot,
      amount: 1,
    },
    {
      item: cookedDeerMeat,
      amount: 1,
    },
  ],
  health: 45,
  stamina: 15,
  healing: 3,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Deer_stew",
};

const mincedMeatSauce: Food = {
  name: "Minced Meat Sauce",
  icon: require("@assets/images/Mincemeatsauce.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: boarMeat,
      amount: 1,
    },
    {
      item: neckTail,
      amount: 1,
    },
    {
      item: carrot,
      amount: 1,
    },
  ],
  health: 40,
  stamina: 13,
  healing: 3,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Minced_Meat_Sauce",
};

const ooze: InedibleItem = {
  name: "Ooze",
  icon: require("@assets/images/Ooze.png"),
  link: "https://valheim.fandom.com/wiki/Ooze",
};

const muckshake: Food = {
  name: "Muckshake",
  icon: require("@assets/images/Shocklatesmoothie.png"),
  cookedAt: CAULDRON_2,
  ingredients: [
    {
      item: ooze,
      amount: 1,
    },
    {
      item: raspberries,
      amount: 2,
    },
    {
      item: blueberries,
      amount: 2,
    },
  ],
  health: 16,
  stamina: 50,
  healing: 1,
  duration: 20 * 60,
  link: "https://valheim.fandom.com/wiki/Muckshake",
};

const turnip: InedibleItem = {
  name: "Turnip",
  icon: require("@assets/images/Turnip.png"),
  link: "https://valheim.fandom.com/wiki/Turnip",
};

const turnipStew: Food = {
  name: "Turnip stew",
  icon: require("@assets/images/Turnip_stew.png"),
  cookedAt: CAULDRON_1,
  ingredients: [
    {
      item: boarMeat,
      amount: 1,
    },
    {
      item: turnip,
      amount: 3,
    },
  ],
  health: 18,
  stamina: 55,
  healing: 2,
  duration: 25 * 60,
  link: "https://valheim.fandom.com/wiki/Turnip_stew",
};

const entrails: InedibleItem = {
  name: "Entrails",
  icon: require("@assets/images/Entrails.png"),
  link: "https://valheim.fandom.com/wiki/Entrails",
};

const thistle: InedibleItem = {
  name: "Thistle",
  icon: require("@assets/images/Thistle.png"),
  link: "https://valheim.fandom.com/wiki/Thistle",
};

const sausages: Food = {
  name: "Sausages",
  icon: require("@assets/images/Sausages.png"),
  cookedAt: CAULDRON_2,
  ingredients: [
    {
      item: entrails,
      amount: 1,
    },
    {
      item: boarMeat,
      amount: parseFloat((1 / 4).toFixed(2)),
    },
    {
      item: thistle,
      amount: parseFloat((1 / 4).toFixed(2)),
    },
  ],
  health: 55,
  stamina: 18,
  healing: 3,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Sausages",
};

const bloodBag: InedibleItem = {
  name: "Bloodbag",
  icon: require("@assets/images/Bloodbag.png"),
  link: "https://valheim.fandom.com/wiki/Bloodbag",
};

const blackSoup: Food = {
  name: "Black soup",
  icon: require("@assets/images/BlackSoup.png"),
  cookedAt: CAULDRON_2,
  ingredients: [
    {
      item: bloodBag,
      amount: 1,
    },
    {
      item: honey,
      amount: 1,
    },
    {
      item: turnip,
      amount: 1,
    },
  ],
  health: 50,
  stamina: 17,
  healing: 3,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Black_soup",
};

const serpentMeat: InedibleItem = {
  name: "Serpent meat",
  icon: require("@assets/images/Serpent_meat.png"),
  link: "https://valheim.fandom.com/wiki/Serpent_meat",
};

const cookedSerpentMeat: Food = {
  name: "Cooked serpent meat",
  icon: require("@assets/images/Cooked_serpent_meat.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: serpentMeat,
      amount: 1,
    },
  ],
  health: 70,
  stamina: 23,
  healing: 3,
  duration: 2000,
  link: "https://valheim.fandom.com/wiki/Cooked_serpent_meat",
};

const serpentStew: Food = {
  name: "Serpent stew",
  icon: require("@assets/images/Serpent_stew.png"),
  cookedAt: CAULDRON_2,
  ingredients: [
    {
      item: mushroom,
      amount: 1,
    },
    {
      item: cookedSerpentMeat,
      amount: 1,
    },
    {
      item: honey,
      amount: 2,
    },
  ],
  health: 80,
  stamina: 26,
  healing: 4,
  duration: 1800,
  link: "https://valheim.fandom.com/wiki/Serpent_stew",
};

const onion: Food = {
  name: "Onion",
  icon: require("@assets/images/Onion.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 13,
  stamina: 40,
  healing: 1,
  duration: 900,
  link: "https://valheim.fandom.com/wiki/Onion",
};

const onionSoup: Food = {
  name: "Onion soup",
  icon: require("@assets/images/OnionSoup.png"),
  cookedAt: CAULDRON_1,
  ingredients: [
    {
      item: onion,
      amount: 3,
    },
  ],
  health: 20,
  stamina: 60,
  healing: 1,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Onion_soup",
};

const wolfMeat: InedibleItem = {
  name: "Wolf meat",
  icon: require("@assets/images/Wolf_meat.png"),
  link: "https://valheim.fandom.com/wiki/Wolf_meat",
};

const cookedWolfMeat: Food = {
  name: "Cooked wolf meat",
  icon: require("@assets/images/Cooked_wolf_meat.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: wolfMeat,
      amount: 1,
    },
  ],
  health: 45,
  stamina: 15,
  healing: 3,
  duration: 1200,
  link: "https://valheim.fandom.com/wiki/Cooked_wolf_meat",
};

const wolfJerky: Food = {
  name: "Wolf jerky",
  icon: require("@assets/images/Wolfjerky.png"),
  cookedAt: CAULDRON_3,
  ingredients: [
    {
      item: wolfMeat,
      amount: 1,
    },
    {
      item: honey,
      amount: 1,
    },
  ],
  health: 33,
  stamina: 33,
  healing: 3,
  duration: 1800,
  link: "https://valheim.fandom.com/wiki/Wolf_jerky",
};

const wolfSkewer: Food = {
  name: "Wolf skewer",
  icon: require("@assets/images/Wolf_skewer.png"),
  cookedAt: CAULDRON_3,
  ingredients: [
    {
      item: wolfMeat,
      amount: 1,
    },
    {
      item: mushroom,
      amount: 2,
    },
    {
      item: onion,
      amount: 1,
    },
  ],
  health: 65,
  stamina: 21,
  healing: 3,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Wolf_skewer",
};

const greydwarfEye: InedibleItem = {
  name: "Greydwarf eye",
  icon: require("@assets/images/Greydwarf_eye.png"),
  link: "https://valheim.fandom.com/wiki/Greydwarf_eye",
};

const freezeGland: InedibleItem = {
  name: "Freeze land",
  icon: require("@assets/images/Freeze_gland.png"),
  link: "https://valheim.fandom.com/wiki/Freeze_gland",
};

const eyescream: Food = {
  name: "Eyescream",
  icon: require("@assets/images/Eyescream.png"),
  cookedAt: CAULDRON_3,
  ingredients: [
    {
      item: greydwarfEye,
      amount: 1,
    },
    {
      item: freezeGland,
      amount: 2,
    },
  ],
  health: 21,
  stamina: 65,
  healing: 1,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Eyescream",
};

const cloudberries: Food = {
  name: "Cloudberries",
  icon: require("@assets/images/Cloudberries.png"),
  cookedAt: READY_TO_EAT,
  ingredients: [],
  health: 13,
  stamina: 40,
  healing: 1,
  duration: 15 * 60,
  link: "https://valheim.fandom.com/wiki/Cloudberries",
};

const loxMeat: InedibleItem = {
  name: "Lox Meat",
  icon: require("@assets/images/Lox_meat.png"),
  link: "https://valheim.fandom.com/wiki/Lox_meat",
};

const cookedLoxMeat: Food = {
  name: "Cooked lox meat",
  icon: require("@assets/images/Cooked_lox_meat.png"),
  cookedAt: COOKING_STATION,
  ingredients: [
    {
      item: loxMeat,
      amount: 1,
    },
  ],
  health: 50,
  stamina: 16,
  healing: 3,
  duration: 2000,
  link: "https://valheim.fandom.com/wiki/Cooked_lox_meat",
};

const barleyFlour: InedibleItem = {
  name: "Barley flour",
  icon: require("@assets/images/Barley_flour.png"),
  link: "https://valheim.fandom.com/wiki/Barley_flour",
};

const fishWraps: Food = {
  name: "Fish wraps",
  icon: require("@assets/images/Fish_wraps.png"),
  cookedAt: CAULDRON_4,
  ingredients: [
    {
      item: cookedFish,
      amount: 2,
    },
    {
      item: barleyFlour,
      amount: 4,
    },
  ],
  health: 70,
  stamina: 23,
  healing: 4,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Fish_wraps",
};

const loxMeatPie: Food = {
  name: "Lox meat pie",
  icon: require("@assets/images/Lox_meat_pie.png"),
  cookedAt: CAULDRON_OVEN,
  ingredients: [
    {
      item: barleyFlour,
      amount: 4,
    },
    {
      item: cloudberries,
      amount: 2,
    },
    {
      item: loxMeat,
      amount: 2,
    },
  ],
  health: 75,
  stamina: 24,
  healing: 4,
  duration: 1800,
  link: "https://valheim.fandom.com/wiki/Lox_meat_pie",
};

const bloodPudding: Food = {
  name: "Blood pudding",
  icon: require("@assets/images/Blood_pudding.png"),
  cookedAt: CAULDRON_4,
  ingredients: [
    {
      item: thistle,
      amount: 2,
    },
    {
      item: bloodBag,
      amount: 2,
    },
    {
      item: barleyFlour,
      amount: 4,
    },
  ],
  health: 25,
  stamina: 75,
  healing: 2,
  duration: 1800,
  link: "https://valheim.fandom.com/wiki/Blood_pudding",
};

const bread: Food = {
  name: "Bread",
  icon: require("@assets/images/Bread.png"),
  cookedAt: CAULDRON_OVEN,
  ingredients: [
    {
      item: barleyFlour,
      amount: 10,
    },
  ],
  health: 23,
  stamina: 70,
  healing: 2,
  duration: 1500,
  link: "https://valheim.fandom.com/wiki/Bread",
};

const foods: Food[] = [
  raspberries,
  mushroom,
  honey,
  grilledNeckTail,
  cookedBoarMeet,
  boarJerky,
  cookedDeerMeat,
  bukeperries,
  blueberries,
  carrot,
  yellowMushroom,
  carrotSoup,
  queensJam,
  cookedFish,
  deerStew,
  mincedMeatSauce,
  muckshake,
  turnipStew,
  sausages,
  blackSoup,
  cookedSerpentMeat,
  serpentStew,
  onion,
  onionSoup,
  cookedWolfMeat,
  wolfJerky,
  wolfSkewer,
  eyescream,
  cloudberries,
  cookedLoxMeat,
  fishWraps,
  loxMeatPie,
  bloodPudding,
  bread,
];

export default foods;
