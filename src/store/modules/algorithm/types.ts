export const UPDATE_COURSES = 'ALGORITHM_UPDATE_COURSES';
export const SELECTED_COURSES = 'ALGORITHM_SELECTED_COURSES';
export const RESULT_COURSES = 'ALGORITHM_RESULT_COURSES';

export interface Course {
	name: string;
	title: string;
	credits: number;
	class: string;
	teacher: string;
	corequisite: string;
	hours: number[][];
}

export interface SimpleCourse {
	name: string;
	title: string;
}

export interface AlgorithmState {
	result: Course[];
	selected_courses: Course[];
	all_courses: Course[];
	autocomplete_courses: SimpleCourse[];
}