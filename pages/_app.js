import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '../styles/globals.scss';
import { userService } from 'services';
import Layout from '../components/commons/Layout';
import { createTheme } from '@mui/material/styles';
import createEmotionCache from 'helpers/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = (props) => {
	const router = useRouter();
	const [mode, setMode] = React.useState('dark');
	const [authorized, setAuthorized] = useState(false);
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const authCheck = (url) => {
		const publicPaths = ['/', '/login', '/translate', '/foods'];
		const path = url.split('?')[0];
		if (!userService.userValue && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: '/login',
				query: { returnUrl: router.asPath }
			});
		} else {
			setAuthorized(true);
		}
	};

	useEffect(() => {
		authCheck(router.asPath);

		const hideContent = () => setAuthorized(false);
		router.events.on('routeChangeStart', hideContent);
		router.events.on('routeChangeComplete', authCheck);

		return () => {
			router.events.off('routeChangeStart', hideContent);
			router.events.off('routeChangeComplete', authCheck);
		};
	}, []);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			}
		}),
		[]
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode
				}
			}),
		[mode]
	);

	return (
		<CacheProvider value={emotionCache}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Layout colorMode={colorMode} theme={theme}>
						{authorized && <Component {...pageProps} mode={mode} />}
					</Layout>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
}

export default App;
