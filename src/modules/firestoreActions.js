import $ from "jquery";
import { storage } from "./fire";
import {
  //setLoading,
  setLinearProgress,
  setMsg,
  setShowProgress,
} from "./basicActions";

export function uploadFile(storagePath, file, cb, dataObject) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setShowProgress(true));
    const firebase = getFirebase();
    const uploadTask = storage.ref().child(storagePath).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(setLinearProgress(progress));
        console.log(progress);

        console.log("upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("upload paused");
            dispatch(setMsg("upload paused"));
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("upload is running");
            dispatch(setMsg("uploading..."));
            break;
          default:
            console.log(snapshot.state);
            dispatch(setMsg(snapshot.state));
            break;
        }
      },
      (err) => {
        dispatch(setShowProgress(false));
        switch (err.code) {
          case "storage/unauthorized":
            dispatch(setMsg("unauthorized"))
            $("#snackBarTrigger").trigger("click")
            console.log("unauthorized");
            break;
          case "storage/canceled":
            dispatch(setMsg("upload canceled"))
            $("#snackBarTrigger").trigger("click")
            console.log("canceled");
            break;
          case "storage/unknown":
            dispatch(setMsg("unknown error"))
            $("#snackBarTrigger").trigger("click")
            console.log("unknown error");
            break;
          default:
            dispatch(setMsg(err.code))
            $("#snackBarTrigger").trigger("click")
            console.log(err.code);
            break;
        }
      },
      () => {
        dispatch(setShowProgress(false));
        dispatch(setMsg("uploaded"))
        $("#snackBarTrigger").trigger("click")
        uploadTask.snapshot.ref.getDownloadURL().then((imageURL) => {
          console.log("file available at ", imageURL);
          if(cb){
            cb(imageURL)
          }   
        });
      }
    );
  };
}

export function deleteFile(storagePath, cb) {
  return (dispatch, getState, {getFirestore})=>{
    storage.ref().child(storagePath).delete().then(()=>{
      dispatch(setMsg("deleted"))
      $("#snackBarTrigger").trigger("click")
      if(cb){
        cb()
      }
    }).catch(err=>{
      dispatch(setMsg(err.code))
      console.log(err)
      $("#snackBarTrigger").trigger("click")
    })

  }
}

export function addData(collection, doc, data) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const firestore = getFirestore();
    console.log("adding to firestore");
    dispatch(setMsg("data saved"));
    $("#snackBarTrigger").trigger("click");
    firestore
      .collection(collection)
      .doc(doc)
      .set(data, { merge: true })
      .then(() => {
        dispatch(setMsg("data saved"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        dispatch(setMsg("error saving"));
        $("#snackBarTrigger").trigger("click");
        console.log(err);
      });
  };
}

export function deleteData(collection, doc) {
  return (dispatch, getState, { getFirestore }) => {
    // dispatch(loading());
    console.log(collection);
    //console.log({ userId, entryId, journalId, entryData });
    const firestore = getFirestore();

    dispatch(setMsg("deleted!"));
    $("#snackBarTrigger").trigger("click");
    firestore
      .collection(collection)
      .doc(doc)
      .delete()
      .then((val) => {
        //console.log(val);
        dispatch(setMsg("deleted!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMsg("deletion failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

export function updateData(collection, doc, data) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());

    //console.log({ userId, entryId, journalId });
    const firestore = getFirestore();
    dispatch(setMsg("updated!"));
    $("#snackBarTrigger").trigger("click");
    firestore
      .collection(collection)
      .doc(doc)
      .update(data)
      .then((val) => {
        //console.log(val);
        dispatch(setMsg("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMsg("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

export function updateJournal(journalData, journalsCollection) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const { journalId } = journalData;
    const userId = getState().firebase.auth.uid;
    //console.log({ userId, journalId, journalData });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection(journalsCollection)
      .doc(journalId)
      .update(journalData)
      .then((val) => {
        //console.log(val);
        dispatch(setMsg("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMsg("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

export function newJournal(journalData, journalsCollection) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const { journalId } = journalData;
    const userId = getState().firebase.auth.uid;
    console.log({ userId, journalId, journalData, journalsCollection });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection(journalsCollection)
      .doc(journalId)
      .set(journalData)
      .then((val) => {
        //console.log(val);
        dispatch(setMsg("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMsg("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}
