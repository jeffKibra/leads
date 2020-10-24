// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
//import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLPnTrsFoHB8fY8O2Y78eWDejUiQusCsQ",
  authDomain: "leads-tracking-73786.firebaseapp.com",
  databaseURL: "https://leads-tracking-73786.firebaseio.com",
  projectId: "leads-tracking-73786",
  storageBucket: "leads-tracking-73786.appspot.com",
  messagingSenderId: "349021710974",
  appId: "1:349021710974:web:257f29ad20e08a02a5862f",
  measurementId: "G-16MRD3RGRV",
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
//firebase.firestore();

firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log("offline data enabled");
  })
  .catch(function (err) {
    console.log({ errorCode: err.code, errorMessage: err.message });
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      alert(
        "To store data for offline availability... please open one tab at a time"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("your browser does not support offline data caching");
    }
  });

const firestore = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();
functions.useFunctionsEmulator(
  "http://localhost:5001/leads-tracking-73786/us-central1/checkEmail"
);
export { functions, firestore, storage };

// Subsequent queries will use persistence, if it was enabled successfully

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
export default firebase;
