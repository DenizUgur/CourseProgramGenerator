import React from 'react';
import styles from './Schedule.module.scss';
import { Grid, Box } from 'grommet';
import moment from 'moment';
import { Event } from '../index';

export default function Schedule(props: any) {
	const { data } = props;

	let dayTracks = Array(7).fill(null);

	const calcArea = (x: string, y: string) =>
		Math.abs(moment(x, 'HHmm').diff(moment(y, 'HHmm'), 'm')) / 30;

	const totalUsedArea = data.reduce(
		(accumulator: number, { timeStart, timeEnd }: any) => {
			return accumulator + calcArea(timeStart, timeEnd);
		},
		0
	);

	const timeCount = 23;
	let timeSlots = Array(timeCount).fill(null);
	let startTime = moment('0830', 'HHmm');

	dayTracks = dayTracks.map((_: any, index: number) => {
		if (index === 0) return `[times] 4em`;
		if (index === 1) return `[track-${index}-start] 1fr`;
		if (index === 6) return `[track-${index - 1}-end]`;
		return `[track-${index - 1}-end track-${index}-start] 1fr`;
	});

	timeSlots = timeSlots.map((_: any, index: number) => {
		if (index === 0) return `[tracks] 8vh`;
		return `[time-${moment(startTime)
			.add(30 * (index - 1), 'm')
			.format('HHmm')}] 1fr`;
	});

	return (
		<Grid fill className={styles.grid} rows={timeSlots} columns={dayTracks}>
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
			{Array(5)
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
			{data.map((value: any, index: number) => {
				return <Event key={index} {...value} />;
			})}
			{Array(5 * (timeCount - 1) - totalUsedArea + 1)
				.fill(null)
				.map((_: any, index: number) => {
					return <div key={index} />;
				})}
		</Grid>
	);
}
