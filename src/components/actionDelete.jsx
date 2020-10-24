import React from "react";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import DeleteDialogue from "./deleteDialogue";

export default function Actions(props) {
  const { handleDelete } = props;

  const onTrashClick = () => {
    handleDelete();
  };

  return (
    <DeleteDialogue
      onTrashClick={onTrashClick}
      render={(handleClickOpen) => (
        <IconButton onClick={handleClickOpen}>
          <FontAwesomeIcon style={{ color: "red" }} icon="trash-alt" />
        </IconButton>
      )}
    />
  );
}

Actions.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};
