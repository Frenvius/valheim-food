export interface RecipeRequirement {
  amount: number;
  amount_per_level?: number;
  recover?: boolean;
  raw_name: string;
  var_name?: string;
}

export interface Recipe {
  raw_name: string | null;
  var_name: string | null;
  true_name: string;
  enabled: boolean;
  min_station_level: number;
  amount: number;
  raw_crafting_station_name: string | null;
  var_crafting_station_name?: string;
  true_crafting_station_name?: string;
  raw_repair_station_name?: string | null;
  requirements: RecipeRequirement[];
}

export interface ItemDrop {
  shared_data: {
    raw_name: string;
    prefab_name: string;
    item_type_name: string;
    food: number;
    food_stamina: number;
    food_regen: number;
    food_burn_time: number;
    icon: string;
  };
}

export interface ValharvestFood {
  name: string;
  description?: string;
  weight?: number;
  food: number;
  foodStamina: number;
  foodBurnTime: number;
  foodRegen: number;
  craftingStation: string | null;
  requirements: { Item: string; Amount: number }[];
}

export interface FoodItem {
  image: string;
  name: string;
  food: number;
  stamina: number;
  regen: number;
  burn: string;
  station: string | null;
  prefab: string;
  recipe: { m_amount: number; m_resItem: { name: string } }[];
}

export interface FoodFilterState {
  valheimFood: boolean;
  valharvestFood: boolean;
  boneAppetitFood: boolean;
  useValharvestStations: boolean;
}

export interface FoodTableProps {
  initialFilters?: Partial<FoodFilterState>;
}
