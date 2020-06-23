import React from 'react';
import styles from './Schedule.module.scss';
import { Grid, Box } from 'grommet';
import moment from 'moment';
import { Event } from '../index';
import { Course } from '../../store/modules/algorithm/types';

export default function Schedule(props: any) {
	const fixHour = (hour: string) => {
		if (hour.charAt(2) === '4') {
			return hour.substring(0, 2) + '3' + hour.substring(3);
		}
		return hour;
	};

	const data = props.data.map((val: Course, _: number) => {
		return {
			...val,
			hours: val.hours.map((hour: number[], _: number) => {
				return {
					day: moment(hour[0]).day(),
					timeStart: fixHour(moment(hour[0]).format('HHmm')),
					timeEnd: fixHour(moment(hour[1]).format('HHmm')),
				};
			}),
		};
	});

	let dayTracks = Array(7).fill(null);

	const calcArea = (x: string, y: string) =>
		Math.abs(moment(x, 'HHmm').diff(moment(y, 'HHmm'), 'm')) / 30;

	const totalUsedArea = data.reduce((accumulator: number, { hours }: any) => {
		return (
			accumulator +
			hours.reduce((acc: number, { timeStart, timeEnd }: any) => {
				return acc + calcArea(timeStart, timeEnd);
			}, 0)
		);
	}, 0);

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
