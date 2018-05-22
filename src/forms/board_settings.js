import * as _ from "lodash";


import React from 'react';
import {Chip, InputLabel, Button} from "material-ui";

const BoardForm = () => {
  const {statuses} = this.props;
  return (
    <form>
      <InputLabel>Board categories</InputLabel>
      <br/>
      {_.map(statuses, (status, i) => (
        <Chip
          key={i}
          label={status}
          onClick={this.props.handleEditTask(status, i)}
          onDelete={this.props.deleteStatus(status)}
          className={classes.chip}
        />
      ))}
      <br/>
      <Button color={'primary'} onClick={this.addStatus}>New status</Button>
    </form>
  )
};

export default BoardForm;

