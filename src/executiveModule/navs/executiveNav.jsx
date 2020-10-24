import React from "react";
import { Typography, Toolbar, AppBar, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSelector } from "react-redux";
//import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

import Drawer from "./drawer";
import Profile from "../../account/components/profile";
import Spinner from "../../components/spinner";

const drawerWidth = 224;
const closedWidth = 104;

const useStyles = makeStyles((theme) => {
  // console.log(theme);
  return {
    root: {
      //display: "flex",
    },
    main: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${closedWidth}px)`,
        marginLeft: closedWidth,
      },
    },
    appBarShift: {
      marginLeft: closedWidth,
      width: `calc(100% - ${closedWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    content: {
      // display: "flex",
      // flexDirection: "column",
      // flexGrow: 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${closedWidth}px)`,
        marginLeft: closedWidth,
      },
      padding: theme.spacing(3),
      marginBottom: 100,
    },
    contentOpen: {
      // display: "flex",
      // flexDirection: "column",
      // flexGrow: 1,
      marginLeft: closedWidth,
      width: `calc(100% - ${closedWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
      padding: theme.spacing(3),
      marginBottom: 100,
    },
    // necessary for content to be below app bar
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    spinner: {
      padding: theme.spacing(1, 2),
    },
  };
});

//mini variant--- part shown at all times

export default function MainNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const loading = useSelector((state) => state.custom.loading);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        id="appbar"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Typography className={classes.main} variant="h6" noWrap>
            LEAD TRACKER - EXECUTIVE
          </Typography>

          <div className={classes.spinner}>
            <Spinner loading={loading} />
          </div>

          <Profile />
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentOpen]: open,
        })}
      >
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
