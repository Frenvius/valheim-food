import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styles from './style.module.scss';
import Head from 'next/head';

const Layout = ({ children }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<AppBar position="static">
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit" component="div">
						Valharvest Food List
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={styles.layout}>
				<div className={styles.layout__content}>{children}</div>
			</div>
		</Box>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
