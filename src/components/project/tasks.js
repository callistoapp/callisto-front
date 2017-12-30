/**
 * Created by clementmondion on 16/12/2017.
 */

import * as _ from 'lodash';
import React, {Component} from 'react';
import Layout from './layout';
import {Container, Segment, Header, Grid, Divider, Icon, Button, Card} from 'semantic-ui-react'
import {gql, graphql, compose} from 'react-apollo';
import {Link} from "react-router-dom";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const types = [
    "Back Log",
    "WIP",
    "VERIFY",
    "DONE",
];

const getTasksQuery = graphql(gql`
    query GetTasksForProject($name: String!) {
        projectByName(name: $name){
            id,
            tasks {
                id,
                name,
                status,
                type,
                description
            }
        }
    }`,
    {
        options: (props) => ({
            variables: {name: props.match.params.project},
        })
    }
);

const moveTaskMutation = graphql(gql`
    mutation moveTask($id: Int!, $status: Int!) {
        moveTask(id: $id, status: $status) {
            id,
            name,
            status,
            type,
            description
        }
    }`
);

const withData = compose(
    getTasksQuery,
    moveTaskMutation
);


class Tasks extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state     = {
            tasks: _.get(this.props, 'data.projectByName.tasks')
        }
    }

    onDragEnd(result) {
        if (!result.destination)
            return;
        this.props.mutate({
            variables: {
                id    : parseInt(result.draggableId, 10),
                status: parseInt(result.destination.droppableId, 10)
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tasks: _.get(nextProps, 'data.projectByName.tasks')
        })
    }

    render() {
        let id = _.get(this.props, 'data.projectByName.id');

        return (
            <Layout active={2}>
                <Container fluid>
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Header>Tasks</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button icon labelPosition='left' as={Link}
                                    to={{pathname: 'new_task', state: {id}}}>
                                <Icon name='plus'/>
                                New
                            </Button>
                        </Grid.Column>
                    </Grid>
                    {
                        this.state.tasks && <Container fluid>
                            <Grid columns={4} divided>

                                <DragDropContext
                                    onDragEnd={this.onDragEnd}
                                    onDragStart={this.onDragStart}
                                >
                                    <Grid.Row>
                                        {_.map([0, 1, 2, 3], value =>
                                            <Droppable
                                                droppableId={String(value)}
                                                key={value}
                                            >
                                                {(dropProvided, snapshot) => (
                                                    <div
                                                        style={{
                                                            borderRadius   : 5,
                                                            margin         : 5,
                                                            padding        : 5,
                                                            border         : "1px solid grey",
                                                            backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey'
                                                        }}
                                                        ref={dropProvided.innerRef}
                                                    >
                                                        {types[value]}
                                                        {_.map(_.filter(this.state.tasks, {status: value}), t =>
                                                            <Draggable
                                                                key={t.id}
                                                                draggableId={t.id}
                                                            >
                                                                {(dragProvided, snapshot) => (
                                                                    <div
                                                                        style={{
                                                                            marginBottom: 7,
                                                                            cursor      : "pointer",
                                                                            userSelect  : "none"
                                                                        }}
                                                                        key={t.id}
                                                                        ref={dragProvided.innerRef}
                                                                        {...dragProvided.dragHandleProps}
                                                                    >
                                                                        <Card
                                                                            style={
                                                                                snapshot.isDragging ?
                                                                                    {backgroundColor: "lightblue"} : {}
                                                                            }
                                                                        >
                                                                            <Card.Content>
                                                                                <Card.Header>
                                                                                    {t.name}
                                                                                </Card.Header>
                                                                                <Card.Meta>
                                                                                    {t.type}
                                                                                </Card.Meta>
                                                                                <Card.Description>
                                                                                    {t.description}
                                                                                </Card.Description>
                                                                            </Card.Content>
                                                                        </Card>
                                                                        {dragProvided.placeholder}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )}
                                                        {dropProvided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        )}
                                    </Grid.Row>
                                </DragDropContext>
                            </Grid>
                        </Container>
                    }
                </Container>
            </Layout>
        );
    };
}

export default withData(Tasks);
