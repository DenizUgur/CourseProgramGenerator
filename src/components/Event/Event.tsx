import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

import styles from './Event.module.scss';

import { Box } from 'grommet';
import { useTheme } from '@material-ui/core';

import randomColor from 'randomcolor';

export default function Event(props: any) {
	const theme = useTheme();
	const themeMode = useSelector((state: AppState) => state.system.mode);
	const color = randomColor({ luminosity: themeMode });

	const slots = Array(props.hours.length)
		.fill(null)
		.map((_: any, index: number) => {
			const area = props.hours[index].area > 2;
			return (
				<Box
					key={index}
					className={styles.main}
					style={{
						gridColumn: `track-${props.hours[index].day}`,
						gridRow: `time-${props.hours[index].timeStart} / time-${props.hours[index].timeEnd}`,
						backgroundColor: color,
						color: theme.palette.getContrastText(color),
					}}
					direction="column"
					align="start"
					justify={area ? 'end' : 'center'}
					pad={{ left: '3%' }}
					fill>
					<span style={{ fontSize: '20px' }}>
						{props.name}.{props.class}
					</span>
					{area && (
						<>
							<span style={{ fontSize: '12px' }}>{props.title}</span>
							<span style={{ fontSize: '12px' }}>{props.teacher}</span>
						</>
					)}
				</Box>
			);
		});
	return <>{slots}</>;
}
