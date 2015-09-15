import {FILTER_PLATFORM_CHANGE, FILTER_TITLE_CHANGE} from './actionTypes';
import {initStore} from './gamesActions';

// Trigger filter platform change on store
function filterPlatformOnChange(value) {
	return {
		type: FILTER_PLATFORM_CHANGE,
		value: value
	}
}

// Trigger filter title change on store
function filterTitleOnChange(value) {
	return {
		type: FILTER_TITLE_CHANGE,
		value: value
	}	
}

export function filterPlatformChange(value) {
	return (dispatch, getState) => {
		dispatch(filterPlatformOnChange(value));
		// Dispatch filter query to games state
		dispatch(initStore({ 
			title: getState().filters.get('title'), 
			platform: getState().filters.get('platform') 
		}));
	};
}

export function filterTitleChange(value) {
	return (dispatch, getState) => {
		dispatch(filterTitleOnChange(value));
		// Dispatch filter query to games state		
		dispatch(initStore({ 
			title: getState().filters.get('title'), 
			platform: getState().filters.get('platform') 
		}));		
	};
}