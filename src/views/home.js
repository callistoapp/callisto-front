import React from 'react';
import * as _ from 'lodash';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withRouter } from "react-router";
import {List, ListItem, ListItemText} from 'material-ui';

const GET_PROJECTS = gql`
  {projectList {
    name,
    id
  }}
`;

const Home = (props) => {
  return (
    <Query query={GET_PROJECTS}>
      {({loading, error, data}) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div>
            <h1>Welcome to callisto</h1>
            <h2>You have {data.projectList.length} project(s)</h2>
            <List>
              {_.map(data.projectList, (project, key) =>
                <ListItem
                  key={key}
                  button
                  onClick={() =>
                    props.history.push({
                      pathname: "/p/dashboard",
                      search: `?project_id=${project.id}`
                    })
                  }
                >
                  <ListItemText primary={project.name} />
                </ListItem>
              )}
            </List>
          </div>
        );
      }}
    </Query>
  )
};

export default withRouter(Home);

