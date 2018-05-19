
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from 'material-ui'

class EditStatusDialog extends React.Component {
  state = {
    name : "",
    index: -1
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...nextProps.value})
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title">Edit status name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status name"
            type="text"
            onChange={(e) => this.setState({name: e.target.value})}
            value={this.state.name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.props.handleEdit(this.state.name, this.state.index);
              this.props.handleClose();
            }}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditStatusDialog;
