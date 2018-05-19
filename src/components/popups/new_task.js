/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import {
  Snackbar,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  Button
} from 'material-ui'
import {graphql, compose} from 'react-apollo';
import {gql} from 'apollo-boost';
import * as _ from "lodash";
import {withStyles} from 'material-ui/styles';
import qs from 'query-string';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  fab     : {
    position: 'absolute',
    bottom  : theme.spacing.unit * 2,
    right   : theme.spacing.unit * 2,
  },
  flex    : {
    flex: 1,
  },
  paper   : {
    width: 330
  },
  centered: {
    textAlign: 'center'
  },
  formControl: {
    minWidth: 120,
  },
});

const getStatusesQuery = graphql(gql`
    query GetStatusesForProject($id: Int!) {
        projectById(id: $id){
            statuses {
                id, 
                name, 
                index
            }
        }
    }`,
  {
    options: (props) => ({
      variables: {id: parseInt(qs.parse(props.location.search).project_id, 10)},
    })
  }
);

const createTaskMutation = graphql(gql`
  mutation createTask($name: String!, $type: Int!, $description: String!, $status: Int!, $projectId: Int!) {
    createTask(name: $name, type: $type, description: $description, status: $status, projectId: $projectId) {
      id
    }
  }
`
);

const withData = compose(
  getStatusesQuery,
  createTaskMutation
);

class NewTask extends Component {
  handleChange = name => e => this.setState({[name]: e.target.value});
  handleSubmit = e => {
    e.preventDefault();
    const {name, type, description, status} = this.state;
    this.setState({loading: true});

    this.props.mutate({
      variables: {
        name,
        type,
        description,
        status,
        projectId: parseInt(qs.parse(this.props.location.search).project_id, 10)
      }
    })
        .then(({data}) => {
          this.setState({loading: false, error: ''});
          this.props.onClose();
        }).catch((error) => {
      this.setState({loading: false, error});
    });

  };

  constructor(props) {
    super(props);
    this.state        = {
      name       : '',
      type       : '',
      description: '',
      status     : '',
      loading    : false,
      error      : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {classes} = this.props;
    const {name, type, description, status} = this.state;
    const statuses                          = _.get(this.props, 'data.projectById.statuses');
    const statusOptions                     = _.reduce(statuses, (acc, s) => {
      acc.push({
        key  : s.index,
        value: s.id,
        text : s.name
      });
      return acc;
    }, []);
    return (
      <Dialog open={this.props.open} maxWidth="md" onClose={this.props.onClose}>
        <DialogTitle id="confirmation-dialog-title">Create new Task</DialogTitle>
        {this.state.loading ?
          <div>Loading...</div>
          :
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              {this.state.error && <Snackbar
                error
                header='Error occurred'
                content={<div>this.state.error</div>}
              />}
              <TextField
                fullWidth
                label={"Name"}
                name='name'
                value={name}
                placeholder='Name of the task'
                onChange={this.handleChange('name')}
              />
              <TextField
                multiline
                fullWidth
                label={"Description"}
                name='description'
                value={description}
                placeholder='Describe the task objectives'
                onChange={this.handleChange('description')}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type-select">Type</InputLabel>
                <Select
                  label={"Type"}
                  name='type'
                  value={type}
                  placeholder='The type of task'
                  onChange={this.handleChange('type')}
                  inputProps={{
                    name: 'type',
                    id: 'type-select',
                  }}
                >
                  {_.map([1, 2, 3, 4], (st, key) =>
                    <MenuItem value={st} key={key}>{'Type ' + st}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <br/>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type-select">Status</InputLabel>
                <Select
                  label={"Status"}
                  name='status'
                  value={status}
                  options={statusOptions}
                  placeholder='The default status of the task'
                  onChange={this.handleChange('status')}
                >
                  {_.map(statuses, (st, key) =>
                    <MenuItem value={st.id} key={key}>{st.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </form>
            < DialogActions>
              < Button onClick={this.props.onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Ok
              </Button>
            </DialogActions>
          </DialogContent>
        }
      </Dialog>
    );
  }
}

export default withRouter(withData(withStyles(styles)(NewTask)));
