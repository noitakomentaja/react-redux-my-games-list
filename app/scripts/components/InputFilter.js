import React, {Component, PropTypes} from 'react';
import {addons} from 'react/addons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterTitleChange} from '../actions/filterActions';

@connect(
  state => ({
    title: state.filters.get('title')
  }),  
  dispatch => bindActionCreators({filterTitleChange}, dispatch)   
)
export default class InputFilter extends Component {
  static propTypes = {
    filterTitleChange: PropTypes.any.isRequired,
    title: PropTypes.string
  }	

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this); 
  }

  handleChange(event) {
    const {filterTitleChange} = this.props;
    const {value} = event.target;

    filterTitleChange(value);
  }

  render() {
    const {title} = this.props;
  	return (
      <div className={"form-group"} style={{display: "inline-block"}}>
        <input type="text" className={"form-control"} value={title} placeholder="Title" onChange={this.handleChange.bind(this)} />
      </div>
  	)
  }	
}