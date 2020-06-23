import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, snackbar, download } from '../store';

import styles from './App.module.scss';

import { Schedule, Controls, WelcomeScreen } from '../components';

import { Main, Box, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

import { createMuiTheme, ThemeProvider, Snackbar } from '@material-ui/core';
import NoWiFi from '../components/NoWiFi/NoWiFi';
import { Alert } from '@material-ui/lab';

const themeGrommet = deepMerge(grommet, {
	global: {
		colors: {
			background: {
				dark: '#242424',
				light: '#e2e2e2',
			},
			brand: {
				dark: '#333333',
			},
		},
		font: {
			family: 'Quicksand',
			size: '18px',
			height: '20px',
		},
	},
});

function App() {
	const dispatch = useDispatch();

	const themeMode = useSelector((state: AppState) => state.system.mode);
	const data = useSelector((state: AppState) => state.algorithm.result);

	const snackbarData = useSelector((state: AppState) => state.system.snackbar);

	const [online, setOnline] = useState(true);
	const checkInternet = useCallback(() => {
		let status = navigator.onLine;
		setOnline(status);
		if (status) dispatch(download());
	}, [dispatch]);

	useEffect(() => {
		checkInternet();
		return () => {};
	}, [checkInternet]);

	const themeMui = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: themeMode,
					primary: {
						main: '#cc0000',
					},
				},
				typography: {
					fontFamily: 'Quicksand',
				},
				overrides: {
					MuiTooltip: {
						tooltip: {
							fontSize: '0.8rem',
						},
					},
					MuiSnackbar: {
						root: {
							maxWidth: "30vw"
						}
					}
				},
			}),
		[themeMode]
	);

	return (
		<Grommet theme={themeGrommet} full themeMode={themeMode}>
			<ThemeProvider theme={themeMui}>
				<Snackbar
					open={snackbarData !== undefined}
					onClose={() => dispatch(snackbar())}
					key={snackbarData?.message}
					autoHideDuration={snackbarData?.duration}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
					<Alert severity={snackbarData?.level}>{snackbarData?.message}</Alert>
				</Snackbar>
				{online ? (
					<Main align="center">
						<Box className={styles.schedule} fill="horizontal" background="brand">
							{data.primary.length > 0 ? (
								<Schedule data={data.primary} />
							) : (
								<WelcomeScreen />
							)}
						</Box>
						<Box
							className={[styles[themeMode], styles.controls].join(' ')}
							fill="horizontal"
							justify="center">
							<Controls />
						</Box>
					</Main>
				) : (
					<NoWiFi onRetry={() => checkInternet()} />
				)}
			</ThemeProvider>
		</Grommet>
	);
}

export default App;
