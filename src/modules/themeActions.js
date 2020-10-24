function applyTheme(theme) {
  return (dispatch, getState, { getFirestore }) => {
    // dispatch(loading());
    const userId = getState().firebase.auth.uid;
    //console.log({ theme, userId });
    //console.log({ userId, entryId, journalId, entryData });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .set(theme, { merge: true })
      .then((val) => {
        //console.log("theme applied");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export { applyTheme };
