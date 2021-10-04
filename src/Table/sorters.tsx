import { Food } from "src/data/food";

export const sortByFoodName = (a: Food, b: Food): number =>
  a.name.localeCompare(b.name);

export const sortByFoodIngredients = (a: Food, b: Food): number =>
  a.ingredients.length - b.ingredients.length;

export const sortByPrep = (a: Food, b: Food): number =>
  a.cookedAt.localeCompare(b.cookedAt);
export const sortByHealth = (a: Food, b: Food): number => a.health - b.health;
export const sortByStamina = (a: Food, b: Food): number =>
  a.stamina - b.stamina;
export const sortByDuration = (a: Food, b: Food): number =>
  a.duration - b.duration;
