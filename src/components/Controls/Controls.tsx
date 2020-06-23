import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, theme, deploy } from '../../store';

import styles from './Controls.module.scss';

import { Box } from 'grommet';
import { Autocomplete } from '@material-ui/lab';
import {
	Portal,
	Chip,
	TextField,
	Button,
	Tooltip,
	useTheme,
} from '@material-ui/core';
import { Course } from '../../store/modules/algorithm/types';

export default function Controls() {
	const themeData = useTheme();
	const themeMode = useSelector((state: AppState) => state.system.mode);
	const data_status = useSelector((state: AppState) => state.system.data_status);

	const options = useSelector((state: AppState) => state.algorithm.all_courses);
	const result = useSelector((state: AppState) => state.algorithm.result);

	const selectedCourses = useSelector(
		(state: AppState) => state.algorithm.selected_courses
	);
	const dispatch = useDispatch();

	const container = React.useRef(null);

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
					{result.primary.reduce((acc, course) => {
						return acc + course.credits;
					}, 0)}
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
						justify="start"
						direction="row"
					/>
				</Box>
				<Tooltip
					title={
						data_status !== 'ready'
							? 'We are downloading the catalog at the moment please wait.'
							: ''
					}
					disableHoverListener={data_status === 'ready'}>
					<span>
						<Autocomplete
							disabled={data_status !== 'ready'}
							style={{ flex: 1 }}
							multiple
							options={options}
							getOptionLabel={d => d.name + ' - ' + d.title}
							value={selectedCourses}
							getOptionSelected={(compare: Course, to: Course) => {
								if (compare.corequisite)
									return (
										compare.corequisite.includes(to.name) || compare.name === to.name
									);
								else return compare.name === to.name;
							}}
							onChange={(_: any, newValue: any[]) => {
								dispatch(deploy(newValue));
							}}
							renderTags={(value: any, getTagProps) => (
								<Portal container={container.current}>
									{value.map((option: Course, index: number) => {
										const style = result.primary.map(r => r.name).includes(option.name)
											? {
													backgroundColor: themeData.palette.success[themeMode],
													color: themeData.palette.success.contrastText,
											  }
											: {
													backgroundColor: themeData.palette.error[themeMode],
													color: themeData.palette.error.contrastText,
											  };

										const core = [
											<Chip
												key={option.name}
												style={style}
												variant="outlined"
												label={option.name}
												{...getTagProps({ index })}
											/>,
										];

										const corequisites = option.corequisite
											? option.corequisite.map((val: string, index: number) => {
													return (
														<Chip
															key={val}
															style={style}
															variant="outlined"
															label={val}
															{...getTagProps({ index })}
															onDelete={undefined}
														/>
													);
											  })
											: '';

										return [core, corequisites];
									})}
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
					</span>
				</Tooltip>
			</Box>
			<Box
				style={{
					flex: 1,
				}}
				pad={{ horizontal: 'small' }}
				fill="vertical"
				direction="column"
				justify="evenly">
				<Tooltip
					placement="top-end"
					title={
						data_status !== 'ready'
							? 'We are downloading the catalog at the moment please wait.'
							: ''
					}
					disableHoverListener={data_status === 'ready'}>
					<span style={{ justifyContent: 'center', display: 'flex' }}>
						<Button
							disabled={data_status !== 'ready'}
							color="primary"
							variant="outlined">
							Unavailable Hours
						</Button>
					</span>
				</Tooltip>

				<Button onClick={() => dispatch(theme())}>
					{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
				</Button>
			</Box>
		</Box>
	);
}
