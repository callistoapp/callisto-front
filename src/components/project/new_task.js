/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import {
  Container, Header, Button, Form, Message
} from 'semantic-ui-react'
import {graphql, compose} from 'react-apollo';
import {gql} from 'apollo-boost';
import * as _ from "lodash";

const getStatusesQuery = graphql(gql`
    query GetStatusesForProject($name: String!) {
        projectByName(name: $name){
            statuses {
                id, 
                name, 
                index
            }
        }
    }`,
  {
    options: (props) => ({
      variables: {name: props.match.params.project},
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
  handleChange = (e, {name, value}) => this.setState({[name]: value});
  handleSubmit = () => {
    const {name, type, description, status} = this.state;
    this.setState({loading: true});

    this.props.mutate({
      variables: {name, type, description, status, projectId: this.props.location.state.id}
    })
        .then(({data}) => {
          this.setState({loading: false, error: ''});
          this.props.history.push('tasks')
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
    const {name, type, description, status} = this.state;

    const statuses = _.get(this.props, 'data.projectByName.statuses');
    const statusOptions = _.reduce(statuses, (acc, s) => {
      acc.push({
        key: s.index,
        value: s.id,
        text: s.name
      });
      return acc;
    }, []);
    return (
      <Container>
        <Header>Create new project</Header>
        <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
          {this.state.error && <Message
            error
            header='Error occurred'
            content={<div>this.state.error</div>}
          />}
          <Form.Field>
            <label>Name</label>
            <Form.Input
              name='name'
              value={name}
              placeholder='Name of the task'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Form.Input
              name='description'
              value={description}
              placeholder='Describe the task objectives'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Type</label>
            <Form.Select
              name='type'
              value={type}
              options={[
                {key: 0, value: 0, text: "Type 1"},
                {key: 1, value: 1, text: "Type 2"},
                {key: 2, value: 2, text: "Type 3"},
                {key: 3, value: 3, text: "Type 4"}
              ]}
              placeholder='The type of task'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Status</label>
            <Form.Select
              name='status'
              value={status}
              options={statusOptions}
              placeholder='The default status of the task'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default withData(NewTask);
