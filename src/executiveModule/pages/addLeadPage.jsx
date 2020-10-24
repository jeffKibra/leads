import React from "react";
import { uuid } from "uuidv4";
import { useDispatch, useSelector } from "react-redux";

import LeadsForm from "../components/leadsForm";
import { addData } from "../../modules/firestoreActions";

export default function AddLeadPage(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const onFormSubmit = (data) => {
    const leadId = uuid();
    console.log(data);
    let leadData = {
      ...data,
      leadId,
    };

    const collection = `executives/${auth.uid}/leads`;

    dispatch(addData(collection, leadData.leadId, leadData));
  };

  return (
    <>
      <LeadsForm title="Add Lead" onFormSubmit={onFormSubmit} />
    </>
  );
}
