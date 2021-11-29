import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import { Text, Image, HStack, Link, VStack } from 'native-base';
import parseFoods from '../data/food';
import HeaderCol from './HeaderCol';
import RecipeCell from './RecipeCell';

import style from './style.module.scss';

// interface FoodCellProps {
// 	name: string;
// 	icon: ImageSourcePropType;
// 	link: string;
// }
// const FoodCell: FunctionComponent<FoodCellProps> = ({ name, icon, link }) => {
// 	return (
// 		<Cell>
// 			<Link href={link}>
// 				<VStack alignItems="center">
// 					<Image size="sm" source={icon} alt={name} />
// 					{name}
// 				</VStack>
// 			</Link>
// 		</Cell>
// 	);
// };
// interface IngredientItemProps {
// 	item: Food | InedibleItem;
// 	amount: ImageSourcePropType;
// }

interface Column {
	id: 'food' | 'health' | 'stamina' | 'duration' | 'recipe';
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

// const IngredientItem: FunctionComponent<IngredientItemProps> = ({
// 	item,
// 	amount
// }) => {
// 	return (
// 		<Link href={item.link}>
// 			<HStack alignItems="center">
// 				<Image size="xs" source={item.icon} alt={item.name} />
// 				<Text key={item.name}>{`${item.name} x${amount}`}</Text>
// 			</HStack>
// 		</Link>
// 	);
// };

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
		{ id: 'name', label: 'Name', minWidth: 5 },
		{
			id: 'food',
			label: 'health',
			minWidth: 10,
			align: 'right',
			format: (value: number) => value.toLocaleString('en-US'),
		},
		{
			id: 'stamina',
			label: 'stamina',
			minWidth: 10,
			align: 'right',
			format: (value: number) => value.toFixed(2),
		},
		{
			id: 'burn',
			label: 'duration',
			minWidth: 10,
			align: 'right',
			format: (value: number) => value.toFixed(2),
		},
		{
			id: 'recipe',
			label: 'ingredients',
			align: 'right',
			// format: (value: number) => value.,
		}
	];

	const handleValheimFood = () => {
		setValheimFood(!valheimFood);
	};

	const foodList = parseFoods(valheimFood);

	// const getRecipeItems = (food: Food): string[] => {
	// 	return food.ingredients.map(ingredient => ingredient.name);
	// };

	// console.log(foodList);

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
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											const isRecipeCell = column.id === 'recipe';
											return (
												<TableCell key={column.id} align={column.align} className={style.foodTableCell}>
													{isRecipeCell ? (
														<RecipeCell
															ingredients={value}
														/>
													) : column.format && typeof value === 'number'
														? column.format(value)
														: value}
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
