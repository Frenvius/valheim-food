import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import '../styles/globals.scss';
import { createTheme } from '@mui/material/styles';
import Layout from '../components/commons/Layout';

const clientSideEmotionCache = createEmotionCache();
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = (props) => {
	const [mode, setMode] = React.useState('dark');
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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
						<Component {...pageProps} mode={mode} />
					</Layout>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
};

export default App;
