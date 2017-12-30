/**
 * Created by clementmondion on 16/12/2017.
 */

import React, {Component} from 'react';
import Layout from './layout';
import {Container, Segment, Header, Grid, Divider} from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo';

class ProjectHome extends Component {
    /*componentDidUpdate() {
        this.props.data.refetch();
    }*/
    render() {
        return (
            <Layout active={1}>
                <Header as="h1" attached="top">
                    Overview
                </Header>
                <Segment attached>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Segment circular style={{width: 175, height: 175}} inverted color="blue">
                                <Header as='h2'>
                                    {this.props.data.projectByName && this.props.data.projectByName.tasks.length}
                                    <Header.Subheader>
                                        TASKS
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
        name,
        tasks {
            id,
            status
        }
    }
  }
`, {
    options: (props) => ({
        variables: {name: props.match.params.project},
    })
})(ProjectHome);
