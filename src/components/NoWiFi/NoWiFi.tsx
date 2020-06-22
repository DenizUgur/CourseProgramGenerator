import React from 'react';
import styles from './NoWiFi.module.scss';

import { ReactComponent as WiFi } from '../../assets/wifi.svg';

import { Box, Heading } from 'grommet';
import { Button, useTheme } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const { remote } = window.require('electron');

export default function NoWiFi(props: any) {
	const { onRetry } = props;

	const themeMode = useSelector((state: AppState) => state.system.mode);
	const themeMui = useTheme();

	return (
		<Box direction="column" justify="center" align="center" fill>
			<WiFi className={styles[themeMode]} />
			<Heading level="2">No internet connection detected...</Heading>
			<p style={{ width: '50vw', textAlign: 'center' }}>
				We need internet connection to download latest available course catalog.
				Please connect to internet and retry.
			</p>
			<Box justify="center" direction="row" gap="medium">
				<Button
					variant="contained"
					onClick={onRetry}
					style={{
						backgroundColor: themeMui.palette.success[themeMode],
						color: themeMui.palette.success.contrastText,
					}}>
					Retry
				</Button>
				<Button
					variant="contained"
					onClick={() =>
						process.platform !== 'darwin'
							? remote.app.exit(0)
							: remote.getCurrentWindow().close
					}
					style={{
						backgroundColor: themeMui.palette.error[themeMode],
						color: themeMui.palette.error.contrastText,
					}}>
					Quit
				</Button>
			</Box>
		</Box>
	);
}
