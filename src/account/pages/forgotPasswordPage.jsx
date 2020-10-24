import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { forgotPasswordAsync } from "../../modules/authActions";
import ForgotPassword from "../components/forgotPassword";

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.common.white,
    },
    root: {
      //height: "100vh",
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: 360,
      maxWidth: "90%",
      //flexGrow: 1,
      //padding: theme.spacing(2),
    },
    cardHeader: {
      padding: theme.spacing(3, 3, 0, 3),
    },
    cardContent: {
      padding: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(2, 0),
    },
    replica: {
      ...theme.mixins.toolbar,
    },
  };
});

export default function ForgotPasswordPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleForgotPassword = (data) => {
    console.log(data);
    dispatch(forgotPasswordAsync(data));
  };

  return (
    <div className={classes.main}>
      <AppBar className={classes.appBar} position="fixed">
        <div className="container">
          <Toolbar>
            <Typography variant="h6">LEAD TRACKER</Typography>
          </Toolbar>
        </div>
      </AppBar>
      <AppBar className={classes.appBar}>
        <div className="container">
          <Toolbar>
            <Typography variant="h6">LEAD TRACKER</Typography>
          </Toolbar>
        </div>
      </AppBar>
      <div className={classes.replica}></div>

      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="Forgot password" />
          <CardContent className={classes.cardContent}>
            <ForgotPassword onFormSubmit={handleForgotPassword} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
