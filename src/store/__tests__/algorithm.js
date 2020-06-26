import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import store from '../';

import { deploy, download } from '../modules/algorithm/actions';
import algorithm from '../modules/algorithm/reducers';
import * as types from '../modules/algorithm/types';

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					name: 'BUS.102',
					title: 'İşletmeye Giriş Ii (girişimcilik)',
					credits: 4,
					class: 'A',
					teacher: 'Jason Nick Shing Lau',
					corequisite: ['BUS.102L'],
					hours: [[1592890800000, 1592901000000]],
				},
			]),
	})
);

describe('Algorithm Accuracy', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	test('should deploy without errors', async () => {
		reduxStore = mockStore({
			...store.getState(),
			algorithm: {
				all_courses: [
					{
						name: 'BUS.102',
						title: 'İşletmeye Giriş Ii (girişimcilik)',
						credits: 4,
						class: 'A',
						teacher: 'Jason Nick Shing Lau',
						corequisite: ['BUS.102L'],
						hours: [[1592890800000, 1592901000000]],
					},
					{
						name: 'BUS.102L',
						title: 'İşletmeye Giriş Ii (girişimcilik) - Lab.',
						credits: 0,
						class: 'A',
						teacher: 'Jason Nick Shing Lau',
						corequisite: ['BUS.102'],
						hours: [[1592901600000, 1592904600000]],
					},
				],
				unavailable_hours: [],
			},
		});

		const input = [
			{
				name: 'BUS.102',
				title: 'İşletmeye Giriş Ii (girişimcilik)',
				credits: 4,
				class: 'A',
				teacher: 'Jason Nick Shing Lau',
				corequisite: ['BUS.102L'],
				hours: [[1592890800000, 1592901000000]],
			},
		];

		const expectedActions = [
			{ type: 'ALGORITHM_SELECTED_COURSES', payload: input },
			{ type: 'ALGORITHM_UNAVAILABLE_HOURS', payload: [] },
			{
				type: 'ALGORITHM_RESULT_COURSES',
				payload: {
					primary: [
						{
							name: 'BUS.102',
							title: 'İşletmeye Giriş Ii (girişimcilik)',
							credits: 4,
							class: 'A',
							teacher: 'Jason Nick Shing Lau',
							corequisite: ['BUS.102L'],
							hours: [[1592890800000, 1592901000000]],
						},
						{
							name: 'BUS.102L',
							title: 'İşletmeye Giriş Ii (girişimcilik) - Lab.',
							credits: 0,
							class: 'A',
							teacher: 'Jason Nick Shing Lau',
							corequisite: ['BUS.102'],
							hours: [[1592901600000, 1592904600000]],
						},
					],
					alternatives: [],
					errors: [],
				},
			},
		];

		return reduxStore.dispatch(deploy(input)).then(() => {
			expect(reduxStore.getActions()).toEqual(expectedActions);
		});
	});

	test('should show a snackbar if there are errors', async () => {
		const input = [
			{
				name: 'BUS.102',
				title: 'İşletmeye Giriş Ii (girişimcilik)',
				credits: 4,
				class: 'A',
				teacher: 'Jason Nick Shing Lau',
				corequisite: ['BUS.102L'],
				hours: [[1592890800000, 1592901000000]],
			},
		];

		const unavailable_hours = [{ start: 1592890800000, end: 1592901000000 }];

		reduxStore = mockStore({
			...store.getState(),
			algorithm: {
				all_courses: [
					{
						name: 'BUS.102',
						title: 'İşletmeye Giriş Ii (girişimcilik)',
						credits: 4,
						class: 'A',
						teacher: 'Jason Nick Shing Lau',
						corequisite: ['BUS.102L'],
						hours: [[1592890800000, 1592901000000]],
					},
					{
						name: 'BUS.102L',
						title: 'İşletmeye Giriş Ii (girişimcilik) - Lab.',
						credits: 0,
						class: 'A',
						teacher: 'Jason Nick Shing Lau',
						corequisite: ['BUS.102'],
						hours: [[1592901600000, 1592904600000]],
					},
				],
				unavailable_hours,
			},
		});

		const expectedActions = [
			{ type: 'ALGORITHM_SELECTED_COURSES', payload: input },
			{ type: 'ALGORITHM_UNAVAILABLE_HOURS', payload: unavailable_hours },
			{
				type: 'SYSTEM_SNACKBAR_MESSAGE',
				show:
					"BUS.102 collides with the unavailable hours you defined. We have tried every possible combination between them but there wasn't any solution.",
				level: 'info',
				message:
					"BUS.102 collides with the unavailable hours you defined. We have tried every possible combination between them but there wasn't any solution.",
				duration: 5000,
				update: false,
			},
			{
				type: 'ALGORITHM_RESULT_COURSES',
				payload: {
					primary: [],
					alternatives: [],
					errors: [
						{
							name: 'BUS.102',
							message: {
								long:
									"BUS.102 collides with the unavailable hours you defined. We have tried every possible combination between them but there wasn't any solution.",
								short: 'BUS.102 collides with unavailable hours.',
							},
						},
					],
				},
			},
		];

		return reduxStore.dispatch(deploy(input, unavailable_hours)).then(() => {
			expect(reduxStore.getActions()).toEqual(expectedActions);
		});
	});
});

