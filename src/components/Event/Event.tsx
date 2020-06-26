import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

import styles from './Event.module.scss';

import { Box } from 'grommet';
import { useTheme, Button } from '@material-ui/core';

import randomColor from 'randomcolor';

export function EmptyEvent(props: any) {
	const theme = useTheme();
	return (
		<Box
			className={[styles.main, props.onDelete ? styles.uh : undefined].join(' ')}
			style={
				props.color
					? {
							gridColumn: `track-${props.day}`,
							gridRow: `time-${props.timeStart} / time-${props.timeEnd}`,
							backgroundColor: props.color,
							color: theme.palette.getContrastText(props.color),
					  }
					: {
							gridColumn: `track-${props.day}`,
							gridRow: `time-${props.timeStart} / time-${props.timeEnd}`,
					  }
			}
			direction="column"
			align={props.onDelete ? 'center' : 'start'}
			justify={props.area ? 'end' : 'center'}
			pad={{ left: '3%' }}
			fill>
			{props.children ? (
				props.children
			) : (
				<Button variant="outlined" onClick={props.onDelete}>
					Remove
				</Button>
			)}
		</Box>
	);
}

export default function Event(props: any) {
	const themeMode = useSelector((state: AppState) => state.system.mode);
	let color = useRef(randomColor({ luminosity: themeMode }));

	useMemo(() => {
		color.current = randomColor({ luminosity: themeMode });
	}, [themeMode]);

	const slots = Array(props.hours.length)
		.fill(null)
		.map((_: any, index: number) => {
			const area = props.hours[index].area > 2;
			return (
				<EmptyEvent
					key={index}
					day={props.hours[index].day}
					timeStart={props.hours[index].timeStart}
					timeEnd={props.hours[index].timeEnd}
					color={color.current}>
					<span style={{ fontSize: '20px' }}>
						{props.name}.{props.class}
					</span>
					{area && (
						<>
							<span style={{ fontSize: '12px' }}>{props.title}</span>
							<span style={{ fontSize: '12px' }}>{props.teacher}</span>
						</>
					)}
				</EmptyEvent>
			);
		});
	return <>{slots}</>;
}
