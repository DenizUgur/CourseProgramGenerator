import {
	SNACKBAR_MESSAGE,
	THEME_TOGGLE,
	DATA_STATUS,
	ONLINE_STATUS,
	StatusType,
	LevelType,
} from './types';
import { download } from '../..';

const { remote } = window.require('electron');

export function theme(mode?: string) {
	return {
		type: THEME_TOGGLE,
		mode,
	};
}

export function data(status: StatusType) {
	return {
		type: DATA_STATUS,
		status,
	};
}

export function online(status: boolean) {
	return {
		type: ONLINE_STATUS,
		status,
	};
}

export function snackbar(
	level?: LevelType,
	message?: string,
	duration: number | null = null,
	update = false
) {
	return {
		type: SNACKBAR_MESSAGE,
		show: level && message,
		level,
		message,
		duration,
		update,
	};
}

export function system_init() {
	return async (dispatch: any, getState: any) => {
		let status = navigator.onLine;
		dispatch(online(status));
		if (status) {
			await dispatch(download());
			fetch(
				'https://api.github.com/repos/DenizUgur/CourseProgramGenerator/releases/latest'
			)
				.then(res => res.json())
				.then(json => {
					const version = json.tag_name.substring(1);
					if (version !== remote.app.getVersion()) {
						const ready = getState().system.data_status === 'ready';
						setTimeout(
							() => {
								dispatch(
									snackbar(
										'info',
										'A new version is available for you to download!',
										6000,
										true
									)
								);
							},
							ready ? 3000 : 7000
						);
					}
				})
				.catch(error => {
					console.error(error);
					dispatch(
						snackbar(
							'error',
							'There was an error while downloading the latest available catalog',
							6000
						)
					);
				});
		}
	};
}
