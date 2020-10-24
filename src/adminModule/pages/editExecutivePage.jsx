import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import EditExecutive from "../components/editExecutive";

export default function EditExecutivePage(props) {
  const params = useParams();
  const { executiveId } = params;

  const executive = useSelector((state) => {
    return state.firestore.data[executiveId];
  });
  console.log(executive);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      storeAs: executiveId,
    },
  ]);

  return <EditExecutive data={executive} />;
}
