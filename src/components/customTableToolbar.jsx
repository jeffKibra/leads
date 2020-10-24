import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Toolbar } from "@material-ui/core";

import SearchInput from "./searchInput";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  title: {
    flex: "1 1 100%",
  },
}));

export default function CustomTableToolbar(props) {
  const classes = useStyles();
  const { handleSearch, title } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <SearchInput handleSearch={handleSearch} />
    </Toolbar>
  );
}

CustomTableToolbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
