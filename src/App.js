import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { isLoaded, isEmpty, useFirestoreConnect } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import AdminNav from "./adminModule/navs/adminNav";
import SnackBar from "./components/snackBar";
import AdminRoutes from "./routes/adminRoutes";
import Protected from "./components/protected";
import ThemeWrapper from "./components/themeWrapper";
import AuthRoutes from "./routes/authRoutes";
import MainBackdrop from "./components/backdrop";

import ExecutiveNav from "./executiveModule/navs/executiveNav";
import ExecutiveRoutes from "./routes/executiveRoutes";

import "./App.css";
import "antd/dist/antd.css";

const mapStateToProps = (state) => {
  console.log(state);
  const { auth, profile } = state.firebase;
  const user = state.firestore.data[auth.uid];
  return { auth, profile, user };
};

function App(props) {
  const { auth, user } = props;

  useFirestoreConnect([
    {
      collection: "users",
      doc: auth.uid,
      storeAs: auth.uid,
    },
  ]);

  if (isEmpty(auth))
    return (
      <ThemeWrapper>
        <Router>
          <Switch>{AuthRoutes()}</Switch>
        </Router>
        <SnackBar />
      </ThemeWrapper>
    );

  if (!isLoaded(user)) return <MainBackdrop status={!!auth} />;
  if (isEmpty(user))
    return (
      <Grid>
        <Empty />
      </Grid>
    );

  const { role } = user;
  console.log(role);

  return (
    <>
      {"  "}
      <ThemeWrapper>
        <Router>
          <nav>
            {role === "admin" ? (
              <Protected>
                <AdminNav>
                  <Switch>{AdminRoutes()}</Switch>
                </AdminNav>
              </Protected>
            ) : role === "executive" ? (
              <Protected>
                <ExecutiveNav>
                  <Switch>{ExecutiveRoutes()}</Switch>
                </ExecutiveNav>
              </Protected>
            ) : (
              <p>
                welcome! This is a private app. Contact the admin for more
                details!
              </p>
            )}
          </nav>

          <SnackBar />
        </Router>
      </ThemeWrapper>
    </>
  );
}

export default connect(mapStateToProps)(App);
