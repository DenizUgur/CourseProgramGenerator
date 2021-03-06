import {
	SNACKBAR_MESSAGE,
	THEME_TOGGLE,
	DATA_STATUS,
	ONLINE_STATUS,
	SystemState,
} from './types';
import produce from 'immer';

const INITIAL_STATE: SystemState = {
	mode: 'dark',
	online: false,
	data_status: 'not ready',
	snackbar: undefined,
};

export default function system(
	state = INITIAL_STATE,
	action: any
): SystemState {
	return produce(state, draft => {
		switch (action.type) {
			case SNACKBAR_MESSAGE:
				draft.snackbar = action.show
					? {
							show: true,
							level: action.level,
							message: action.message,
							duration: action.duration,
							update: action.update,
					  }
					: undefined;
				break;

			case THEME_TOGGLE:
				draft.mode = action.mode
					? action.mode
					: draft.mode === 'dark'
					? 'light'
					: 'dark';
				break;

			case DATA_STATUS:
				draft.data_status = action.status;
				break;

			case ONLINE_STATUS:
				draft.online = action.status;
				break;

			default:
				break;
		}
	});
}
