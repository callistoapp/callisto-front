/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import * as _ from 'lodash';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Snackbar, TextField, FormControl, InputLabel, Button
} from 'material-ui'
import {Close} from '@material-ui/icons'
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';
import { withStyles } from 'material-ui/styles';


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
          this.setState({loading: false, error: ''});
          this.props.history.push(`/${name}/home`)
        }).catch((error) => {
      this.setState({loading: false, error});
    });

  };

  updateCategory = name => e => {
    let statuses = _.assign([], this.state.statuses);
    const i = name.substr(name.length - 1);
    statuses[i] = e.target.value;
    this.setState({statuses})
  };

  addCategory = () => {
    let statuses = _.assign([], this.state.statuses);
    statuses.push("");
    this.setState({statuses})
  };

  constructor(props) {
    super(props);
    this.state        = {
      name       : '',
      url        : '',
      description: '',
      repository : '',
      statuses   : ['backlog', 'wip', 'verify', 'done'],
      loading    : false,
      error      : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  render() {
    const {classes} = this.props;
    const {name, url, description, repository, statuses} = this.state;
    return (
      <Dialog open={this.props.open}>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Create new project
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>
          {this.state.error && <Snackbar
            error
            header='Error occurred'
            content={this.state.error}
          />}
          <TextField
            label={'Name'}
            name='name'
            value={name}
            placeholder='Name of the project'
            onChange={this.handleChange('name')}
          />
          <TextField
            label={'Description'}
            name='description'
            value={description}
            placeholder='Describe the project objectives'
            onChange={this.handleChange('description')}
          />
          <TextField
            label={'Repository'}
            name='repository'
            value={repository}
            placeholder='The Url of the repository hosing the source code'
            onChange={this.handleChange('repository')}
          />
          <TextField
            label={'Url'}
            name='url'
            value={url}
            placeholder='The url of the desired website'
            onChange={this.handleChange('url')}
          />
          <FormControl>
            <InputLabel>Board categories</InputLabel>
            {_.map(statuses, (status, i) => (
              <TextField
                key={i}
                name={`status${i}`}
                value={status}
                onChange={this.updateCategory}
              />
            ))}
            <Button secondary onClick={this.addCategory}>New category</Button>
          </FormControl>
          <Button type='submit'>Submit</Button>
        </form>
      </Dialog>
    );
  }
}

export default WithData(withStyles(styles)(NewProject));
