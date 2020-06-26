import {
	UPDATE_COURSES,
	SELECTED_COURSES,
	RESULT_COURSES,
	UNAVAILABLE_HOURS,
	AlgorithmState,
} from './types';
import { produce } from 'immer';

const INITIAL_STATE: AlgorithmState = {
	result: {
		primary: [],
		alternatives: [],
		errors: [],
	},
	all_courses: [],
	selected_courses: [],
	unavailable_hours: [],
	errors: [],
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

			case RESULT_COURSES:
				draft.result = action.payload;
				break;

			case UNAVAILABLE_HOURS:
				draft.unavailable_hours = action.payload;
				break;

			default:
				break;
		}
	});
}
