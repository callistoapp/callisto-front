import React from 'react';
import {TextField} from "@material-ui/core";

const ProjectForm = (props) => {
  const {name, description, repository, url, handleChange} = props;
  return (
    <form onSubmit={this.handleSubmit}>
      <TextField
        fullWidth
        label={'Name'}
        name='name'
        value={name}
        placeholder='Name of the project'
        onChange={handleChange('name')}
      />
      <TextField
        fullWidth
        label={'Description'}
        name='description'
        value={description}
        placeholder='Describe the project objectives'
        onChange={handleChange('description')}
      />
      <TextField
        fullWidth
        label={'Repository'}
        name='repository'
        value={repository}
        placeholder='The Url of the repository hosing the source code'
        onChange={handleChange('repository')}
      />
      <TextField
        fullWidth
        label={'Url'}
        name='url'
        value={url}
        placeholder='The url of the desired website'
        onChange={handleChange('url')}
      />
    </form>
  )
};

export default ProjectForm;

