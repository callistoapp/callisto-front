import React from 'react';
import {TextField} from "material-ui";

const ProfileForm = (props) => {
  const {
    username,
    email,
    firstname,
    lastname,
    fullname,
    handleSubmit,
    handleChange
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={'Username'}
        name='username'
        value={username}
        placeholder='Your fullname'
        onChange={handleChange('username')}
      />
      {firstname && lastname ? [
        <TextField
          label={'First name'}
          name='firstname'
          value={firstname}
          placeholder='Your fullname'
          onChange={handleChange('username')}
        />,
        <TextField
          label={'Last name'}
          name='lastname'
          value={lastname}
          placeholder='Your fullname'
          onChange={handleChange('username')}
        />]
        :
        <TextField
          label={'Full name'}
          name='fullname'
          value={fullname}
          placeholder='Your fullname'
          onChange={handleChange('username')}
        />
      }
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

