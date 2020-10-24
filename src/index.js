import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import store from "./modules/reduxstore";
import firebase from "./modules/fire";
import App from "./App";
import MainBackdrop from "./components/backdrop";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableClaims: true, // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <MainBackdrop status={!!auth} />;
  return children;
}

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
