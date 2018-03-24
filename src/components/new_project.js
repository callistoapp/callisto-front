/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import * as _ from 'lodash';
import {
  Container, Header, Button, Form, Message
} from 'semantic-ui-react'
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';

class NewProject extends Component {
  handleChange = (e, {name, value}) => this.setState({[name]: value});
  handleSubmit = () => {
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

  updateCategory = (e, {name, value}) => {
    let statuses = _.assign([], this.state.statuses);
    const i = name.substr(name.length - 1);
    statuses[i] = value;
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
    const {name, url, description, repository, statuses} = this.state;
    return (
      <Container>
        <Header>Create new project</Header>
        <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
          {this.state.error && <Message
            error
            header='Error occurred'
            content={this.state.error}
          />}
          <Form.Field>
            <label>Name</label>
            <Form.Input
              name='name'
              value={name}
              placeholder='Name of the project'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Form.Input
              name='description'
              value={description}
              placeholder='Describe the project objectives'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Repository</label>
            <Form.Input
              name='repository'
              value={repository}
              placeholder='The Url of the repository hosing the source code'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Url</label>
            <Form.Input
              name='url'
              value={url}
              placeholder='The url of the desired website'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Board categories</label>
            {_.map(statuses, (status, i) => (
              <Form.Input
                name={`status${i}`}
                value={status}
                onChange={this.updateCategory}
              />
            ))}
          <Button secondary onClick={this.addCategory}>New category</Button>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default graphql(gql`
  mutation createProject($name: String!, $url: String!, $description: String!, $repository: String!, $statuses: [String!]!) {
    createProject(name: $name, url: $url, description: $description, repository: $repository, statuses: $statuses) {
      id
    }
  }
`)(NewProject);
