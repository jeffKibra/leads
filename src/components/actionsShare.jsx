import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import DeleteDialogue from "./deleteDialogue";
import ActionShare from "./actionShare";

export default function Actions(props) {
  const history = useHistory();
  const { editRoute, handleDelete, text, email } = props;

  const handleEditClick = () => {
    history.push(editRoute);
  };

  const onTrashClick = () => {
    handleDelete();
  };

  return (
    <Grid container justify="space-around">
      <ActionShare text={text} email={email} />
      <IconButton onClick={handleEditClick} color="primary">
        <FontAwesomeIcon icon="edit" />
      </IconButton>
      <DeleteDialogue
        onTrashClick={onTrashClick}
        render={(handleClickOpen) => (
          <IconButton onClick={handleClickOpen}>
            <FontAwesomeIcon style={{ color: "red" }} icon="trash-alt" />
          </IconButton>
        )}
      />
    </Grid>
  );
}

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  editRoute: PropTypes.string.isRequired,
};
