import itemDropList from '@/data/foods/itemdrops.json';
import recipeList from '@/data/foods/recipes.json';
import valharvestList from '@/data/foods/valharvestFoods.json';
import valharvestConsumables from '@/data/foods/consumablesValharvest.json';
import valharvestNames from '@/data/foods/foodNames.json';
import boneAppetitList from '@/data/foods/BoneAppetit.json';


import type { FoodItem, ItemDrop, Recipe, ValharvestFood } from '@/domain/types';

class FoodParserService {
  parseFoods(
    valharvestFood: boolean,
    boneAppetitFood: boolean,
    valheimFood: boolean
  ): FoodItem[] {
    let foodList: FoodItem[] = [];

    if (valharvestFood) {
      const foodArr = this.parseValharvestFoods();
      foodList = [...foodArr];
    }

    if (boneAppetitFood) {
      const foodArr = this.parseBoneAppetitFoods();
      foodList = [...foodArr];
    }

    if (valheimFood) {
      const valharvestPrefabs = new Set([
        ...Object.keys(valharvestList as Record<string, unknown>),
        ...Object.keys(valharvestConsumables as Record<string, unknown>),
      ]);

      const items = itemDropList as ItemDrop[];
      for (let i = 0; i < items.length; i++) {
        const foodItem = items[i].shared_data;
        const foodName = foodItem.raw_name;
        const prefabName = foodItem.prefab_name;

        if (valharvestPrefabs.has(prefabName)) continue;

        if (foodItem.item_type_name === "Consumable" && foodItem.food > 0) {
          foodList.push({
            image: `/img/${foodItem.icon}`,
            name: foodName,
            food: foodItem.food,
            stamina: foodItem.food_stamina,
            regen: foodItem.food_regen,
            burn: `${foodItem.food_burn_time / 60} min`,
            prefab: prefabName,
            station:
              this.getRecipeObject(prefabName)?.true_crafting_station_name ||
              null,
            recipe: this.getValheimRecipe(prefabName),
          });
        }
      }
    }

    return foodList;
  }

  private parseValharvestFoods(): FoodItem[] {
    const foodArr: FoodItem[] = [];
    const foodObject: Record<string, ValharvestFood> = {
      ...(valharvestConsumables as Record<string, ValharvestFood>),
      ...(valharvestList as Record<string, ValharvestFood>),
    };

    for (const item in foodObject) {
      const foodData = foodObject[item];
      const nameKey = foodData.name.replace("$", "");
      const name =
        (valharvestNames as Record<string, string>)[nameKey] || foodData.name;
      foodArr.push({
        image: `/img/valharvest/${item}_icon.png`,
        name: name,
        food: foodData.food,
        stamina: foodData.foodStamina,
        regen: foodData.foodRegen,
        burn: `${foodData.foodBurnTime} min`,
        station: foodData.craftingStation,
        prefab: item,
        recipe: this.getValharvestRecipe(foodData.requirements || []),
      });
    }

    return foodArr;
  }

  private parseBoneAppetitFoods(): FoodItem[] {
    const foodArr: FoodItem[] = [];
    const foodObject = boneAppetitList as Record<string, ValharvestFood>;

    for (const item in foodObject) {
      const foodData = foodObject[item];
      foodArr.push({
        image: `/img/boneappetit/${item}_icon.png`,
        name: foodData.name,
        food: foodData.food,
        stamina: foodData.foodStamina,
        regen: foodData.foodRegen,
        burn: `${foodData.foodBurnTime} min`,
        station: foodData.craftingStation,
        prefab: item,
        recipe: this.getValharvestRecipe(foodData.requirements || []),
      });
    }

    return foodArr;
  }

  private getRecipeObject(itemName: string): Recipe | undefined {
    for (let i = 0; i < (recipeList as Recipe[]).length; i++) {
      const trueName = recipeList[i].true_name.toLowerCase();
      const recipeName = `Recipe_${itemName}`.toLowerCase();
      if (trueName === recipeName) {
        return recipeList[i] as Recipe;
      }
    }
  }

  private getValharvestRecipe(
    recipe: { Item: string; Amount: number }[]
  ): { m_amount: number; m_resItem: { name: string } }[] {
    const recipeArr: { m_amount: number; m_resItem: { name: string } }[] = [];

    for (let i = 0; i < recipe.length; i++) {
      recipeArr.push({
        m_amount: recipe[i].Amount,
        m_resItem: {
          name: recipe[i].Item,
        },
      });
    }

    return recipeArr;
  }

  private getValheimRecipe(
    prefabName: string
  ): { m_amount: number; m_resItem: { name: string } }[] {
    const recipe = this.getRecipeObject(prefabName)?.requirements;
    const recipeArr: { m_amount: number; m_resItem: { name: string } }[] = [];

    for (let i = 0; i < (recipe?.length ?? 0); i++) {
      if (recipe?.[i]) {
        recipeArr.push({
          m_amount: recipe[i].amount,
          m_resItem: {
            name: recipe[i].raw_name,
          },
        });
      }
    }

    return recipeArr;
  }
}

export const foodParserService = new FoodParserService();
