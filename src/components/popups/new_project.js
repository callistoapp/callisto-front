/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import * as _ from 'lodash';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  TextField,
  InputLabel,
  Button, Chip
} from 'material-ui'
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router';
import EditStatusDialog from './edit_status';


const styles = theme => ({
  chip     : {
    margin: theme.spacing.unit / 2,
  },
  fab      : {
    position: 'absolute',
    bottom  : theme.spacing.unit * 2,
    right   : theme.spacing.unit * 2,
  },
  flex     : {
    flex: 1,
  },
  paper    : {
    width: 330
  },
  centered : {
    textAlign: 'center'
  },
  topMarged: {
    marginTop: 20
  }
});

const WithData = graphql(gql`
  mutation createProject($name: String!, $url: String!, $description: String!, $repository: String!, $statuses: [String!]!) {
    createProject(name: $name, url: $url, description: $description, repository: $repository, statuses: $statuses) {
      id
    }
  }
`);

class NewProject extends Component {
  handleChange = name => e => this.setState({[name]: e.target.value});
  handleSubmit = e => {
    e.preventDefault();
    const {name, url, description, repository, statuses} = this.state;
    this.setState({loading: true});

    this.props.mutate({
      variables: {name, url, description, repository, statuses}
    })
        .then(({data}) => {
          this.setState({
            name       : '',
            url        : '',
            description: '',
            repository : '',
            statuses   : ['backlog', 'wip', 'verify', 'done'],
            loading    : false,
            error      : ''
          });
          this.props.history.push({
            pathname: `/p/dashboard`,
            search  : `?project_id=${data.createProject.id}`
          });
          this.props.handleClose();
        }).catch((error) => {
      this.setState({loading: false, error});
    });

  };

  updateStatus = (value, i) => {
    let statuses = _.assign([], this.state.statuses);
    statuses[i]  = value;
    this.setState({statuses})
  };

  handleEditTask = (name, i) => e => {
    this.setState({statusEditOpen: true, statusEditValue: {name, index: i}})
  };

  deleteCategory = name => e => {
    this.setState({
      statuses: _.without(this.state.statuses, name)
    })
  };

  addCategory = () => {
    let statuses = _.assign([], this.state.statuses);
    statuses.push("");
    this.setState({
      statuses,
      statusEditOpen : true,
      statusEditValue: {name: "", index: statuses.length - 1}
    })
  };

  constructor(props) {
    super(props);
    this.state        = {
      name           : '',
      url            : '',
      description    : '',
      repository     : '',
      statuses       : ['backlog', 'wip', 'verify', 'done'],
      statusEditOpen : false,
      statusEditValue: {},
      loading        : false,
      error          : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.addCategory  = this.addCategory.bind(this);
  }

  render() {
    const {classes}                                      = this.props;
    const {name, url, description, repository, statuses} = this.state;
    return ([
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
          onClose={this.props.handleClose}
        >
          <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Define the details of the projects
            </DialogContentText>

            <form onSubmit={this.handleSubmit}>
              {this.state.error && <Snackbar
                error
                header='Error occurred'
                content={this.state.error}
              />}
              <TextField
                fullWidth
                label={'Name'}
                name='name'
                value={name}
                placeholder='Name of the project'
                onChange={this.handleChange('name')}
              />
              <TextField
                fullWidth
                label={'Description'}
                name='description'
                value={description}
                placeholder='Describe the project objectives'
                onChange={this.handleChange('description')}
              />
              <TextField
                fullWidth
                label={'Repository'}
                name='repository'
                value={repository}
                placeholder='The Url of the repository hosing the source code'
                onChange={this.handleChange('repository')}
              />
              <TextField
                fullWidth
                label={'Url'}
                name='url'
                value={url}
                placeholder='The url of the desired website'
                onChange={this.handleChange('url')}
              />
              <div className={classes.topMarged}>
                <InputLabel>Board categories</InputLabel>
                <br/>
                {_.map(statuses, (status, i) => (
                  <Chip
                    key={i}
                    label={status}
                    onClick={this.handleEditTask(status, i)}
                    onDelete={this.deleteCategory(status)}
                    className={classes.chip}
                  />
                ))}
                <br/>
                <Button color={'primary'} onClick={this.addCategory}>New category</Button>
              </div>
              <DialogActions>
                <Button color="secondary" onClick={this.props.handleClose}>Cancel</Button>
                <Button type='submit' color="primary">Submit</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>,
        <EditStatusDialog
          open={this.state.statusEditOpen}
          handleClose={() => this.setState({statusEditOpen: false})}
          handleEdit={this.updateStatus}
          value={this.state.statusEditValue}
        />
      ]
    );
  }
}

export default withRouter(WithData(withStyles(styles)(NewProject)));
