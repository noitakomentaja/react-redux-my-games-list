import Immutable from 'immutable';
import normalizr, {arrayOf, normalize, Schema} from 'normalizr';

import {
	GAMES_LOAD_REQUEST, 
	GAMES_LOAD_SUCCESSFULL, 
	GAMES_LOAD_FAILURE,
	GAMES_ADD_REQUEST,
	GAMES_ADD_SUCCESSFULL,
	GAMES_ADD_FAILURE,	
	GAMES_DELETE_REQUEST,
	GAMES_DELETE_SUCCESSFULL,
	GAMES_DELETE_FAILURE,
	GAMES_UPDATE_REQUEST,
	GAMES_UPDATE_SUCCESSFULL,
	GAMES_UPDATE_FAILURE	
} from '../actions/actionTypes';

const gameSchema = new Schema('games', {
	idAttribute: 'id'
});

const initialState = Immutable.fromJS({
	games: [],
	isLoading: false,
	loaded: false,
	activeGame: null
});

export default function games(state = initialState, action = {}) {
	const {games, isLoading, loaded} = state;
	switch (action.type) {
		case GAMES_LOAD_REQUEST:
			return state
				.set('isLoading', true)
				.set('loaded', false);
		case GAMES_LOAD_SUCCESSFULL:
			const normalizedRes = normalize(action.result.data, arrayOf(gameSchema));
			return state
				.set('isLoading', false)
				.set('loaded', true)
				.set('games', Immutable.fromJS(normalizedRes.entities.games ? normalizedRes.entities.games : {}));
		case GAMES_LOAD_FAILURE:
			return state
				.set('isLoading', false)
				.set('loaded', false);
		case GAMES_DELETE_REQUEST:
			return state 
				.set('isLoading', true);
		case GAMES_DELETE_FAILURE:
			return state
				.set('isLoading', false);
		case GAMES_DELETE_SUCCESSFULL: 
			// Remove game from map by id
			const deleteChanges = state.get('games').delete(String(action.result.id));

			return state
				.set('isLoading', false)
				.set('games', deleteChanges);
		case GAMES_ADD_REQUEST:
			return state
				.set('isLoading', true);
		case GAMES_ADD_FAILURE:
			return state
				.set('isLoading', false);
		case GAMES_ADD_SUCCESSFULL:
			// Add immutable object of added game item to immutable games map
			const addedGame = Immutable.fromJS(action.result.game);
			const addChanges = state.get('games').set(String(addedGame.get('id')), addedGame);

			return state
				.set('games', addChanges)
				.set('isLoading', false);				
		case GAMES_UPDATE_REQUEST:
			return state
				.set('isLoading', true);
		case GAMES_UPDATE_FAILURE:
			return state
				.set('isLoading', false);
		case GAMES_UPDATE_SUCCESSFULL:
			// Update immutable object of changed game item to immutable games map		
			const updatedGame = Immutable.fromJS(action.result.game);
			const updateChanges = state.get('games').set(String(updatedGame.get('id')), updatedGame);

			return state
				.set('games', updateChanges)			
				.set('isLoading', false);
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.games && globalState.games.get('loaded');	
}