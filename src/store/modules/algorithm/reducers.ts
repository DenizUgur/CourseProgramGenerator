import { AlgorithmState, UPDATE_COURSES, SELECTED_COURSES } from './types';
import { produce } from 'immer';

const INITIAL_STATE: AlgorithmState = {
	result: [
		{
			name: 'CS.240',
			title: 'string',
			credits: 1,
			day: 1,
			timeStart: '0830',
			timeEnd: '1130',
		},
	],
	all_courses: [],
	selected_courses: [],
	autocomplete_courses: [
		{
			name: 'CS.240',
			title: 'annen',
		},
	],
};

export default function algorithm(state = INITIAL_STATE, action: any) {
	return produce(state, draft => {
		switch (action.type) {
			case UPDATE_COURSES:
				draft.all_courses = action.payload;
				break;

			case SELECTED_COURSES:
				draft.selected_courses = action.payload;
				break;

			default:
				break;
		}
	});
}
