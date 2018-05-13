import * as _ from 'lodash';
import React, {Component} from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from 'material-ui';
import RegularCard from '../components/regular_card';
import {withStyles} from 'material-ui/styles';
import {Add} from '@material-ui/icons';
import {graphql, compose} from 'react-apollo';
import {gql} from 'apollo-boost';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import qs from 'query-string';

import EditTask from '../components/popups/edit_task';
import NewTask from '../components/popups/new_task';

const styles = theme => ({
  fab     : {
    position: 'absolute',
    bottom  : theme.spacing.unit * 2,
    right   : theme.spacing.unit * 2,
  },
  flex    : {
    flexGrow: 1,
  },
  centered: {
    textAlign: 'center'
  }
});

const getTasksQuery = graphql(gql`
    query GetTasksForProject($id: Int!) {
        projectById(id: $id){
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
      variables: {id: parseInt(qs.parse(props.location.search).project_id, 10)},
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
      editOpen: false,
      newOpen : false,
      editTask: {
        name: "",
        description: "",
        status: 0,
        type: 0
      },
      tasks   : _.get(this.props, 'data.projectById.tasks'),
      statuses: _.get(this.props, 'data.projectById.statuses')
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
      tasks   : _.get(nextProps, 'data.projectById.tasks'),
      statuses: _.get(nextProps, 'data.projectById.statuses')
    })
  }

  render() {
    const statuses  = _.get(this.props, 'data.projectById.statuses');
    const tasks     = _.get(this.props, 'data.projectById.tasks');
    const {classes} = this.props;

    return (
      <div>
        <Grid container justify="center" spacing={8}>
          <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
          >
            {_.map(statuses, (status, key) => (
              <Grid key={key} item xs>
                <Droppable
                  droppableId={String(status.id)}
                  key={status.name}
                >
                  {(dropProvided, snapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                    >
                      <RegularCard
                        style={snapshot.isDraggingOver ? {backgroundColor: '#FBB'} : {}}
                        headerColor={"blue"}
                        cardTitle={status.name}
                        // cardSubtitle={_.filter(tasks, {statusId: status.id}).length + " tasks"}
                        content={
                          _.map(_.filter(tasks, {statusId: status.id}), (task, key) =>
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                            >
                              {(dragProvided, snapshot) => (
                                <div
                                  style={{
                                    marginBottom: 7,
                                    cursor      : "pointer",
                                    userSelect  : "none"
                                  }}
                                  key={task.id}
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.dragHandleProps}
                                >
                                  <Card className={classes.card}>
                                    <CardContent>
                                      <Typography className={classes.title} color="textSecondary">
                                        {task.name}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button
                                        onClick={() => this.setState({
                                          editOpen: true,
                                          editTask: task
                                        })}
                                        size="small"
                                      >
                                        Edit
                                      </Button>
                                    </CardActions>
                                  </Card>
                                  {dragProvided.placeholder}
                                </div>
                              )}
                            </Draggable>
                          )
                        }
                      />
                    </div>
                  )}
                </Droppable>
              </Grid>
            ))}
          </DragDropContext>
        </Grid>
        <Button variant="fab" onClick={() => this.setState({newOpen: true})} color="primary"
                aria-label="add" className={classes.fab}>
          <Add/>
        </Button>
        <EditTask
          open={this.state.editOpen}
          task={this.state.editTask}
          statuses={statuses}
          onClose={() => this.setState({editOpen: false})}
        />
        <NewTask
          open={this.state.newOpen}
          onClose={() => this.setState({newOpen: false})}
        />
      </div>
    );
  };
}

export default withData(withStyles(styles)(Tasks));
