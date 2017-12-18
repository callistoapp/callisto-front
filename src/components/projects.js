/**
 * Created by clementmondion on 16/12/2017.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Card, Header} from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo';

function Projects({ data: { projectList, refetch } }) {
    return (
    <Container>
        <Header>Mes projets</Header>
        <Card.Group>
            {projectList && projectList.map(project =>
            <Card key={project.id}>
                <Card.Content>
                    <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
                    <Card.Header as={Link} to={{pathname: `${project.name}/home`, state: {id: project.id}}} >
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
