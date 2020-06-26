import {
	UPDATE_COURSES,
	SELECTED_COURSES,
	RESULT_COURSES,
	UNAVAILABLE_HOURS,
	Course,
	HourType,
} from './types';
import { AppState } from '../..';
import { getResult } from '../../../algorithm/process';
import { snackbar, data } from '../system/actions';

export function update(courses: Course[]) {
	return {
		type: UPDATE_COURSES,
		payload: courses,
	};
}

export function selected(courses: Course[]) {
	return {
		type: SELECTED_COURSES,
		payload: courses,
	};
}

export function result(courses: any) {
	return {
		type: RESULT_COURSES,
		payload: courses,
	};
}

export function unavailable(hours: HourType[]) {
	return {
		type: UNAVAILABLE_HOURS,
		payload: hours,
	};
}

export function deploy(courses?: Course[], hours?: HourType[]) {
	return async (dispatch: any, getState: any) => {
		const state: AppState = getState();
		courses = courses || state.algorithm.selected_courses;
		hours = hours || state.algorithm.unavailable_hours;

		dispatch(selected(courses));
		dispatch(unavailable(hours));

		try {
			const res = await getResult(
				Object.assign([], state.algorithm.all_courses),
				courses.map(c => c.name),
				hours
			);

			if (res.errors) {
				if (res.errors.length === 1)
					dispatch(snackbar('info', res.errors[0].message.long, 5000));
				else if (res.errors.length > 1)
					dispatch(
						snackbar(
							'info',
							`There are several issues with selected courses. 
							If you hover over the course name chips you can see their issues.`,
							5000
						)
					);
			}

			dispatch(result(res));
		} catch (error) {
			dispatch(
				snackbar('error', 'An error occured. Please file an issue on GitHub.')
			);
			console.error(error);
		}
	};
}

export function download() {
	return async (dispatch: any) => {
		dispatch(snackbar('info', 'Downloading the latest available catalog...'));
		dispatch(data('not ready'));

		return fetch(
			'https://www.denizdaking.com/CourseProgramGenerator/catalog.json'
		)
			.then(res => res.json())
			.then(catalog => {
				dispatch(update(catalog));
				dispatch(
					snackbar('success', 'Downloaded the latest available catalog!', 2000)
				);
				dispatch(data('ready'));
			})
			.catch(err => {
				console.error(err);
				dispatch(
					snackbar(
						'error',
						'There was an error while downloading the latest available catalog',
						6000
					)
				);
				dispatch(data('not ready'));
			});
	};
}
