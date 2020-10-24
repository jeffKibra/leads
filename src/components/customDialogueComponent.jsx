import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function CustomDialogueComponent(props) {
  //console.log(props);
  const { description, open, handleClose, confirm, title } = props;

  return (
    <div>
      {props.children}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            cancel {"    "}
            <FontAwesomeIcon icon="times" />
          </Button>
          <Button onClick={confirm} color="secondary">
            confirm {"    "}
            <FontAwesomeIcon icon="check" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomDialogueComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default CustomDialogueComponent;
