import React from "react";
import Spinner from "../general/spinner";
import { useStyles } from "../../utils/theme";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Drawer from "./drawer";
import DrawerContent from "./drawerContent";

export default function NavBody(props) {
  const classes = useStyles();
  const { loading, name, auth } = props;

  return (
    <>
      <div>
        {" "}
        <AppBar position="fixed">
          {" "}
          <Toolbar className={`${classes.toolBar} container`}>
            {" "}
            <Drawer
              render={(toggleDrawer, state) => {
                return (
                  <DrawerContent
                    name={name}
                    toggleDrawer={toggleDrawer}
                    state={state}
                    auth={auth}
                  />
                );
              }}
            />{" "}
            <Typography variant="h6" className={classes.title}>
              {" "}
              Leads Tracking
            </Typography>{" "}
            <Spinner status={loading} />
          </Toolbar>{" "}
        </AppBar>{" "}
      </div>
    </>
  );
}
