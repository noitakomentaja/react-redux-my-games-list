import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Immutable, {Map} from 'immutable';
import {Link} from 'react-router';

// Connect to Redux store
@connect(
  state => ({
    games: state.games.get('games')
  })
)
export default class ViewGameEntry extends Component {
  static propTypes = {
    games: PropTypes.instanceOf(Map).isRequired
  } 

  constructor(props) {
    super(props);
    this.state = {
      game: null
    }
  }

  componentDidMount() {
    const {gameId} = this.props.params;
    this.setState({
      game: this.props.games.get(gameId)
    });
  }  

  render() {
    return (
      <div className={"container-fluid"}>      
      {this.state && this.state.game &&
        <div className={"row"}>
          <div className={"col-md-12"}>
            <h2>{this.state.game.get('title')} <small>{this.state.game.get('platform')}</small></h2>
            <p>{this.state.game.get('text')}</p>            
            <Link className={"btn btn-default"} to={"/"}>Back</Link>
          </div>
        </div>
      }
      </div>      
    )
  }
}