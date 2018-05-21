/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Dialog,
  Button
} from '@material-ui/core'
import {graphql, Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import qs from 'query-string';
import {withRouter} from 'react-router-dom';

const CREATE_RELEASE = gql`
  mutation CreateRelease($version: String!, $projectId: Int!) {
    createRelease(version: $version, projectId: $projectId) {
      id
    }
  }
`;

class NewRelease extends Component {
  handleChange = name => e => this.setState({[name]: e.target.value});

  constructor(props) {
    super(props);
    this.state        = {
      version: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const projectId = parseInt(qs.parse(this.props.location.search).project_id, 10);

    return (
      <Dialog open={this.props.open} maxWidth="md" onClose={this.props.onClose}>
        <DialogTitle id="confirmation-dialog-title">Create new release</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label={"Version"}
              name='version'
              value={this.state.version}
              placeholder='Version of the release'
              onChange={this.handleChange('version')}
            />
          </form>
          < DialogActions>
            < Button onClick={this.props.onClose} color="secondary">
              Cancel
            </Button>
            <Mutation mutation={CREATE_RELEASE}>
              {(mutation, {receivedData}) => (
                <Button size="small" color="primary" onClick={() => {
                  mutation({variables: {...this.state, projectId}})
                }}>
                  Ok
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withRouter(NewRelease);
