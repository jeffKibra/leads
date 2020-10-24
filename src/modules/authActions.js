import $ from "jquery";
//import { functions } from "./fire";
import {
  setMsg,
  setLoading,
  setEmail,
  setNewUser,
  setEmailChecked,
} from "./basicActions";
const url = "https://leads-tracking-73786.web.app";
//const url = "http://localhost:5000";

export function loginAsync(loginData) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(setLoading(true));
    dispatch(setMsg(""));
    const firebase = getFirebase();
    const { email, password } = loginData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //console.log(user);
        dispatch(setMsg("login successful!"));
        dispatch(setLoading(false));
        dispatch(setEmailChecked(false));
        $("#snackBarTrigger").trigger("click");
        return user;
      })
      .then((user) => user.getIdToken())
      .then((idToken) => {
        //pass idToken to the server to set admin rights
        fetch(`${url}/api/setRole`, {
          method: "POST",
          headers: new Headers({ "Content-type": "application/json" }),
          body: JSON.stringify({ idToken: idToken }),
        })
          .then((res) => res.json())
          .then((resp) => {
            dispatch(setLoading(false));
            console.log(resp);
            if (resp.status === "success") {
              //force token refresh
              firebase.auth().currentUser.getIdToken(true);
              dispatch(setMsg("welcome"));
            }
          });
      })
      .catch((error) => {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        let err;
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          err = "Invalid username or password!";
        } else {
          err = errorCode;
        }
        dispatch(setLoading(false));
        dispatch(setMsg(err));
        $("#snackBarTrigger").trigger("click");

        // ...
      });
  };
}

export function logoutAsync() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    //db.pin.clear();
    firebase.auth().signOut();
  };
}

export function forgotPasswordAsync(data) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    //db.pin.clear();
    console.log(data);
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        console.log("password reset email sent");
        dispatch(setMsg("password reset email sent"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        dispatch(setMsg(err.code));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

export function signupAsync(signupData) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setLoading(true));
    dispatch(setMsg(""));
    console.log(signupData);
    const { email, password, firstName, lastName } = signupData;
    const firebase = getFirebase();
    // const firestore = getFirestore();
    // let msg;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setEmailChecked(false));
        dispatch(setEmail(""));
        // firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: `${firstName} ${lastName}`,
          })
          .then(() => {
            console.log("user updated");
          });
        user.sendEmailVerification().then(() => {
          console.log("email verification sent");
        });
        return user;
      })
      .then((user) => user.getIdToken())
      .then((idToken) => {
        //pass idToken to the server to set admin rights
        fetch(`${url}/api/setRole`, {
          method: "POST",
          headers: new Headers({ "Content-type": "application/json" }),
          body: JSON.stringify({ idToken: idToken }),
        })
          .then((res) => res.json())
          .then((resp) => {
            dispatch(setLoading(false));
            console.log(resp);
            if (resp.status === "success") {
              //force token refresh
              firebase.auth().currentUser.getIdToken(true);
              dispatch(setMsg("welcome"));
              $("#snackBarTrigger").trigger("click");
            }
          });
        //.catch((err) => console.log(err));
      })

      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });

        const msg = "Network error! Please try again!";
        dispatch(setLoading(false));
        dispatch(setMsg(msg));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

export function checkEmailAsync(emailData) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(setMsg(""));
    const { email } = emailData;
    dispatch(setEmail(email));

    fetch(`${url}/api/checkEmail`, {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((resp) => {
        dispatch(setLoading(false));
        dispatch(setEmailChecked(true));
        if (resp.status === "found") {
          dispatch(setNewUser(false));
        } else if (resp.status === "new_user") {
          dispatch(setNewUser(true));
        }
        console.log(resp);
      })
      .catch((err) => {
        dispatch(setEmailChecked(false));
        dispatch(setLoading(false));
        dispatch(setMsg("network error"));
        $("#snackBarTrigger").trigger("click");
        console.log(err);
      });

    console.log(emailData);
  };
}
