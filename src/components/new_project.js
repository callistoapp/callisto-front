/**
 * Created by clementmondion on 16/12/2017.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Image, Card, Header, Button, Icon, Grid, Form, Checkbox,
    Message
} from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo';

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            description: '',
            repository: '',
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { name, url, description, repository } = this.state;
        this.setState({loading: true});

        this.props.mutate({
            variables: { name, url, description, repository }
        })
            .then(({ data }) => {
                this.setState({loading: false, error: ''});
                this.props.history.push(`/${name}/home`)
            }).catch((error) => {
                this.setState({loading: false, error});
        });

    };

    render() {
        console.log(this.props);
        const { name, url, description, repository } = this.state;
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
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default graphql(gql`
  mutation createProject($name: String!, $url: String!, $description: String!, $repository: String!) {
    createProject(name: $name, url: $url, description: $description, repository: $repository) {
      id
    }
  }
`)(NewProject);
