import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, snackbar, system_init, theme } from '../store';

import styles from './App.module.scss';

import { Schedule, Controls, WelcomeScreen, NoWiFi } from '../components';

import { Main, Box, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

import {
	createMuiTheme,
	ThemeProvider,
	Snackbar,
	Button,
	useMediaQuery,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const { shell } = window.require('electron');

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

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const themeMode = useSelector((state: AppState) => state.system.mode);
	const data = useSelector((state: AppState) => state.algorithm.result);

	const snackbarData = useSelector((state: AppState) => state.system.snackbar);
	const online = useSelector((state: AppState) => state.system.online);

	const systemInit = useCallback(() => {
		dispatch(system_init());
	}, [dispatch]);

	useEffect(() => {
		systemInit();
		return () => {};
	}, [systemInit]);

	useEffect(() => {
		dispatch(theme(prefersDarkMode ? 'dark' : 'light'));
		return () => {};
	}, [dispatch, prefersDarkMode]);

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
							maxWidth: '40vw',
						},
					},
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
					<Alert
						action={
							snackbarData?.update ? (
								<Button
									onClick={() =>
										shell.openExternal(
											'https://github.com/DenizUgur/CourseProgramGenerator#download-latest-version'
										)
									}>
									Download Here
								</Button>
							) : undefined
						}
						severity={snackbarData?.level}>
						{snackbarData?.message}
					</Alert>
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
					<NoWiFi onRetry={() => systemInit()} />
				)}
			</ThemeProvider>
		</Grommet>
	);
}

export default App;
