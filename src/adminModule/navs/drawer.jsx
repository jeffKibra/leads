import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Drawer, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DrawerContent from "./drawerContent";
import DrawerPopper from "./drawerPopper";

const drawerWidth = 224;
const closedWidth = 104;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: closedWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: closedWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0, //theme.spacing(7) + 1,
    [theme.breakpoints.up("md")]: {
      width: closedWidth,
    },
  },
  drawerHalfContent: {
    display: "none",
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2, 0),
    },
  },
  banner: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerContent: {
    display: "none",
    transition: theme.transitions.create("display", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  drawerPopper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: theme.transitions.create("display", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icon: {
    color: theme.palette.common.white,
  },
  chartIcon: {
    padding: theme.spacing(2),
  },
}));

//mini variant--- part shown at all times

export default function MainDrawer(props) {
  const classes = useStyles();
  const { handleDrawerOpen, handleDrawerClose, open } = props;

  return (
    <Drawer
      id="drawer"
      color="primary"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography className={classes.banner}>
          <span className={classes.chartIcon}>
            <FontAwesomeIcon icon="chart-line" />
          </span>
          {open ? "LEAD TRACKER" : null}
        </Typography>
      </div>
      <Divider />

      <div className={classes.drawerPopper}>{open && <DrawerPopper />}</div>

      <div className={classes.drawerContent}>
        {open ? <DrawerContent /> : <DrawerPopper />}
      </div>

      {/* <Divider /> */}
      <div className={classes.drawerHalfContent}>
        <IconButton
          className={classes.icon}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
}

MainDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
};
