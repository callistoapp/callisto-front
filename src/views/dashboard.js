import React from 'react';
import qs from 'query-string';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import {withRouter} from 'react-router';
import * as _ from 'lodash';

const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    projectById(id: $id){
      id,
      name,
      description,
      repository,
      tasks {
        statusId
      },
      statuses {
        id,
        index
      }
    }
  }
`;


const Dashboard = ({location}) => {
  const projectId = parseInt(qs.parse(location.search).project_id, 10);
  if (!projectId)
    return "No project Specified";
  return (
    <Query query={GET_PROJECT} variables={{id: projectId}}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        const {statuses, name, tasks} = data.projectById;
        const maxStatus = _.get(_.find(statuses, {index: _.max(_.map(statuses, 'index'))}), 'id');
        const finished = _.filter(tasks, {statusId: maxStatus});
        const done = finished.length * 100 / tasks.length;
        return (
          <div>
            <h2>{name}</h2>
            {done || 0} %
          </div>
        );
      }}
    </Query>
  )
};

export default withRouter(Dashboard);
