import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

import FoodTable from '../../components/FoodTable';

const HomePage = ({ mode }) => {
	return (
		<div>
			<Typography mt={1}>
				Check out this project repos on Github:{' '}
				<Link href={'https://github.com/Frenvius/valheim-food'}>This Table</Link>{' '}
				<Link href={'https://github.com/Frenvius/valharvest'}>Valhavest mod</Link>
			</Typography>
			<Typography mt={1}>
				Displays food items from Valharvest mod and their stats. Sort for each stat by clicking the headers. All
				stats and images were pulled from the Valheim Wiki
			</Typography>
			<Typography mt={1}>Page under construction</Typography>
			<FoodTable mode={mode} />
		</div>
	);
};

export default HomePage;
