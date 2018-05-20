import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import ProfileForm from '../forms/profile';
import * as _ from 'lodash';

const GET_USER = gql`
  query GetUser {
    loggedUser {
      id,
      username,
      fullname,
      lastname,
      firstname,
      email,
      avatar
    }
  }
`;


class Profile extends React.Component {
  render() {
    return (
      <Query query={GET_USER}>
        {({loading, error, data}) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <div>
              <ProfileForm {...data.loggedUser} handleChange={_.noop} handleSubmit={_.noop}/>
              <img src={data.loggedUser.avatar} alt="profile image"/>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Profile;
