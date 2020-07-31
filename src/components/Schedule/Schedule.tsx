/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, deploy } from '../../store';
import { Course, HourType } from '../../store/modules/algorithm/types';

import styles from './Schedule.module.scss';

import { Grid, Box } from 'grommet';
import { Event, EmptyEvent } from '../index';

import originalMoment from 'moment';
const moment = (...args: any) => originalMoment.utc(...args);

export default function Schedule(props: any) {
	const fixHour = (hour: string) => {
		if (hour.charAt(2) === '4') {
			return hour.substring(0, 2) + '3' + hour.substring(3);
		}
		return hour;
	};

	const calcArea = (x: string, y: string) =>
		Math.abs(moment(x, 'HHmm').diff(moment(y, 'HHmm'), 'm')) / 30;

	const data = props.data.map((val: Course, _: number) => {
		return {
			...val,
			hours: val.hours.map((hour: number[], _: number) => {
				const timeStart = fixHour(moment(hour[0]).format('HHmm'));
				const timeEnd = fixHour(moment(hour[1]).format('HHmm'));
				const area = calcArea(timeStart, timeEnd);

				return {
					day: moment(hour[0]).day(),
					timeStart,
					timeEnd,
					area,
				};
			}),
		};
	});

	let totalUsedArea = data.reduce((accumulator: number, { hours }: any) => {
		return (
			accumulator +
			hours.reduce((acc: number, { area }: any) => {
				return acc + area;
			}, 0)
		);
	}, 0);

	const timeCount = 26;
	let timeSlots = Array(timeCount).fill(null);
	let startTime = moment('0830', 'HHmm');
	let dayTracks = Array(7).fill(null);

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

	// Track Unavailable Hours Modification
	const leftUpmostGridCell = useRef<HTMLDivElement>(null);
	const firstGridCell = useRef<HTMLDivElement>(null);

	const unavailable_hours = useSelector(
		(state: AppState) => state.algorithm.unavailable_hours
	);

	const dispatch = useDispatch();

	const [pos, setPos] = useState([0, 0]);
	const [startPos, setStartPos] = useState([0, 0]);
	const [draw, setDraw] = useState(false);
	const [draft, setDraft] = useState<HourType[]>();

	const [windowAttr, setWindowAttr] = useState({
		window: {
			start: {
				x: 0,
				y: 0,
			},
			element: {
				w: 0,
				h: 0,
			},
		},
	});

	useLayoutEffect(() => {
		const onResize = () => {
			const cornerGridCell = leftUpmostGridCell.current;
			const gridCell = firstGridCell.current;
			if (cornerGridCell && gridCell) {
				setWindowAttr({
					window: {
						start: {
							x: cornerGridCell.offsetWidth,
							y: cornerGridCell.offsetHeight,
						},
						element: {
							w: gridCell.offsetWidth,
							h: gridCell.offsetHeight,
						},
					},
				});
			}
		};
		window.addEventListener('resize', onResize);
		onResize();
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	const onMouseDown = (event: any) => {
		const className = event.target.className;
		if (event.target && className.indexOf('MuiButton') === -1) {
			setStartPos(pos);
			setDraw(true);
		}
	};

	const onMouseMove = (event: React.MouseEvent) => {
		let [x, y] = [
			Math.floor(
				(event.clientX - windowAttr.window.start.x) / windowAttr.window.element.w
			),
			Math.floor(
				(event.clientY - windowAttr.window.start.y) / windowAttr.window.element.h
			),
		];
		x = x < 0 ? 0 : x;
		y = y < 0 ? 0 : y;
		if (pos[0] !== x || pos[1] !== y) setPos([x, y]);
	};

	const onMouseUp = (event: React.MouseEvent) => {
		if (draw) {
			setDraw(false);
			dispatch(deploy(undefined, draft));
			setDraft(undefined);
		}
	};

	const collides = (a: HourType, b: HourType) => {
		return (
			(a.start <= b.start && b.start < a.end) ||
			(b.start <= a.start && a.start < b.end)
		);
	};

	const removeUH = (arr: HourType[], hour: HourType) => {
		const index = arr.findIndex(v => {
			return hour.start === v.start && hour.end === v.end;
		});

		return index >= 0 ? [...arr.slice(0, index), ...arr.slice(index + 1)] : arr;
	};

	useEffect(() => {
		if (draw) {
			const [sx, sy] = startPos;
			const [ex, ey] = pos;

			// Helper
			const convert = (x: any, y: any) =>
				moment(
					[
						x + 1,
						moment(startTime)
							.add(30 * y, 'm')
							.format('HH:mm'),
					].join(','),
					'd,HH:mm'
				).valueOf();

			// FI = Fixed Input
			let FI = { sx, sy, ex, ey };

			// First, correct the current input
			if (sy > ey) {
				let temp = sy.valueOf();
				FI.sy = ey.valueOf();
				FI.ey = temp;
			}

			if (sx > ex) {
				let temp = sx.valueOf();
				FI.sx = ex.valueOf();
				FI.ex = temp;
			}

			// Seperate into days if necessary and create new draft
			let previousUH: HourType[] = Object.assign([], unavailable_hours);
			let currentUH: HourType[] = [];
			let draftUH: HourType[] = [];

			if (FI.sx !== FI.ex) {
				currentUH = Array(FI.ex - FI.sx + 1)
					.fill(null)
					.map((_, index) => {
						return {
							start: convert(FI.sx + index, FI.sy),
							end: convert(FI.sx + index, FI.ey),
						};
					});
			} else
				currentUH.push({
					start: convert(FI.sx, FI.sy),
					end: convert(FI.sx, FI.ey),
				});

			currentUH.forEach((current, _) => {
				let eligible = true;
				let collidesWith: HourType[] = [];

				unavailable_hours.forEach((previous, _) => {
					if (collides(current, previous)) {
						// Current is not directly eligible for draft
						eligible = false;

						// Add collided slots to be merged
						collidesWith.push(previous);

						// Remove collided slots from previous unavailable hours
						previousUH = removeUH(previousUH, previous);
					}
				});

				if (eligible) {
					draftUH.push(current);
				} else {
					let start = Number.MAX_SAFE_INTEGER;
					let end = Number.MIN_SAFE_INTEGER;

					collidesWith.push(current);

					collidesWith.forEach(val => {
						if (val.end > end) end = val.end;
						if (val.start < start) start = val.start;
					});

					draftUH.push({
						start,
						end,
					});
				}
			});

			setDraft(draftUH.concat(previousUH));
		}
		return () => {};
	}, [pos]);

	let toRender = draft ? draft : unavailable_hours;
	const uhours_render = toRender.map((value: HourType, index: number) => {
		const { start, end } = value;
		const timeStart = fixHour(moment(start).format('HHmm'));
		const timeEnd = fixHour(moment(end).format('HHmm'));
		const area = calcArea(timeStart, timeEnd);
		totalUsedArea += area;

		return (
			<EmptyEvent
				key={index}
				day={moment(start).day()}
				timeStart={timeStart}
				timeEnd={timeEnd}
				onDelete={() =>
					dispatch(
						deploy(undefined, Object.assign([], removeUH(unavailable_hours, value)))
					)
				}
			/>
		);
	});

	return (
		<Grid
			fill
			className={styles.grid}
			rows={timeSlots}
			columns={dayTracks}
			onMouseMove={onMouseMove}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			data-testid="schedule">
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
							{index % 2 === 0 ? time.format('HH:mm') : ' '}
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
			{Array(5 * (timeCount - 1) - totalUsedArea + 1)
				.fill(null)
				.map((_: any, index: number) => {
					if (index === 0)
						return (
							<div ref={leftUpmostGridCell} key={index}>
								{' '}
							</div>
						);
					if (index === 1) return <div ref={firstGridCell} key={index} />;
					if (index < 6) return <div data-testid={`cell-${index}`} key={index} />;
					return <div key={index} />;
				})}
			{data.map((value: any, index: number) => {
				return <Event key={index} {...value} />;
			})}
			{uhours_render}
		</Grid>
	);
}
