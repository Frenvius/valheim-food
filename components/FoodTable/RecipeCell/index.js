import React from 'react';

import style from './style.module.scss';

const RecipeCell = ({ ingredients }) => {
	const recipe = [];
	for (let i = 0; i < 4; i++) {
		if (ingredients) {
			recipe.push({
				amount: ingredients[i]?.m_amount,
				name: ingredients[i]?.m_resItem.name
			});
		}
	}
	return (
		<div className={style.recipe_cell}>
			{recipe.map((ingredient, index) => {
				return (
					<div key={index}>
						{ingredient.amount} {ingredient.name}
						{/*TODO: make ingredient show item image */}
						{/*<img src={`/img/valharvest/${ingredient.name}_icon.png`} alt={`${ingredient.name}`} width="32px" />*/}
					</div>
				);
			})}
		</div>
	);
};

export default RecipeCell;
