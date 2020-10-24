import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

export default function Spinner(props) {
  const { loading } = props;

  return <>{loading && <CircularProgress size={16} color="secondary" />}</>;
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};
// <span role="status" className="spinner-border spinner-border-sm"></span>
