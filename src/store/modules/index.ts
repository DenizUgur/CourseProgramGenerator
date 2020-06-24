import { combineReducers } from 'redux';

import algorithm from './algorithm/reducers';
import system from './system/reducers';

import * as algorithm_types from './algorithm/types';
import * as system_types from './system/types';

export default combineReducers({
	system,
	algorithm,
});

export { algorithm_types, system_types };
