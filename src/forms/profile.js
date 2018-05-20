import React from 'react';
import {TextField} from "material-ui";

const ProfileForm = (props) => {
  const {username, email, handleSubmit, handleChange} = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label={'Name'}
        name='username'
        value={username}
        placeholder='Your fullname'
        onChange={handleChange('username')}
      />
      <TextField
        fullWidth
        label={'Email'}
        name='email'
        value={email}
        placeholder='Your email address'
        onChange={handleChange('email')}
      />
    </form>
  )
};

export default ProfileForm;

