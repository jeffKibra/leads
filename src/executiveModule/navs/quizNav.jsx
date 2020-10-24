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
        GROUPS
      </Typography>

      <DrawerListItem to="/groupsList">
        <ListItemText primary="Manage Groups" />
      </DrawerListItem>
      <DrawerListItem to="/addGroup">
        <ListItemText primary="Add Group" />
      </DrawerListItem>

      <Typography variant="caption" className={classes.text}>
        DOCTORS
      </Typography>

      <DrawerListItem to="/doctors">
        <ListItemText primary="Doctors" />
      </DrawerListItem>
    </>
  );
}
