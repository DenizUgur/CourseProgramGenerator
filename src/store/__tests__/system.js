import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import store from '../';

import system from '../modules/system/reducers';
import * as types from '../modules/system/types';

import { system_init } from '../modules/system/actions';

import { remote } from 'electron';
jest.mock('electron', () => ({
	remote: {
		app: {
			getVersion: jest.fn(),
		},
		shell: {
			openExternal: jest.fn(),
		},
	},
}));

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ tag_name: 'v2.0.0' }),
	})
);

describe('Test System Reducers', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore(store.getState());
	});

	test('should handle SNACKBAR_MESSAGE', () => {
		expect(
			system(reduxStore.getState(), {
				type: types.SNACKBAR_MESSAGE,
				show: true,
				level: 'info',
				message: 'test',
				duration: 1000,
				update: false,
			})
		).toMatchObject({
			snackbar: {
				duration: 1000,
				level: 'info',
				message: 'test',
				show: true,
				update: false,
			},
		});
	});

	test('should handle THEME_TOGGLE', () => {
		expect(
			system(reduxStore.getState(), {
				type: types.THEME_TOGGLE,
			})
		).toMatchObject({
			mode: 'dark',
		});
	});

	test('should handle DATA_STATUS', () => {
		expect(
			system(reduxStore.getState(), {
				type: types.DATA_STATUS,
				status: 'ready',
			})
		).toMatchObject({
			data_status: 'ready',
		});
	});

	test('should handle ONLINE_STATUS', () => {
		expect(
			system(reduxStore.getState(), {
				type: types.ONLINE_STATUS,
				status: true,
			})
		).toMatchObject({
			online: true,
		});
	});
});

describe('System Init Fetch Call', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeEach(() => {
		fetch.mockClear();
	});

	const updateAction = {
		type: 'SYSTEM_SNACKBAR_MESSAGE',
		show: 'A new version is available for you to download!',
		level: 'info',
		message: 'A new version is available for you to download!',
		duration: 6000,
		update: true,
	};

	test('should notify if newer version is available', async () => {
		reduxStore = mockStore({ ...store.getState(), system: { online: true } });
		remote.app.getVersion.mockReturnValue('2.0.1');

		return reduxStore.dispatch(system_init()).then(() => {
			expect(fetch).toHaveBeenCalledTimes(2);
			expect(reduxStore.getActions()).toEqual(
				expect.arrayContaining([expect.objectContaining(updateAction)])
			);
		});
	});

	test('should not notify if app is up to date', () => {
		reduxStore = mockStore({ ...store.getState(), system: { online: true } });
		remote.app.getVersion.mockReturnValue('2.0.0');

		return reduxStore.dispatch(system_init()).then(() => {
			expect(fetch).toHaveBeenCalledTimes(2);
			expect(reduxStore.getActions()).not.toEqual(
				expect.arrayContaining([expect.objectContaining(updateAction)])
			);
		});
	});
});
