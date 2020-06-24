import React from 'react';
import App from './App';
import { render, screen } from '../utils';

import store from '../store';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('electron', () => ({
	shell: {
		openExternal: jest.fn(),
	},
}));

describe('<App /> Container', () => {
	const mockStore = configureStore([thunk]);
	let reduxStore;

	test('should render when offline', async () => {
		reduxStore = mockStore(store.getState());
		render(<App />, { reduxStore });

		const component = await screen.findByTestId('no-internet');
		expect(component).toBeInTheDocument();
	});

	test('should render when online', async () => {
		reduxStore = mockStore({
			...store.getState(),
			system: { online: true },
		});
		render(<App />, { reduxStore });

		const component = await screen.findByTestId('title');
		expect(component).toBeInTheDocument();
	});
});
