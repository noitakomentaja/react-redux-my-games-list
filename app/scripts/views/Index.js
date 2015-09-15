import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {GamesList, SelectFilter, InputFilter} from '../components';


export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {games, isLoading, loaded, children} = this.props;    
    return (
      <div className={"container-fluid"}>
        <div className={"row"}>
          <div className={"col-md-12"}>
            <h2>My Games List</h2>       
            <div className={"input-group"}>   
              <InputFilter></InputFilter>
              <SelectFilter></SelectFilter>                   
            </div>
          </div>
        </div>      
        <div className={"row"}>
          <div className={"col-md-12"}>
            <GamesList></GamesList>
          </div>
        </div>
      </div>
    )
  }
}