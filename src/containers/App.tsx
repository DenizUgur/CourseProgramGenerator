import React from 'react';
import styles from './App.module.scss';
import { Main, Box, Grommet, Clock, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import moment from 'moment';
import { Event } from '../components';

const theme = deepMerge(grommet, {
	global: {
		colors: {
			background: {
				dark: 'dark-1',
			},
		},
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
});

function App() {
	let dayTracks = Array(9).fill(null);

	const calcArea = (x: string, y: string) =>
		Math.abs(moment(x, 'HHmm').diff(moment(y, 'HHmm'), 'm')) / 30;

	const testData = [
		{ day: 1, timeStart: '0830', timeEnd: '1130' },
		{ day: 2, timeStart: '1030', timeEnd: '1230' },
		{ day: 4, timeStart: '1230', timeEnd: '1530' },
	];

	const totalUsedArea = testData.reduce(
		(accumulator, { timeStart, timeEnd }) => {
			return accumulator + calcArea(timeStart, timeEnd);
		},
		0
	);

	const timeCount = 21;
	let timeSlots = Array(timeCount).fill(null);
	let startTime = moment('0830', 'HHmm');

	dayTracks = dayTracks.map((_: any, index: number) => {
		if (index === 0) return `[times] 4em`;
		if (index === 1) return `[track-${index}-start] 1fr`;
		if (index === 8) return `[track-${index - 1}-end]`;
		return `[track-${index - 1}-end track-${index}-start] 1fr`;
	});

	timeSlots = timeSlots.map((_: any, index: number) => {
		if (index === 0) return `[tracks] 10vh`;
		return `[time-${moment(startTime)
			.add(30 * (index - 1), 'm')
			.format('HHmm')}] 1fr`;
	});

	return (
		<Grommet theme={theme} full themeMode="dark">
			<Main align="center">
				<Box className={styles.schedule} fill="horizontal">
					<Grid
						fill
						className={styles.grid}
						rows={timeSlots}
						columns={dayTracks}>
						{Array(timeCount - 1)
							.fill(null)
							.map((_: any, index: number) => {
								const time = moment(startTime).add(30 * index, 'm');
								return (
									<Box
										key={index}
										style={{
											gridColumn: 'times',
											gridRow: `time-${time.format('HHmm')}`,
										}}>
										{index % 2 === 0 ? time.format('HH:mm') : ''}
									</Box>
								);
							})}
						{Array(7)
							.fill(null)
							.map((_: any, index: number) => {
								return (
									<Box
										key={index + 1}
										style={{
											gridColumn: `track-${index + 1}`,
											gridRow: `tracks`,
										}}>
										{moment('Monday', 'dddd').add(index, 'd').format('dddd')}
									</Box>
								);
							})}
						{testData.map((data: any, index: number) => {
							return (
								<Event
									key={index}
									day={data.day}
									timeStart={data.timeStart}
									timeEnd={data.timeEnd}>
									{data.timeStart}
								</Event>
							);
						})}
						{Array(7 * (timeCount - 1) - totalUsedArea + 1)
							.fill(null)
							.map((_: any, index: number) => {
								return <div key={index} />;
							})}
					</Grid>
				</Box>
				<Box className={styles.controls} justify="center">
					<Clock type="analog" />
				</Box>
			</Main>
		</Grommet>
	);
}

export default App;
