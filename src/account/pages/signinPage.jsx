import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import Signin from "../components/signin";
import CreateAccount from "../components/createAccount";
import CheckEmail from "../components/checkEmail";
import {
  checkEmailAsync,
  signupAsync,
  loginAsync,
} from "../../modules/authActions";
import FirebaseUI from "../components/firebaseUI";
import { setEmailChecked } from "../../modules/basicActions";

const useStyles = makeStyles((theme) => {
  return {
    main: {
      //display: "flex",
    },
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

export default function SigninPage(props) {
  const dispatch = useDispatch();
  const isNewUser = useSelector((state) => state.custom.isNewUser);
  const emailChecked = useSelector((state) => state.custom.emailChecked);
  const auth = useSelector((state) => state.firebase.auth);

  console.log(isNewUser, emailChecked, auth);
  const classes = useStyles();

  const handleCheckEmail = (data) => {
    console.log(data);
    dispatch(checkEmailAsync(data));
  };

  const handleSignin = (data) => {
    dispatch(loginAsync(data));
    console.log(data);
  };

  const handleCreateAccount = (data) => {
    console.log(data);
    dispatch(signupAsync(data));
  };

  const goBack = () => {
    dispatch(setEmailChecked(false));
  };

  const primaryTitle = "Sign in with email...";
  const [title, setTitle] = useState(primaryTitle);

  useEffect(() => {
    if (isNewUser === null) {
      setTitle(primaryTitle);
    } else {
      if (isNewUser === true) {
        setTitle("Create account!");
      } else if (isNewUser === false) {
        setTitle(primaryTitle);
      }
    }
  }, [isNewUser]);

  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
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
              <CardHeader className={classes.cardHeader} title={title} />
              <CardContent className={classes.cardContent}>
                {emailChecked ? (
                  <>
                    {isNewUser !== null && isNewUser === true && (
                      <CreateAccount
                        goBack={goBack}
                        onFormSubmit={handleCreateAccount}
                      />
                    )}
                    {isNewUser !== null && isNewUser === false && (
                      <Signin goBack={goBack} onFormSubmit={handleSignin} />
                    )}
                  </>
                ) : (
                  <CheckEmail onFormSubmit={handleCheckEmail} />
                )}

                <Divider />
                <FirebaseUI />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
