export const SNACKBAR_MESSAGE = 'SYSTEM_SNACKBAR_MESSAGE';
export const THEME_TOGGLE = 'SYSTEM_THEME_TOGGLE';
export const DATA_STATUS = 'SYSTEM_DATA_STATUS';
export const ONLINE_STATUS = 'SYSTEM_ONLINE_STATUS';

export type LevelType = 'success' | 'info' | 'warning' | 'error';
export type StatusType = 'ready' | 'downloading' | 'not ready';

export interface SystemState {
	mode: 'dark' | 'light';
	online: boolean;
	data_status: StatusType;
	snackbar:
		| {
				show: boolean;
				level: LevelType;
				message: string;
				duration: number;
				update: boolean;
		  }
		| undefined;
}
