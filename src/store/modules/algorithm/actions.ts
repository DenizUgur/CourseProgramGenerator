import {
	UPDATE_COURSES,
	SELECTED_COURSES,
	RESULT_COURSES,
	UNAVAILABLE_HOURS,
	ERRORS_COURSES,
	Course,
} from './types';
import { AppState } from '../..';
import { getResult } from '../../../utils/process';
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

export function result(courses: Course[]) {
	return {
		type: RESULT_COURSES,
		payload: courses,
	};
}

export function unavailable(hours: string[]) {
	return {
		type: UNAVAILABLE_HOURS,
		payload: hours,
	};
}

export function errors(payload: any[]) {
	return {
		type: ERRORS_COURSES,
		payload,
	};
}

export function deploy(courses?: Course[], hours?: string[]) {
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
			dispatch(result(res));
		} catch (error) {
			console.error(error);
		}
	};
}

export function download() {
	return (dispatch: any) => {
		dispatch(snackbar('info', 'Downloading the latest available catalog...'));
		dispatch(data('not ready'));

		fetch('https://www.denizdaking.com/CourseProgramGenerator/catalog.json')
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
