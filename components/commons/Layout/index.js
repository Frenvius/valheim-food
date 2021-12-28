import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import styles from './style.module.scss';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ colorMode, theme, children }) => {

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Head>
				<title>Valharvest Foods</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<AppBar position="static">
				<Toolbar variant="dense" className={styles.layout__navbar}>
					<Typography variant="h6" color="inherit" component="div">
						<Link href="/">Valharvest Food List</Link>
					</Typography>
					<Button color="inherit">
						<Link href="/translate">Submit Translate</Link>
					</Button>
					<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
						{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<div className={styles.layout}>
				<div className={styles.layout__content}>{children}</div>
			</div>
		</Box>
	);
};

export default Layout;
