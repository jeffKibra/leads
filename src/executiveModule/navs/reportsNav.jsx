import React from "react";
import { ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DrawerListItem from "../../components/drawerListItem";

const useStyles = makeStyles((theme) => {
  return {
    text: {
      padding: theme.spacing(1, 2),
      color: theme.palette.text.disabled,
    },
  };
});

export default function QuizNav(props) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="caption" className={classes.text}>
        QUIZ REPORTS
      </Typography>

      <DrawerListItem to="/doctors">
        <ListItemText primary="Doctors Quiz Reports" />
      </DrawerListItem>
      <DrawerListItem to="/groupsList">
        <ListItemText primary="Groups Quiz Reports" />
      </DrawerListItem>
    </>
  );
}
