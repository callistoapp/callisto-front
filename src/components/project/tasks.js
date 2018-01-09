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
import TaskPopup from '../global/task_popup';

const getTasksQuery = graphql(gql`
    query GetTasksForProject($name: String!) {
        projectByName(name: $name){
            id,
            tasks {
                id,
                name,
                statusId,
                type,
                description
            },
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

const moveTaskMutation = graphql(gql`
    mutation moveTask($id: Int!, $statusId: Int!) {
        moveTask(id: $id, statusId: $statusId) {
            id,
            name,
            statusId,
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
            popupOpen: false,
            openId   : 0,
            tasks    : _.get(this.props, 'data.projectByName.tasks'),
            statuses : _.get(this.props, 'data.projectByName.statuses')
        }
    }

    onDragEnd(result) {
        if (!result.destination)
            return;
        this.props.mutate({
            variables: {
                id      : parseInt(result.draggableId, 10),
                statusId: parseInt(result.destination.droppableId, 10)
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tasks   : _.get(nextProps, 'data.projectByName.tasks'),
            statuses: _.get(nextProps, 'data.projectByName.statuses')
        })
    }

    render() {
        let id = _.get(this.props, 'data.projectByName.id');

        return (
            <Layout active={2}>
                {this.state.openId !== 0 && <TaskPopup
                    open={this.state.popupOpen}
                    id={this.state.openId}
                    onClose={() => this.setState({popupOpen: false})}
                />}
                <Container fluid>
                    <Grid>
                        <Grid.Column
                            floated='left'
                            width={5}
                        >
                            <Header>Tasks</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button
                                icon
                                labelPosition='left'
                                as={Link}
                                to={{pathname: 'new_task', state: {id}}}
                            >
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
                                        {_.map(this.state.statuses, status =>
                                            <Droppable
                                                droppableId={String(status.id)}
                                                key={status.name}
                                            >
                                                {(dropProvided, snapshot) => (
                                                    <div
                                                        style={{
                                                            borderRadius   : 5,
                                                            maxHeight      : 500,
                                                            margin         : 5,
                                                            padding        : 5,
                                                            border         : "1px solid grey",
                                                            backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey'
                                                        }}
                                                    >
                                                        {status.name}
                                                        <div
                                                            style={{
                                                                overflowY: "scroll",
                                                                maxHeight: "inherit",
                                                            }}
                                                            ref={dropProvided.innerRef}
                                                        >
                                                            {_.map(_.filter(this.state.tasks, {statusId: status.id}), t =>
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
                                                                                onClick={() => this.setState({popupOpen: true, openId: t.id})}
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
