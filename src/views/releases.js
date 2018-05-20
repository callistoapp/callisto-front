import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import qs from "query-string";
import * as _ from 'lodash';
import {Button, List, ListItem, ListItemText, withStyles} from "material-ui";
import {Add} from "@material-ui/icons";
import NewRelease from '../components/popups/new_release'

const GET_RELEASES = gql`
  query GetReleases($projectId: Int!) {
    releasesForProject(projectId: $projectId){
      id,
      version
    }
  }
`;


const styles = theme => ({
  fab     : {
    position: 'absolute',
    bottom  : theme.spacing.unit * 2,
    right   : theme.spacing.unit * 2,
  }
});


class Releases extends React.Component {
  state = {
    newOpen: false
  };
  render() {
    const projectId = parseInt(qs.parse(this.props.location.search).project_id, 10);
    if (!projectId)
      return "No project Specified";
    return (
      <Query query={GET_RELEASES} variables={{projectId}}>
        {({loading, error, data}) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <div>
              {
                _.isEmpty(data.releasesForProject) ?
                  "No releases" :
                  <List>
                    {_.map(data.releasesForProject, release =>
                      <ListItem key={release.id} button>
                        <ListItemText primary={release.version}/>
                      </ListItem>
                    )}
                  </List>
              }
              <Button
                variant="fab"
                color="primary"
                onClick={() => this.setState({newOpen: true})}
                aria-label="add"
                className={this.props.classes.fab}
              >
                <Add/>
              </Button>
              <NewRelease open={this.state.newOpen}
                          onClose={() => this.setState({newOpen: false})}/>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(Releases);
