import React from 'react';

import { useSelector } from 'react-redux';
import { AppState } from '../store';

import { SnackbarProvider } from 'notistack';

import {
	createMuiTheme,
	ThemeProvider,
	Button,
	IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const { shell } = window.require('electron');

export default function MainThemeProvider(props: any) {
	const themeMode = useSelector((state: AppState) => state.system.mode);

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

	const themeMui = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: themeMode,
					primary: {
						main: '#F0203A',
					},
					secondary: {
						main: "#FA9950"
					}
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
				<SnackbarProvider
					content={(key: string, body: any) => (
						<Alert
							id={key}
							action={
								body.update ? (
									<Button
										onClick={() =>
											shell.openExternal(
												'https://github.com/DenizUgur/CourseProgramGenerator#download-latest-version'
											)
										}>
										Download Here
									</Button>
								) : (
									<IconButton onClick={() => body.handleDismiss(key)}>
										<CloseIcon />
									</IconButton>
								)
							}
							severity={body.level}>
							{body.message}
						</Alert>
					)}>
					{props.children}
				</SnackbarProvider>
			</ThemeProvider>
		</Grommet>
	);
}
