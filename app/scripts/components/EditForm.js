import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

function validateGameForm(data) {
  const errors = {};
  if(!data.title) {
    errors.title = 'Required';
  }
  if(!data.text) {
    errors.text = 'Required';
  }  
  return errors;
}

@connectReduxForm({
  form: 'game',
  fields: ['title', 'text', 'platform'],
  validate: validateGameForm
})
export default class EditForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,    
    platforms: PropTypes.any.isRequired,
    handleSubmit: PropTypes.func.isRequired
  } 

  render() {
    const { fields: {title, text, platform}, platforms, handleSubmit } = this.props;    
    return(
      <form onSubmit={handleSubmit}>
        <div className={"form-group" + (title.error && title.touched ? ' has-error' : '')}>
          <label>Title</label>
          <input type="text" className={"form-control"} id={title.name} {...title} placeholder="Title" />
        </div>
        <div className={"form-group" + (text.error && text.touched ? ' has-error' : '')}>
          <label>Description</label>
          <textarea className={"form-control"} id={text.name} {...text} placeholder="Text" />
        </div>
        <div className={"form-group"}>
          <label>Platform</label>
          <select className={"form-control"} id={platform.name} {...platform}>
            {platforms.map((platform, index) => {
              return <option value={platform}>{{platform}}</option>
            })}
          </select>
        </div>
        <button onClick={handleSubmit} type="submit" className={"btn btn-default"}>Submit</button>
      </form>
    )
  }
}
