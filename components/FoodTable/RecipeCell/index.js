import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

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
						{ingredient.name && (
							<Tooltip title={`${ingredient.amount}x ${ingredient.name}`} placement="top" TransitionComponent={Zoom} arrow>
								<span className={style.recipe_cell_item}>
									<span>{ingredient.amount}</span>
									<img src={`/img/${ingredient.name.replace(/ /g,"_")}_icon.png`} alt={`${ingredient.name}`} />
								</span>
							</Tooltip>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default RecipeCell;
