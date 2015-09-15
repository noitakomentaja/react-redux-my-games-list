import React, {Component, PropTypes} from 'react';
import Router from 'react-router';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import EditForm from '../components/EditForm';
import {addGame} from '../actions/gamesActions';

@connect(
  state => ({
    platforms: state.filters.get('platforms')
  }),
  dispatch => bindActionCreators({initialize, addGame}, dispatch)  
)
export default class NewGameEntry extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    addGame: PropTypes.func.isRequired,
    platforms: PropTypes.any.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  handleInitialize() {
    // Set initial form field values
    this.props.initialize('game', {
      title: null,
      text: null,
      platform: 'PC'
    });
  }

  handleSubmit(data) {
    const {addGame} = this.props;

    // Reset form fields
    this.props.initialize('game', {
      title: null,
      text: null,      
      platform: 'PC'
    });

    // Dispatch addGame action
    addGame(data);

    // Redirect back to list view
    this.context.router.transitionTo('/');
  }

  componentDidMount() {
    this.handleInitialize();
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