import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DoctorsForm from "./doctorsForm";
import { updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditDoctor(props) {
  const dispatch = useDispatch();
  const executiveId = useSelector((state) => state.firebase.auth.uid);

  const { loadedData } = props;
  //   const doctor = loadedData[doctorId];
  const {
    firstName,
    lastName,
    email,
    mobile1,
    mobile2,
    landline,
    address,
    designation,
    clinicName,
    location,
    level,
    other1,
    other2,
    other3,
    doctorId,
  } = loadedData;

  const onFormSubmit = (data) => {
    let doctorData = {
      ...loadedData,
      ...data,
      executiveId,
    };

    const collection = `executives/${executiveId}/doctors`;

    dispatch(updateData(collection, doctorData.doctorId, doctorData));
  };

  return (
    <>
      {doctorId && (
        <DoctorsForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          mobile1={mobile1}
          mobile2={mobile2}
          landline={landline}
          address={address}
          designation={designation}
          clinicName={clinicName}
          location={location}
          level={level}
          other1={other1}
          other2={other2}
          other3={other3}
          onFormSubmit={onFormSubmit}
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditDoctor);