describe('Test Algorithm Reducers', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore(store.getState());
	});

	test('should handle UPDATE_COURSES', () => {
		expect(
			algorithm(reduxStore.getState(), {
				type: types.UPDATE_COURSES,
				payload: ['TEST'],
			})
		).toMatchObject({
			all_courses: ['TEST'],
		});
	});

	test('should handle SELECTED_COURSES', () => {
		expect(
			algorithm(reduxStore.getState(), {
				type: types.SELECTED_COURSES,
				payload: ['TEST'],
			})
		).toMatchObject({
			selected_courses: ['TEST'],
		});
	});

	test('should handle RESULT_COURSES', () => {
		expect(
			algorithm(reduxStore.getState(), {
				type: types.RESULT_COURSES,
				payload: ['TEST'],
			})
		).toMatchObject({
			result: ['TEST'],
		});
	});

	test('should handle UNAVAILABLE_HOURS', () => {
		expect(
			algorithm(reduxStore.getState(), {
				type: types.UNAVAILABLE_HOURS,
				payload: [{ start: null, end: null }],
			})
		).toMatchObject({
			unavailable_hours: [{ start: null, end: null }],
		});
	});
});

describe('Fetch Catalog', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeEach(() => {
		fetch.mockClear();
	});

	test('should fetch catalog', async () => {
		reduxStore = mockStore({ ...store.getState(), system: { online: true } });

		const expectedAction = [
			{
				duration: 0,
				level: 'info',
				message: 'Downloading the latest available catalog...',
				show: 'Downloading the latest available catalog...',
				type: 'SYSTEM_SNACKBAR_MESSAGE',
				update: false,
			},
			{ status: 'not ready', type: 'SYSTEM_DATA_STATUS' },
			{
				type: 'ALGORITHM_UPDATE_COURSES',
				payload: [
					{
						class: 'A',
						corequisite: ['BUS.102L'],
						credits: 4,
						hours: [[1592890800000, 1592901000000]],
						name: 'BUS.102',
						teacher: 'Jason Nick Shing Lau',
						title: 'İşletmeye Giriş Ii (girişimcilik)',
					},
				],
			},
			{
				duration: 2000,
				level: 'success',
				message: 'Downloaded the latest available catalog!',
				show: 'Downloaded the latest available catalog!',
				type: 'SYSTEM_SNACKBAR_MESSAGE',
				update: false,
			},
			{ status: 'ready', type: 'SYSTEM_DATA_STATUS' },
		];

		return reduxStore.dispatch(download()).then(() => {
			expect(reduxStore.getActions()).toEqual(expectedAction);
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});
});
