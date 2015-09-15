import Immutable from 'immutable';

import {
	FILTER_PLATFORM_CHANGE, 
	FILTER_TITLE_CHANGE
} from '../actions/actionTypes';

const initialState = Immutable.fromJS({
	platforms: [
		"PC",
		"iOS",
		"Android",
		"Other"
	],
	platform: null,
	title: null
});

export default function filters(state = initialState, action = {}) {
	const {platforms, platform, title} = state;
	switch (action.type) {
		case FILTER_PLATFORM_CHANGE:
			return state
				.set('platform', action.value);
		case FILTER_TITLE_CHANGE:
			return state
				.set('title', action.value);
		default:
			return state;
	}
}