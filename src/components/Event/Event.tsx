import React from 'react';
import styles from './Event.module.scss';
import { Box } from 'grommet';

export default function Event(props: any) {
	const slots = Array(props.hours.length)
		.fill(null)
		.map((_: any, index: number) => {
			return (
				<Box
					key={index}
					className={styles.main}
					style={{
						gridColumn: `track-${props.hours[index].day}`,
						gridRow: `time-${props.hours[index].timeStart} / time-${props.hours[index].timeEnd}`,
					}}>{props.name}</Box>
			);
		});
	return <>{slots}</>;
}
