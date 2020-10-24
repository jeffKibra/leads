import React from "react";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function ActionEdit(props) {
  const { handleEditClick } = props;

  return (
    <IconButton onClick={handleEditClick} color="primary">
      <FontAwesomeIcon icon="edit" />
    </IconButton>
  );
}

ActionEdit.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
};
