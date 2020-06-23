import {
	SNACKBAR_MESSAGE,
	THEME_TOGGLE,
	DATA_STATUS,
	StatusType,
	LevelType,
} from './types';

export function theme() {
	return {
		type: THEME_TOGGLE,
	};
}

export function data(status: StatusType) {
	return {
		type: DATA_STATUS,
		status,
	};
}

export function snackbar(
	level?: LevelType,
	message?: string,
	duration: number | null = null
) {
	return {
		type: SNACKBAR_MESSAGE,
		show: level && message,
		level,
		message,
		duration,
	};
}
