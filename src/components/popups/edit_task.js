/**
 * Created by clementmondion on 09/01/2018.
 */

import React, {Component} from 'react';
import {
  Dialog,
  DialogTitle,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  Button
} from 'material-ui'
import {compose, graphql} from "react-apollo/index";
import {gql} from 'apollo-boost';
import * as _ from "lodash";
import { withStyles } from 'material-ui/styles';
import qs from 'query-string';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  flex: {
    flex: 1,
  },
  paper: {
    width: 330
  },
  centered: {
    textAlign: 'center'
  }
});

const editTaskMutation = graphql(gql`
  mutation editTask($name: String!, $type: Int!, $description: String!, $status: Int!, $id: Int!) {
    editTask(name: $name, type: $type, description: $description, status: $status, id: $id) {
      id
    }
  }
`
, {name: 'editTask'});

const deleteTaskMutation = graphql(gql`
    mutation deleteTask($id: Int!) {
        deleteTask(id: $id)
    }`, {name: 'deleteTask'}
);

const withData = compose(
  editTaskMutation,
  deleteTaskMutation
);

class TaskPopup extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {id, name, type, description, statusId} = this.state;
    this.setState({loading: true});

    this.props.editTask({
      variables: {
        id,
        name,
        type,
        description,
        status: statusId,
        projectId: parseInt(qs.parse(this.props.location.search).project_id, 10)
      }
    })
      .then(({data}) => {
        this.setState({loading: false, error: ''});
        this.props.onClose();
        this.props.refetch();
      }).catch((error) => {
        this.setState({loading: false, error});
    });
  };

  handleDelete = e => {
    e.preventDefault();
    const {id} = this.state;
    this.setState({loading: true});

    this.props.deleteTask({
      variables: {
        id
      }
    })
      .then(({data}) => {
        this.setState({loading: false, error: ''});
        this.props.onClose();
      }).catch((error) => {
        this.setState({loading: false, error});
    });
  };

  handleChange = name => e => this.setState({[name]: e.target.value});

  constructor(props) {
    super(props);
    this.state        = {
      name       : '',
      type       : '',
      description: '',
      statusId   : '',
      loading    : false,
      error      : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state        = {
      ...nextProps.task,
      error      : ''
    };
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>{"Edit " + _.get(this.props, 'data.task.name')}</DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label={"Name"}
            name='name'
            value={this.state.name}
            placeholder='Name of the task'
            onChange={this.handleChange('name')}
          />
          <TextField
            label={"Description"}
            name='description'
            value={this.state.description}
            placeholder='Describe the task objectives'
            onChange={this.handleChange('description')}
          />
          <Select
            label={"Type"}
            name='type'
            value={this.state.type}
            placeholder='The type of task'
            onChange={this.handleChange('type')}
          >
            {_.map([1, 2, 3, 4], (st, key) =>
              <MenuItem value={st} key={key}>{'Type '+st}</MenuItem>
            )}
          </Select>
          <Select
            label={"Status"}
            name='statusId'
            value={this.state.statusId}
            placeholder='The default status of the task'
            onChange={this.handleChange('statusId')}
          >
            {_.map(this.props.statuses, (st, key) =>
              <MenuItem value={st.id} key={key}>{st.name}</MenuItem>
            )}
          </Select>
        </form>
        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  };
}

export default withRouter(withData(withStyles(styles)(TaskPopup)));
