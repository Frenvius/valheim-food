import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaterialTable from '@material-table/core';

import parseFoods from '../data/foods';
import tableIcons from '../tableIcons';
import RecipeCell from './RecipeCell';
import style from './style.module.scss';

const FoodTable = () => {
	const [valheimFood, setValheimFood] = useState(false);

	const headerStyle = {
		padding: '5px',
		span: {
			backgroundColor: 'red',
			width: '20px'
		}
	};

	const columns = [
		{
			field: 'image',
			title: 'Img',
			width: 50,
			align: 'center',
			cellStyle: { padding: '2px 10px', textAlign: 'center' },
			headerStyle: { padding: '5px 10px' },
			sorting: false,
			render: rowData => {
				return (
					<div style={{ width: '32px' }}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={`${rowData.image}`} alt={`${rowData.name}`} width="32px" />
					</div>
				);
			}
		},
		{
			field: 'name',
			title: 'Name',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'food',
			title: 'HP',
			width: 10,
			align: 'left',
			cellStyle: { padding: '5px' },
			headerStyle: headerStyle
		},
		{
			field: 'stamina',
			title: 'Stam',
			width: 10,
			align: 'left',
			cellStyle: { padding: '5px' },
			headerStyle: headerStyle
		},
		{
			field: 'burn',
			title: 'Burn',
			width: 10,
			align: 'left',
			cellStyle: { padding: '5px' },
			headerStyle: headerStyle
		},
		{
			field: 'regen',
			title: 'RGN',
			width: 10,
			align: 'center',
			cellStyle: { padding: '5px', paddingLeft: '0px' },
			headerStyle: headerStyle
		},
		{
			field: 'prefab',
			title: 'Prefab ID',
			width: 120,
			align: 'left',
			sorting: false,
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'station',
			title: 'Station',
			width: 80,
			align: 'left',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'recipe',
			title: 'Ingredients',
			align: 'right',
			width: 100,
			sorting: false,
			cellStyle: { padding: '2px' },
			headerStyle: { padding: '2px', textAlign: 'center' },
			render: rowData => {
				return <RecipeCell ingredients={rowData.recipe} />;
			}
		}
	];

	const handleValheimFood = () => {
		setValheimFood(!valheimFood);
	};

	const foodList = parseFoods(valheimFood);

	return (
		<div>
			<p>
				<Checkbox
					checked={valheimFood}
					onChange={handleValheimFood}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				Show Valheim Foods
			</p>
			<div className={style.foodTable}>
				<MaterialTable
					title="Foods"
					icons={tableIcons}
					columns={columns}
					data={foodList}
					className={style.foodTable}
					options={{
						search: false,
						draggable: false,
						pageSize: -1,
						emptyRowsWhenPaging: false,
						showTitle: false,
						rowStyle: {
							padding: '0px'
						}
					}}
				/>
			</div>
		</div>
	);
};

export default FoodTable;
