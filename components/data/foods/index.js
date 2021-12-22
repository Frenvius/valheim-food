import itemDropList from './itemdrops.json';
import recipeList from './recipes.json';
import valharvestList from './valharvestFoods.json';

const getRecipeObject = (itemName) => {
    for(let i = 0; i < recipeList.length; i++) {
        let trueName = recipeList[i].true_name.toLowerCase();
        let recipeName = `Recipe_${itemName}`.toLowerCase();
        if (trueName === recipeName) {
            return recipeList[i];
        }
    }
};

const getValharvestRecipe = (recipe) => {
    const recipeArr = [];

    for(let i = 0; i < recipe.length; i++) {
        recipeArr.push({
            m_amount: recipe[i].Amount,
            m_resItem: {
                name: recipe[i].Item
            }
        });
    }

    return recipeArr;
};

const getValheimRecipe = (prefabName) => {
    const recipe = getRecipeObject(prefabName)?.requirements;
    const recipeArr = [];

    for(let i = 0; i < recipe?.length; i++) {
        recipeArr.push({
            m_amount: recipe[i].amount,
            m_resItem: {
                name: recipe[i].raw_name
            }
        });
    }

    return recipeArr;
};

const parseValharvestFoods = () => {
    const foodArr = [];
    const json = JSON.stringify(valharvestList);
    const foodObject = JSON.parse(json);
    for(const item in foodObject) {
        foodArr.push({
            image: `/img/${item}_icon.png`,
            name: foodObject[item].name,
            food: foodObject[item].food,
            stamina: foodObject[item].foodStamina,
            regen: foodObject[item].foodRegen,
            burn: `${foodObject[item].foodBurnTime} min`,
            station: foodObject[item].craftingStation,
            prefab: item,
            recipe: getValharvestRecipe(foodObject[item].requirements)
        });
    }

    return foodArr;
};

const parseFoods = (valheimFoods) => {
    const foodArr = parseValharvestFoods();
    const foodList = [...foodArr];

    if (valheimFoods) {
        for(let i = 0; i < itemDropList.length; i++) {
            const foodItem = itemDropList[i].shared_data;
            const foodName = foodItem.raw_name;
            const prefabName = foodItem.prefab_name;
            if (foodItem.item_type_name === 'Consumable' && foodItem.
                food > 0) {
                foodList.push({
                    image: `/img/${foodName.replace(/ /g,'_')}_icon.png`,
                    name: foodName,
                    food: foodItem.food,
                    stamina: foodItem.food_stamina,
                    regen: foodItem.food_regen,
                    burn: `${foodItem.food_burn_time/60} min`,
                    prefab: prefabName,
                    station: getRecipeObject(prefabName)?.true_crafting_station_name,
                    recipe: getValheimRecipe(prefabName)
                });
            }
        }
    }

    return foodList;
};

export default parseFoods;
