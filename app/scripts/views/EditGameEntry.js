import React, {Component, PropTypes} from 'react';
import Router from 'react-router';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import EditForm from '../components/EditForm';
import {updateGame} from '../actions/gamesActions';

@connect(
  state => ({
    games: state.games.get('games'),
    platforms: state.filters.get('platforms')
  }),
  dispatch => bindActionCreators({initialize, updateGame}, dispatch)  
)
export default class EditGameEntry extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    updateGame: PropTypes.func.isRequired,
    games: PropTypes.instanceOf(Map).isRequired,    
    platforms: PropTypes.any.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      game: null
    }
  }

  handleSubmit(data) {
    const {updateGame} = this.props;

    // Append ID from active game object to form data object
    data['id'] = this.props.params.gameId;

    // Reset form fields
    this.props.initialize('game', {
      title: null,
      text: null,      
      platform: 'PC'
    });

    // Dispatch update action
    updateGame(data);
  
    // Redirect back to list    
    this.context.router.transitionTo('/');
  }

  componentDidMount() {
    const {gameId} = this.props.params;
    const game = this.props.games.get(gameId);

    this.setState({
      game: game
    });    

    this.props.initialize('game', {
      title: game.get('title'),
      text: game.get('text'),
      platform: game.get('platform')
    });
  }

  render() {
    return (
      <div className={"container-fluid"}>
        <div className={"row"}>
          <div className={"col-md-12"}>
            <h2>Add game</h2>
            <Link className={"btn btn-default"} to={"/"}>Back</Link>            
            <br/>            
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-md-12"}>
            <EditForm 
              platforms={this.props.platforms}
              onSubmit={::this.handleSubmit}>
            </EditForm>
          </div>
        </div>        
      </div>
    )
  }
}