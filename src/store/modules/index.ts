import { combineReducers } from 'redux';

import algorithm from './algorithm/reducers';
import system from './system/reducers';

export default combineReducers({
	system,
	algorithm,
});
