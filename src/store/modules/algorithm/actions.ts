import {
	UPDATE_COURSES,
	SELECTED_COURSES,
	RESULT_COURSES,
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

export function deploy(courses: Course[]) {
	return async (dispatch: any, getState: any) => {
		const state: AppState = getState();
		dispatch(selected(courses));
		/**
		 * Apply async algorithm call here
		 */
		try {
			const result = await getResult(
				state.algorithm.all_courses,
				courses.map(c => c.name).join(' ')
			);
			dispatch(result(courses));
		} catch (error) {
			console.error(error);
		}
	};
}

export function download() {
	return (dispatch: any) => {
		/**
		 * Download the catalog here
		 */
		dispatch(snackbar('info', 'Downloading the latest available catalog...'));
		dispatch(data("not ready"));
	};
}
