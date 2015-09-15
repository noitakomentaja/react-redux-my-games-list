import { combineReducers } from 'redux';

import games from './games';
import filters from './filters';
import {reducer as form} from 'redux-form';

export default combineReducers({
	games,
	filters,
	form
});