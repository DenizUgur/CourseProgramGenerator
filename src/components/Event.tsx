import React from 'react';
import styles from './Event.module.scss';
import { Box } from 'grommet';

export default function Event(props: any) {
	const { day, timeStart, timeEnd } = props;
	return (
		<Box
			className={styles.main}
			style={{
				gridColumn: `track-${day}`,
				gridRow: `time-${timeStart} / time-${timeEnd}`,
			}}>
			{props.children}
		</Box>
	);
}
