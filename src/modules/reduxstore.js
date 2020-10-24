import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import {
  firestoreReducer,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import thunk from "redux-thunk";
import customReducer from "./customReducer";
import firebase from "./fire";

const initialState = window && window.__INITIAL_STATE__;

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  custom: customReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
);

export default store;
