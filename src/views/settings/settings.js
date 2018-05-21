import React from 'react';
import * as _ from 'lodash';
import {
  Button,
  Divider,
  ExpansionPanel, ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import GeneralSettings from './general';
import BoardSettings from './board';
import IntegrationsSettings from './integrations';
import RolesSettings from './roles';
import qs from "query-string";
import {Mutation, Query} from "react-apollo";
import {withRouter} from "react-router";
import {gql} from 'apollo-boost';

import styles from '../../assets/jss/material-dashboard-react/settingsStyle';

const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    projectById(id: $id){
      id,
      name,
      description,
      repository,
      url,
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

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: Int!, $name: String!, $url: String!, $description: String!, $repository: String!) {
    updateProject(id: $id, name: $name, url: $url, description: $description, repository: $repository) {
      name,
      url,
      description,
      repository
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation UpdateProject($statuses: [String!]!) {
    updateProject(statuses: $statuses) {
      tasks
    }
  }
`;

const UPDATE_INTEGRATIONS = gql`
  mutation UpdateIntegrations($projectId: Int!) {
    updateIntegrations(projectId: $projectId) {
      id
    }
  }
`;

const UPDATE_ROLES = gql`
  mutation UpdateRoles($projectId: Int!) {
    updateRoles(projectId: $projectId) {
      id
    }
  }
`;

const panels = [
  {
    title    : "General",
    name     : "general",
    component: GeneralSettings,
    keys     : [
      "name",
      "description",
      "repository",
      "url"
    ],
    mutation: UPDATE_PROJECT
  },
  {
    title    : "Board",
    name     : "board",
    component: BoardSettings,
    keys     : [
      "statuses"
    ],
    mutation: UPDATE_BOARD
  },
  {
    title    : "Integrations",
    name     : "integrations",
    component: IntegrationsSettings,
    mutation: UPDATE_INTEGRATIONS
  },
  {
    title    : "Roles",
    name     : "roles",
    component: RolesSettings,
    mutation: UPDATE_ROLES
  },
];

class Settings extends React.Component {
  state = {};

  handleChange = changes => {
    this.setState({...changes})
  };

  handleSave = name => e => {
    const keys = _.get(_.find(panels, {name}), 'keys');
    console.log(`saving ${name} with object`, this.state, _.pick(this.state, keys))
  };

  render() {
    const {location, classes} = this.props;
    const projectId           = parseInt(qs.parse(location.search).project_id, 10);
    if (!projectId)
      return "No project Specified";
    return (
      <Query query={GET_PROJECT} variables={{id: projectId}}>
        {({loading, error, data}) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <div className={classes.root}>
              {_.map(panels, panel =>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography className={classes.heading}>{panel.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {<panel.component
                        project={data.projectById}
                        handleChange={this.handleChange}
                    />}
                  </ExpansionPanelDetails>
                  <Divider/>
                  <ExpansionPanelActions>
                    <Mutation mutation={panel.mutation}>
                      {(mutation, { receivedData }) => (
                        <Button size="small" color="primary" onClick={() => {
                          mutation({variables: this.state})
                        }}>
                          Save
                        </Button>
                      )}
                    </Mutation>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              )}
            </div>
          );
        }}
      </Query>
    )
  }
};

export default withRouter(withStyles(styles)(Settings));
