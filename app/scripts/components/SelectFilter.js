import React, {Component, PropTypes} from 'react';
import {addons} from 'react/addons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterPlatformChange} from '../actions/filterActions';

@connect(
  state => ({
    platforms: state.filters.get('platforms'),
    selected: state.filters.get('platform')
  }),  
  dispatch => bindActionCreators({filterPlatformChange}, dispatch)   
)
export default class SelectFilter extends Component {
  static propTypes = {
    filterPlatformChange: PropTypes.any.isRequired,
    platforms: PropTypes.any.isRequired,
    selected: PropTypes.string
  }	

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this); 
  }

  handleChange(event) {
    const {filterPlatformChange} = this.props;
    const {value} = event.target;
    filterPlatformChange(value);
  }

  render() {
    const {platforms, selected} = this.props;
  	return (
      <div className={"form-group"} style={{display: "inline-block"}}>
        <select className={"form-control"} onChange={this.handleChange.bind(this)} value={selected}>
          <option value={null}>Platform</option>
          {platforms.map((platform, index) => {
            return <option value={platform}>{{platform}}</option>
          })}
        </select>
      </div>
  	)
  }	
}