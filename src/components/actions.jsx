import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import ActionEdit from "./actionEdit";
import ActionDelete from "./actionDelete";

export default function Actions(props) {
  const history = useHistory();
  const { editRoute, handleDelete } = props;

  const handleEditClick = () => {
    history.push(editRoute);
  };

  return (
    <Grid container justify="space-around">
      <ActionEdit handleEditClick={handleEditClick} />
      <ActionDelete handleDelete={handleDelete} />
    </Grid>
  );
}

Actions.propTypes = {
  editRoute: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
