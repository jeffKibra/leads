import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function Protected({ children }) {
  const location = useLocation();
  const auth = useSelector((state) => {
    //console.log(state);
    return state.firebase.auth;
  });

  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: location },
          }}
        />
      )}
    </>
  );
}

export default Protected;
