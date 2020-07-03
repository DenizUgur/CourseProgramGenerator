export const UPDATE_COURSES = 'ALGORITHM_UPDATE_COURSES';
export const SELECTED_COURSES = 'ALGORITHM_SELECTED_COURSES';
export const RESULT_COURSES = 'ALGORITHM_RESULT_COURSES';
export const UNAVAILABLE_HOURS = 'ALGORITHM_UNAVAILABLE_HOURS';

export type HourType = {
	start: number;
	end: number;
};

export interface Course {
	name: string;
	title: string;
	credits: number;
	class: string;
	teacher: string;
	corequisite: string[];
	hours: number[][];
}

export interface AlgorithmState {
	result: {
		primary: Course[];
		alternatives: Course[];
		errors: any[];
	};
	selected_courses: Course[];
	all_courses: Course[];
	unavailable_hours: HourType[];
	errors: any[];
	referance_time: number | null;
}
