import React from 'react';
import qs from 'query-string';
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import * as _ from 'lodash';
const withData = graphql(gql`
  query GetProject($id: Int!) {
    projectById(id: $id){
        name,
        description,
        repository
    }
  }
`, {
  options: (props) => ({
    variables: {id: parseInt(qs.parse(props.location.search).project_id, 10)},
  })
});

class Dashboard extends React.Component {
  render() {
    const project = _.get(this.props.data, 'projectById');
    if (!project)
      return (<div>Loading...</div>);
    return (
      <div>Dashboard of the project {this.props.data.projectById.name}</div>
    )
  }
}

export default withData(Dashboard);
