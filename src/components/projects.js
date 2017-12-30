/**
 * Created by clementmondion on 16/12/2017.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Card, Header, Button, Icon, Grid} from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo';
import * as _ from 'lodash';

class Projects extends Component {
    /*componentDidUpdate() {
        this.props.data.refetch();
    }*/
    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Header>My projects</Header>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <Button icon labelPosition='left' as={Link} to={'new_project'}>
                            <Icon name='plus'/>
                            New
                        </Button>
                    </Grid.Column>
                </Grid>
                <Card.Group>
                    {this.props.data.projectList && _.map(this.props.data.projectList, project =>
                        <Card key={project.id}>
                            <Card.Content>
                                <Image floated='right' size='mini'
                                       src='/assets/images/avatar/large/steve.jpg'/>
                                <Card.Header as={Link} to={{pathname: `${project.name}/home`}}>
                                    {project.name}
                                </Card.Header>
                                <Card.Meta>
                                    {project.repository}
                                </Card.Meta>
                                <Card.Description>
                                    {project.description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </Container>
        );
    }
}

export default graphql(gql`
  {projectList {
    name,
    description,
    repository,
    id,
    tasks {
      name
    }
  }}
`)(Projects);
