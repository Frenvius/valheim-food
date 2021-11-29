import itemDropList from './itemdrops.json';
import recipeList from './recipes.json';
import valharvestList from './valharvestFoods.json';

const getItemRecipe = (itemName: string) => {
	for(let i = 0; i < recipeList.length; i++) {
		if (recipeList[i].name == `Recipe_${itemName}`) {
			return recipeList[i].m_resources;
		}
	}
};

const getValharvestRecipe = (recipe: string[]) => {
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

const parseValharvestFoods = () => {
	const foodArr = [];
	const json = JSON.stringify(valharvestList);
	const foodObject = JSON.parse(json);
	for(const item in foodObject) {
		foodArr.push({
			name: foodObject[item].name,
			food: foodObject[item].food,
			stamina: foodObject[item].foodStamina,
			regen: foodObject[item].foodRegen,
			burn: foodObject[item].foodBurnTime,
			recipe: getValharvestRecipe(foodObject[item].requirements)
		});
	}

	return foodArr;
};

const parseFoods = (valheimFoods: boolean) => {
	const foodArr = parseValharvestFoods();
	const foodList = [...foodArr];

	if (valheimFoods) {
		for(let i = 0; i < itemDropList.length; i++) {
			if (itemDropList[i].m_itemData.m_shared.m_itemType == 'Consumable') {
				foodList.push({
					name: itemDropList[i].name,
					food: itemDropList[i].m_itemData.m_shared.m_food,
					stamina: itemDropList[i].m_itemData.m_shared.m_foodStamina,
					regen: itemDropList[i].m_itemData.m_shared.m_foodRegen,
					burn: itemDropList[i].m_itemData.m_shared.m_foodBurnTime,
					recipe: getItemRecipe(itemDropList[i].name)
				});
			}
		}
	}

	return foodList;
};

export default parseFoods;
