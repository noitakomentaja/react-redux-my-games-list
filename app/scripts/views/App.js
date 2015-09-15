import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import {Link} from 'react-router';
import {createTransitionHook} from '../services/UniversalRouter';
import Immutable, {Map} from 'immutable';
import {isLoaded} from '../reducers/games';
import {initStore} from '../actions/gamesActions';

const title = 'Sharkpunch App';
const description = 'Demo.';
const image = 'http://static.iltalehti.fi/viihde/jucci_juttu2503in_503_vi.jpg';

const styles = require('./App.scss');    

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@noitakomentaja',
      'twitter:creator': '@noitakomentaja',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }  
}

export default class App extends Component {
	static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  // Static methods to resolve before application starts 
  static fetchData(store) {
    const promises = [];

    if (!isLoaded(store.getState())) {
      promises.push(store.dispatch(initStore()));
    }

    return Promise.all(promises);
  }


	componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

	render() {
		return (
      <div>
        <DocumentMeta {...meta}/>
  			<div>{this.props.children}</div>
      </div>
		)
	}
}