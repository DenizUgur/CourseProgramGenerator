import React from 'react';
import { render, screen, fireEvent } from '../../utils';

import { Schedule, WelcomeScreen } from '..';

import store from '../../store';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Controls from '../Controls/Controls';
import NoWiFi from '../NoWiFi/NoWiFi';

jest.mock('electron', () => ({
	shell: {
		openExternal: jest.fn(),
	},
	remote: {
		app: {
			exit: jest.fn(),
		},
		getCurrentWindow: jest.fn().mockReturnValue({
            current: null
        }),
	},
}));

const state = {
	system: {
		mode: 'dark',
		online: true,
		data_status: 'ready',
		snackbar: false,
	},
	algorithm: {
		result: {
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
		selected_courses: [
			{
				name: 'BUS.102',
				title: 'İşletmeye Giriş Ii (girişimcilik)',
				credits: 4,
				class: 'A',
				teacher: 'Jason Nick Shing Lau',
				corequisite: ['BUS.102L'],
				hours: [[1592890800000, 1592901000000]],
			},
		],
		unavailable_hours: [
			{
				start: 1592992800000,
				end: 1592998200000,
			},
		],
		errors: [],
	},
};

describe('<Schedule /> Component', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});
		render(<Schedule data={state.algorithm.result.primary} />, { reduxStore });
	});

	test('should render selected courses', async () => {
		const component = await screen.findByTestId('schedule');
		expect(component).toBeInTheDocument();
	});
});

describe('<WelcomeScreen /> Component', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});
		render(<WelcomeScreen />, { reduxStore });
	});

	test('should be able to click on dev link ', async () => {
		const component = await screen.findByTestId('dev-link');

		fireEvent.click(component);
		expect(component).toBeInTheDocument();
	});
});

describe('<Controls /> Component', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});
		render(<Controls />, { reduxStore });
	});

	test('should be able to see selected course chips', async () => {
		const component = await screen.findByTestId('chip-array');

		expect(component).toBeInTheDocument();
	});
});

describe('<NoWifi /> Component', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});
		render(<NoWiFi />, { reduxStore });
	});

	test('should be able to click quit', async () => {
		const component = await screen.findByTestId('quit-button');

		fireEvent.click(component);
		expect(component).toBeInTheDocument();
	});
});
