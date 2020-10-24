import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useLocation, Redirect } from "react-router-dom";

export default function IsLogged(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const location = useLocation();

  console.log(location);
  const { children } = props;

  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      ) : (
        children
      )}
    </>
  );
}
