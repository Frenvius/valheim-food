import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import style from './style.module.scss';

const RecipeCell = ({ ingredients, mode }) => {
	const recipe = [];
	for (let i = 0; i < 4; i++) {
		if (ingredients) {
			recipe.push({
				amount: ingredients[i]?.m_amount,
				name: ingredients[i]?.m_resItem.name
			});
		}
	}

	const itemStyle = {
		backgroundColor: mode === 'dark' ? '#2e2e2e' : '#e9e5dc',
		color: mode === 'dark' ? '#9fa6b3' : '#2e2e2e'
	};

	const bgStyle = {
		width: '40px',
		borderRadius: '8px 8px 8px 0',
		opacity: mode === 'dark' ? 0.7 : 1
	};

	return (
		<div className={style.recipe_cell}>
			{recipe.map((ingredient, index) => {
				return (
					<div key={index}>
						{ingredient.name && (
							<Tooltip title={`${ingredient.amount}x ${ingredient.name}`} placement="top" TransitionComponent={Zoom} arrow>
								<span className={style.recipe_cell_item} style={itemStyle}>
									<span>{ingredient.amount}</span>
									<img src={`/img/${ingredient.name.replace(/ /g,"_")}_icon.png`} alt={`${ingredient.name}`} />
									<span className={style.recipe_cell_item_bg} style={bgStyle}></span>
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
