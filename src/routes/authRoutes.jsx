import React from "react";
import { Route } from "react-router-dom";

import SigninPage from "../account/pages/signinPage";
import ForgotPasswordPage from "../account/pages/forgotPasswordPage";
//quiz components

export default function AuthRoutes(props) {
  return [
    <Route exact path="/" key="/">
      <SigninPage />
    </Route>,
    <Route path="/forgotPassword" key="/forgotPassword">
      <ForgotPasswordPage />
    </Route>,

    <Route key="fallback">
      <SigninPage />
    </Route>,
  ];
}
