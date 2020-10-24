import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    menuItem: {
      padding: theme.spacing(1, 2),
      "&:focus": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  };
});

export default function DrawerListItem(props) {
  const { to } = props;
  const location = useLocation();
  const classes = useStyles();
  return (
    <ListItem
      component={Link}
      to={to}
      selected={to === location.pathname}
      button
      className={classes.menuItem}
    >
      {props.children}
    </ListItem>
  );
}
