import React, {Component} from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem, ListItemText, ListItemIcon
} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {MoreVert, Edit, Delete} from '@material-ui/icons';
const styles = theme => ({
  root    : {
    padding: 10
  },
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

class TaskCard extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      name,
      description,
      handleEdit,
      handleDelete
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <div><IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVert />
            </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    handleEdit();
                  }}
                >
                  <ListItemIcon className={classes.icon}>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    handleDelete();
                  }}
                >
                  <ListItemIcon className={classes.icon}>
                    <Delete />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          }
          title={name}
        />
        <CardContent className={classes.root}>
          <Typography className={classes.title} color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  };
}

export default withStyles(styles)(TaskCard);
