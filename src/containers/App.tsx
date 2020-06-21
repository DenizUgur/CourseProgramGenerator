import React, { useState } from 'react';
import styles from './App.module.scss';

import { Schedule, Controls } from '../components';

import { Main, Box, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

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
	const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

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
			}),
		[themeMode]
	);

	const [data, setData] = useState(/*[
		{
			name: 'CS.240',
			title: 'CS.240 - Bişi bişi',
			day: 1,
			timeStart: '0830',
			timeEnd: '1130',
		},
		{
			name: 'EE.203',
			title: 'EE.203 - ee falan',
			day: 2,
			timeStart: '1030',
			timeEnd: '1230',
		},
		{
			name: 'MATH.212',
			title: 'MATH.212 - diff',
			day: 4,
			timeStart: '1230',
			timeEnd: '1530',
		},
		{
			name: 'ENG.102',
			title: 'ENG.102 - eng',
			day: 3,
			timeStart: '1330',
			timeEnd: '1530',
		},
	]*/);

	return (
		<Grommet theme={themeGrommet} full themeMode={themeMode}>
			<ThemeProvider theme={themeMui}>
				<Main align="center">
					<Box className={styles.schedule} fill="horizontal" background="brand">
						<Schedule data={data} />
					</Box>
					<Box
						className={[styles[themeMode], styles.controls].join(' ')}
						fill="horizontal"
						justify="center">
						<Controls data={data} />
					</Box>
				</Main>
			</ThemeProvider>
		</Grommet>
	);
}

export default App;
