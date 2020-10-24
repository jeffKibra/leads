import React from "react";
import { Popper, Fade, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(1, 2),
      padding: theme.spacing(1),
    },
  };
});

export default function PositionedPopper(props) {
  const { placement, children, open, anchorEl, styles } = props;
  const classes = useStyles();

  return (
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Card className={`${classes.root} ${styles}`}>{children}</Card>
        </Fade>
      )}
    </Popper>
  );
}
