import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab } from "@material-ui/core";
import { useStyles } from "../../utils/theme";

const ReadBtn = (props) => {
  const classes = useStyles();

  return (
    <Fab
      onClick={props.read}
      className={`${classes.fab} ${classes.readFab}`}
      aria-controls="write-button"
    >
      <FontAwesomeIcon icon="book-open" />
    </Fab>
  );
};

export default ReadBtn;
