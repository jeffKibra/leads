import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import EditDoctor from "../components/editDoctor";

export default function EditDoctorPage(props) {
  const params = useParams();
  const auth = useSelector((state) => state.firebase.auth);

  const { doctorId } = params;

  const doctor = useSelector((state) => {
    return state.firestore.data[doctorId];
  });

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "doctors",
          doc: doctorId,
          storeAs: doctorId,
        },
      ],
      storeAs: doctorId,
    },
  ]);

  return <EditDoctor data={doctor} />;
}
