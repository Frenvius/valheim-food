import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaterialTable from '@material-table/core';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import parseFoods from './data/foods';
import RecipeCell from './RecipeCell';
import HtmlTooltip from '../commons/HtmlTooltip';
import style from './style.module.scss';

const FoodTable = ({ mode }) => {
	const [valheimFood, setValheimFood] = useState(false);
	const [valharvestFood, setValharvestFood] = useState(true);
	const [boneAppetitFood, setBoneAppetitFood] = useState(false);

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
						<HtmlTooltip title={<img src={`${rowData.image}`} alt={`${rowData.name}`} width="128px" />}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={`${rowData.image}`} alt={`${rowData.name}`} width="32px" />
						</HtmlTooltip>
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
			width: 60,
			minWidth: 60,
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
			headerStyle: { padding: '5px' },
			render: rowData => {
				const station = rowData.station;
				const stationImg = `/img/${station}_icon.png`;
				return (
					<div style={{ width: '32px' }}>
						{station && (
							<HtmlTooltip
								title={
									<div className={style.stationStyle}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={stationImg} alt={`${station}`} width="128px" />
										<span>{station}</span>
									</div>
								}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={stationImg} alt={`${station}`} width="32px" />
							</HtmlTooltip>
						)}
					</div>
				);
			}
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
				return <RecipeCell ingredients={rowData.recipe} mode={mode} />;
			}
		}
	];

	const handleValharvestFoods = () => {
		setValharvestFood(!valharvestFood);
	};

	const handleBoneAppetitFoods = () => {
		setBoneAppetitFood(!boneAppetitFood);
	};

	const handleValheimFoods = () => {
		setValheimFood(!valheimFood);
	};

	const foodList = parseFoods(valharvestFood, boneAppetitFood, valheimFood);

	return (
		<div>
			<p>
				<Checkbox
					checked={valharvestFood}
					onChange={handleValharvestFoods}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				Show Valharvest Foods
				<Checkbox
					checked={boneAppetitFood}
					onChange={handleBoneAppetitFoods}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				Show BoneAppetit Foods
				<Checkbox
					checked={valheimFood}
					onChange={handleValheimFoods}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				Show Valheim Foods
			</p>
			<div className={style.foodTable}>
				<MaterialTable
					title="Foods"
					columns={columns}
					data={foodList}
					className={style.foodTable}
					options={{
						search: false,
						draggable: false,
						pageSize: 1000,
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
