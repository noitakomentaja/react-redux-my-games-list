import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {deleteGame} from '../actions/gamesActions';

@connect(
  state => ({}),  
  dispatch => bindActionCreators({deleteGame}, dispatch)     
)
export default class GamesListItem extends Component {
	static propTypes = {
    id: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    deleteGame: PropTypes.any.isRequired
	}	

	constructor(props) {
    super(props);
  }

  handleDelete(event) {
    event.preventDefault();    
    const {id, deleteGame} = this.props;
    deleteGame(id);
  }

  render() {
    const {id, title, platform, text} = this.props;
  	return (
      <li className={"list-group-item"} style={{lineHeight: "30px"}}>
        <span>
          <Link to={`/game/view/${id}`}>
            {{title}} ({platform})
          </Link>
          <div className={"btn-group pull-right"}>
            <Link to={`/game/edit/${id}`} className={"btn btn-sm btn-primary"}>
              Edit
            </Link>
            <a href="#" onClick={this.handleDelete.bind(this)} className={"btn btn-sm btn-danger"}>
              Delete
            </a>          
          </div>        
        </span>
      </li>
  	)
  }	
}