import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Immutable, {Map} from 'immutable';
import {Link} from 'react-router';
import {GamesListItem} from '../components';

// Connect to Redux store
@connect(
  state => ({
    games: state.games.get('games'),
    isLoading: state.games.get('isLoading'),
    loaded: state.games.get('loaded')
  })
)
export default class GamesList extends Component {
  static propTypes = {
    games: PropTypes.instanceOf(Map).isRequired,
    isLoading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  } 

	constructor(props) {
    super(props);
  }

  render() {
    const {games, isLoading, loaded} = this.props;    
  	return (
      <div className={"panel panel-default"}>
        <div className={"panel-body"}>
          <ul className={"list-group"}>
            {games.map((game, index) => {
              return <GamesListItem 
                key={index} 
                id={game.get('id')}
                title={game.get('title')} 
                platform={game.get('platform')}
                text={game.get('text')}>
              </GamesListItem>
            })}
          </ul>
        </div>
        <div className={"panel-footer"}>
          <small>{games.size} games</small> 
          <small className={"pull-right"}> 
            <Link to="/game/add">Add new</Link>
          </small>
        </div>
      </div>
  	)
  }	
}