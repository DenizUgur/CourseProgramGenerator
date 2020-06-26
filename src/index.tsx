import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App';
import MainThemeProvider from './containers/MainThemeProvider';

import store from './store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MainThemeProvider>
				<App />
			</MainThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
