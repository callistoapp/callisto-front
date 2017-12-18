/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import Layout from './layout';
import {Container, Segment, Header, Grid, Divider} from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo';

class ProjectHome extends Component {
    static propTypes = {};

    render() {
        console.log(this.props.data.projectByName);
        return (
            <Layout active={1}>
                <Header as="h1" attached="top">
                    OVERVIEW
                </Header>
                <Segment attached>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Segment circular style={{width: 175, height: 175}} inverted color="blue">
                                <Header as='h2'>
                                    3
                                    <Header.Subheader>
                                        PROJECTS
                                    </Header.Subheader>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment circular style={{width: 175, height: 175}} inverted color="green">
                                <Header as='h2'>
                                    98%
                                    <Header.Subheader>
                                        DONE
                                    </Header.Subheader>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment circular style={{width: 175, height: 175}} inverted color="yellow">
                                <Header as='h2'>
                                    10.99 €
                                    <Header.Subheader>
                                        INCOME
                                    </Header.Subheader>
                                </Header>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Layout>
        )
    };
}

export default graphql(gql`
  query GetProject($name: String!) {
    projectByName(name: $name){
        name
    }
  }
`, {
    options: (props) => ({
        variables: {name: props.match.params.project},
    })
})(ProjectHome);
