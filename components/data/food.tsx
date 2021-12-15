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
			image: '/img/valharvest/' + item + '_icon.png',
			name: foodObject[item].name,
			food: foodObject[item].food,
			stamina: foodObject[item].foodStamina,
			regen: foodObject[item].foodRegen,
			burn: foodObject[item].foodBurnTime,
			prefab: item,
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
			const foodItem = itemDropList[i].m_itemData.m_shared;
			const foodName = foodItem.m_name_EN;
			if (foodItem.m_itemType == 'Consumable' && foodItem.m_food > 0) {
				foodList.push({
					image: '/img/' + foodName.replace(/ /g,'_') + '.png',
					name: foodName,
					food: foodItem.m_food,
					stamina: foodItem.m_foodStamina,
					regen: foodItem.m_foodRegen,
					burn: foodItem.m_foodBurnTime,
					recipe: getItemRecipe(itemDropList[i].name)
				});
			}
		}
	}

	return foodList;
};

export default parseFoods;
