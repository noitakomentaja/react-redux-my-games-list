/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import {immutifyState} from '../utils';
import createMiddleware from './client';
import thunkMiddleware from 'redux-thunk';
//import * as reducers from '../reducers/index';

export default function (client, data) {
	const middleware = createMiddleware(client);
	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(
      	middleware,
      	thunkMiddleware,
      	//loggerMiddleware
      ),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );
	} else {
		finalCreateStore = applyMiddleware(
			middleware,
			thunkMiddleware
		)(createStore);		
	}

  if (__CLIENT__) {
    data = immutifyState(data);    
  }

  //const reducer = combineReducers(reducers);
	const reducer = require('../reducers');
  const store = finalCreateStore(reducer, data);
	store.client = client;

  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextReducer = combineReducers(require('../reducers/index'));
      store.replaceReducer(nextReducer);
    });
  }

	return store;
}