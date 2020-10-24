import React from "react";
import { uuid } from "uuidv4";
import { useDispatch, useSelector } from "react-redux";

import DoctorsForm from "../components/doctorsForm";
import { addData } from "../../modules/firestoreActions";

export default function AddDoctorPage(props) {
  const dispatch = useDispatch();
  const executiveId = useSelector((state) => state.firebase.auth.uid);

  const onFormSubmit = (data) => {
    const doctorId = uuid();

    let doctorData = {
      ...data,
      doctorId,
      executiveId,
      date: new Date().toDateString(),
    };

    const collection = `executives/${executiveId}/doctors`;

    dispatch(addData(collection, doctorData.doctorId, doctorData));
  };

  return <DoctorsForm onFormSubmit={onFormSubmit} />;
}
