/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, system_init, theme } from '../store';

import styles from './App.module.scss';

import { Schedule, Controls, WelcomeScreen, NoWiFi } from '../components';

import { Main, Box } from 'grommet';

import { useMediaQuery } from '@material-ui/core';
import { useSnackbar } from 'notistack';

function App() {
	const dispatch = useDispatch();

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const algorithmData = useSelector((state: AppState) => state.algorithm);
	const snackbarData = useSelector((state: AppState) => state.system.snackbar);

	const themeMode = useSelector((state: AppState) => state.system.mode);
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

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	useEffect(() => {
		if (snackbarData?.show) {
			enqueueSnackbar(
				{
					message: snackbarData?.message,
					update: snackbarData?.update,
					level: snackbarData.level,
					handleDismiss: (key: any) => closeSnackbar(key),
				},
				{
					autoHideDuration: snackbarData?.duration,
				}
			);
		}
		return () => {};
	}, [snackbarData]);

	return online ? (
		<Main align="center">
			<Box className={styles.schedule} fill="horizontal" background="brand">
				{algorithmData.result.primary.length > 0 ||
				algorithmData.unavailable_hours.length > 0 ? (
					<Schedule data={algorithmData.result.primary} />
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
	);
}

export default App;
