import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import parseFoods from '../data/food';
import RecipeCell from './RecipeCell';

import style from './style.module.scss';

interface Column {
	id: 'image' | 'food' | 'health' | 'stamina' | 'duration' | 'recipe';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
	density: number;
}

export default function Content(): React.ReactElement<unknown> {
	const [valheimFood, setValheimFood] = React.useState(false);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns: readonly Column[] = [
		{ id: 'image', label: 'Image' },
		{ id: 'name', label: 'Name', minWidth: 5 },
		{
			id: 'food',
			label: 'Health',
			minWidth: 10,
			align: 'right',
			format: (value: number) => value.toLocaleString('en-US'),
		},
		{
			id: 'stamina',
			label: 'Stamina',
			minWidth: 10,
			align: 'right'
		},
		{
			id: 'burn',
			label: 'Burn',
			minWidth: 10,
			align: 'right',
			format: (value: number) => value.toFixed(2),
		},
		{
			id: 'prefab',
			label: 'Prefab ID',
			minWidth: 10,
			align: 'center',
			format: (value: number) => value.toFixed(2),
		},
		{
			id: 'recipe',
			label: 'Ingredients',
			align: 'right',
			// format: (value: number) => value.,
		}
	];

	const handleValheimFood = () => {
		setValheimFood(!valheimFood);
	};

	const foodList = parseFoods(valheimFood);

	return (
		<>
			<label>
				<input type="checkbox" checked={valheimFood} onChange={handleValheimFood} />
				Show Valheim Foods
			</label>
			<TableContainer sx={{ maxWidth: 900 }} className={style.foodTable}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									className={`${style.foodTableHead} ${style['foodTableHead--'+column.id]}`}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{foodList
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
										{columns.map((column) => {
											const value = row[column.id];
											const isRecipeCell = column.id === 'recipe';
											const isImageCell = column.id === 'image';
											return (
												<TableCell key={column.id} align={column.align} className={`${style.foodTableCell} ${style['foodTableCell--'+column.id]}`}>
													{isRecipeCell ? (
														<RecipeCell
															ingredients={value}
														/>
													) : isImageCell ? (
														<img src={value} width="32" height="32" />
													) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
