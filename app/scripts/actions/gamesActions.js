import Immutable from 'immutable';
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
} from './actionTypes';

export function initStore(filters = {}) {
	return {
		types: [GAMES_LOAD_REQUEST, GAMES_LOAD_SUCCESSFULL, GAMES_LOAD_FAILURE],
		promise: (client) => client.post('/listGames', {
			data: filters
		})
	};	
}

export function deleteGame(id) {
	return {
		types: [GAMES_DELETE_REQUEST, GAMES_DELETE_SUCCESSFULL, GAMES_DELETE_FAILURE],
		promise: (client) => client.post('/deleteGame', {
			data: {
				id: id
			}
		})
	};	
}

export function addGame(game = {}) {
	return {
		types: [GAMES_ADD_REQUEST, GAMES_ADD_SUCCESSFULL, GAMES_ADD_FAILURE],
		promise: (client) => client.post('/addGame', {
			data: game
		})
	};
}

export function updateGame(game = {}) {
	return {
		types: [GAMES_UPDATE_REQUEST, GAMES_UPDATE_SUCCESSFULL, GAMES_UPDATE_FAILURE],
		promise: (client) => client.post('/updateGame', {
			data: game
		})
	};
}