import React from 'react';
import qs from 'query-string';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import {withRouter} from 'react-router';
import {CircularProgress, withStyles, Card, Typography, Grid} from 'material-ui';
import * as _ from 'lodash';

const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    projectById(id: $id){
      id,
      name,
      description,
      repository,
      tasks {
        statusId
      },
      statuses {
        id,
        index
      }
      releases {
        id
      }
    }
  }
`;

const styles = theme => ({
  doneDiv: {
    backgroundColor: "white",
    height: 200,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  textDiv: {
    margin: "auto",
  },
  progressDiv: {
    margin: "auto",
    position: "absolute"
  },
  text: {
    fontSize: 40,
    fontWeight: 500,
    marginBottom: 0,
  },
  subText: {
    fontSize: 20,
    color: "grey",
    fontWeight: 200,
    textAlign: "center"
  }
});


const Dashboard = ({location, classes}) => {
  const projectId = parseInt(qs.parse(location.search).project_id, 10);
  if (!projectId)
    return "No project Specified";
  return (
    <Query query={GET_PROJECT} variables={{id: projectId}}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        const {statuses, name, tasks, releases} = data.projectById;
        const maxStatus = _.get(_.find(statuses, {index: _.max(_.map(statuses, 'index'))}), 'id');
        const finished = _.filter(tasks, {statusId: maxStatus});
        const done = finished.length * 100 / tasks.length;
        return (
          <div>
            <h2>{name}</h2>
            <Grid container justify="center" spacing={8}>
              <Grid item xs={4}>
                <Card className={classes.doneDiv}>
                  <div className={classes.textDiv}>
                    <div>
                      <div>
                        <Typography className={classes.text}>{done || 0}%</Typography>
                        <div>
                          <Typography className={classes.subText}>Done</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.progressDiv}>
                    <CircularProgress
                      className={classes.progress}
                      variant="static"
                      value={done}
                      size={200}
                      thickness={2}
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.doneDiv}>
                  <div className={classes.textDiv}>
                    <div>
                      <div>
                        <Typography className={classes.text}>16</Typography>
                        <div>
                          <Typography className={classes.subText}>Tasks remaining</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.doneDiv}>
                  <div className={classes.textDiv}>
                    <div>
                      <div>
                        <Typography className={classes.text}>{releases.length}</Typography>
                        <div>
                          <Typography className={classes.subText}>Releases</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      }}
    </Query>
  )
};

export default withStyles(styles)(withRouter(Dashboard));
