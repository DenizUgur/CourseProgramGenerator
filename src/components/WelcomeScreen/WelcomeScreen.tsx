import React from 'react';
import Logo from '../../assets/AppLogo.png';

import { Box, Image, Heading } from 'grommet';
import { Button, Avatar } from '@material-ui/core';

const { shell } = window.require('electron');

export default function WelcomeScreen() {
	return (
		<Box fill flex justify="center" align="center">
			<Image src={Logo} width="200px" />
			<Heading level="2">Course Program Generator</Heading>
			<Box gap="small" justify="center" direction="row" align="center">
				<i>Made by</i>
				<Button
					variant="outlined"
					onClick={() => shell.openExternal('https://denizugur.dev')}
					startIcon={
						<Avatar
							alt="Deniz Uğur"
							src="https://avatars1.githubusercontent.com/u/7467169?s=460&u=45ffd91e0bf5393e22bce1f12a7ffdfdfb4c816d&v=4"
						/>
					}>
					Deniz Uğur
				</Button>
			</Box>
		</Box>
	);
}
