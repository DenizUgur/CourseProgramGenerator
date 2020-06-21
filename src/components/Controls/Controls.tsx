import React, { useState } from 'react';
import styles from './Controls.module.scss';
import { Box } from 'grommet';
import { Autocomplete } from '@material-ui/lab';
import { Portal, Chip, TextField, Button } from '@material-ui/core';

export default function Controls(props: any) {
	const {data} = props;
	
	const container = React.useRef(null);
	const [selectedCourses, setSelectedCourses] = useState<any>([]);

	return (
		<Box flex justify="center" direction="row" align="center">
			<Box
				style={{
					flex: 1,
					height: '80%',
				}}
				pad={{ horizontal: 'small' }}
				justify="center"
				align="center">
				<Box
					style={{ fontSize: '7rem' }}
					fill="vertical"
					justify="center"
					align="center">
					32
				</Box>
				CREDITS
			</Box>
			<Box
				style={{ flex: 3 }}
				pad={{ bottom: 'small' }}
				fill="vertical"
				direction="column"
				justify="center">
				<Box style={{ flex: 2 }}>
					<Box
						style={{
							flex: 1,
							fontSize: selectedCourses.length ? '1.2rem' : '1rem',
							textAlign: 'center',
						}}
						justify="center">
						{!selectedCourses.length ? (
							<div>
								<p>
									Hello, welcome to <b>Course Program Generator</b>. You can start
									generating your course program by <i>typing</i> the courses you want to
									the input field bellow.
								</p>
								<p>
									<b>Best possible</b> program will be presented above.
								</p>
							</div>
						) : (
							<div>
								Welcome to <b>Course Program Generator</b>
							</div>
						)}
					</Box>
					<Box
						className={styles.chipArray}
						ref={container}
						justify="center"
						direction="row"
					/>
				</Box>
				<Autocomplete
					style={{ flex: 1 }}
					multiple
					options={data}
					getOptionLabel={d => d.title}
					value={selectedCourses}
					onChange={(_: any, newValue: any) => {
						setSelectedCourses(newValue);
					}}
					renderTags={(value: any, getTagProps) => (
						<Portal container={container.current}>
							{value.map((option: any, index: number) => (
								<Chip
									variant="outlined"
									label={option.name}
									{...getTagProps({ index })}
								/>
							))}
						</Portal>
					)}
					renderInput={params => (
						<TextField
							{...params}
							variant="filled"
							label="Courses"
							placeholder="Start typing your courses..."
						/>
					)}
				/>
			</Box>
			<Box
				style={{
					flex: 1,
				}}
				pad={{ horizontal: 'small' }}
				fill="vertical"
				direction="column"
				justify="evenly">
				<Button>Download latest catalog</Button>
				<Box direction="row" justify="evenly">
					<Button color="primary" variant="outlined">
						Unavailable Hours
					</Button>
					{/* <Button
						onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
						{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
					</Button> */}
				</Box>
			</Box>
		</Box>
	);
}
