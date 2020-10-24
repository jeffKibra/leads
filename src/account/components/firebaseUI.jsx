import React from "react";
import firebase from "../../modules/fire";
import { StyledFirebaseAuth } from "react-firebaseui";

const uiConfig = {
  //signInFlow: "popup",
  callbacks: {
    signinSuccessWithAuthResult: (data) => {
      console.log(data);
      return false;
    },
    // signInSuccess: () => {
    //   return false;
    // },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
  ],
};

export default function FirebaseUi(props) {
  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}
