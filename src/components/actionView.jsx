import React from "react";
import { IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function ActionView(props) {
  const { handleViewClick } = props;

  return (
    <IconButton onClick={handleViewClick}>
      <Visibility />
    </IconButton>
  );
}

ActionView.propTypes = {
  handleViewClick: PropTypes.func.isRequired,
};
