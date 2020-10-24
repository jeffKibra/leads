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

export default function ExecutivesNav(props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="caption" className={classes.text}>
        EXECUTIVES
      </Typography>
      <DrawerListItem to="/executives">
        <ListItemText primary="Manage Executives" />
      </DrawerListItem>
      <DrawerListItem to="/addExecutive">
        <ListItemText primary="Add Executive" />
      </DrawerListItem>
    </>
  );
}
