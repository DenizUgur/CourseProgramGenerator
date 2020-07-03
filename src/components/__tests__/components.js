import React from 'react';
import { render, screen, fireEvent } from '../../utils';

import { Schedule, WelcomeScreen } from '..';

import store from '../../store';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Controls from '../Controls/Controls';
import NoWiFi from '../NoWiFi/NoWiFi';
import { act } from 'react-dom/test-utils';

jest.mock('electron', () => ({
	shell: {
		openExternal: jest.fn(),
	},
	remote: {
		app: {
			exit: jest.fn(),
		},
		getCurrentWindow: jest.fn().mockReturnValue({
			current: null,
		}),
	},
}));

global.document.createRange = () => ({
	setStart: () => {},
	setEnd: () => {},
	commonAncestorContainer: {
		nodeName: 'BODY',
		ownerDocument: document,
	},
});

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
					hours: [[1593506400000, 1593516600000]],
				},
				{
					name: 'BUS.102L',
					title: 'İşletmeye Giriş Ii (girişimcilik) - Lab.',
					credits: 0,
					class: 'A',
					teacher: 'Jason Nick Shing Lau',
					corequisite: ['BUS.102'],
					hours: [[1593517200000, 1593520200000]],
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
				hours: [[1593506400000, 1593516600000]],
			},
			{
				name: 'BUS.102L',
				title: 'İşletmeye Giriş Ii (girişimcilik) - Lab.',
				credits: 0,
				class: 'A',
				teacher: 'Jason Nick Shing Lau',
				corequisite: ['BUS.102'],
				hours: [[1593517200000, 1593520200000]],
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
				hours: [[1593506400000, 1593516600000]],
			},
		],
		unavailable_hours: [
			{
				start: 1593506400000,
				end: 1593516600000,
			},
		],
		errors: [],
	},
};

describe('<Schedule /> Component', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	beforeAll(() => {
		Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
			configurable: true,
			value: 10,
		});
		Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
			configurable: true,
			value: 10,
		});
	});

	test('should render selected courses', async () => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});

		render(<Schedule data={state.algorithm.result.primary} />, { reduxStore });

		const component = await screen.findByTestId('schedule');
		const course = screen.getByText(/BUS.102.A/i);

		expect(component).toBeInTheDocument();
		expect(course).toBeInTheDocument();
	});

	test('should render unavailable hours {Mon,Tue 0830-0930}', async () => {
		reduxStore = mockStore(store.getState());
		render(<Schedule data={state.algorithm.result.primary} />, { reduxStore });

		const component = await screen.findByTestId('schedule');

		fireEvent.mouseMove(component, { clientX: 15, clientY: 15 });
		fireEvent.mouseDown(component, { clientX: 15, clientY: 15 });
		fireEvent.mouseMove(component, { clientX: 25, clientY: 35 });
		fireEvent.mouseUp(component, { clientX: 25, clientY: 35 });

		const expectedActions = {
			type: 'ALGORITHM_UNAVAILABLE_HOURS',
			payload: [
				{ end: 1593423000000, start: 1593419400000 },
				{ end: 1593509400000, start: 1593505800000 },
			],
		};

		expect(reduxStore.getActions()).toEqual(
			expect.arrayContaining([expect.objectContaining(expectedActions)])
		);
	});

	test('should render and combine unavailable hours {Mon,Tue 0830-0930} with {Tue 0900-1200}', async () => {
		reduxStore = mockStore({
			...store.getState(),
			...state,
		});
		render(<Schedule data={state.algorithm.result.primary} />, { reduxStore });

		const component = await screen.findByTestId('schedule');

		fireEvent.mouseMove(component, { clientX: 15, clientY: 15 });
		fireEvent.mouseDown(component, { clientX: 15, clientY: 15 });
		fireEvent.mouseMove(component, { clientX: 25, clientY: 35 });
		fireEvent.mouseUp(component, { clientX: 25, clientY: 35 });

		const expectedActions = {
			type: 'ALGORITHM_UNAVAILABLE_HOURS',
			payload: [
				{ end: 1593423000000, start: 1593419400000 },
				{ end: 1593516600000, start: 1593505800000 },
			],
		};

		expect(reduxStore.getActions()).toEqual(
			expect.arrayContaining([expect.objectContaining(expectedActions)])
		);
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

	beforeEach(() => {
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

	test('should render autocomplete list', async () => {
		const component = await screen.findByTestId('autocomplete-input');
		const input = component.getElementsByTagName('input')[0];

		// Initiate autocomplete list to be shown
		act(() => {
			fireEvent.change(input, { target: { value: 'b' } });
		});

		// Check if we have 2 list items
		const list = screen.getAllByRole('option');
		expect(list.length).toBe(2);
	});

	test('should reset appropriately when reset buttons used', async () => {
		const component = await screen.findByTestId('reset-buttons');
		const buttons = component.getElementsByTagName('button');

		// Click reset courses button
		act(() => {
			fireEvent.click(buttons[0]);
		});

		expect(reduxStore.getActions().slice(-2)).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'ALGORITHM_SELECTED_COURSES',
					payload: [],
				}),
			])
		);

		// Click rest hours button
		act(() => {
			fireEvent.click(buttons[1]);
		});

		expect(reduxStore.getActions().slice(-2)).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: 'ALGORITHM_UNAVAILABLE_HOURS',
					payload: [],
				}),
			])
		);

		act(() => {
			fireEvent.click(buttons[2]);
		});

		expect(reduxStore.getActions().slice(-2)).toEqual([
			{
				type: 'ALGORITHM_SELECTED_COURSES',
				payload: [],
			},
			{
				type: 'ALGORITHM_UNAVAILABLE_HOURS',
				payload: [],
			},
		]);
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
