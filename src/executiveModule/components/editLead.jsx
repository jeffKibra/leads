import React from "react";
import { useDispatch, useSelector } from "react-redux";

import LeadsForm from "./leadsForm";
import { updateData } from "../../modules/firestoreActions";

function EditLead(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const { data } = props;
  //   const lead = data[leadId];
  const { product, doctor, date, leads, remarks, leadId } = data;
  //const newDate=`${preDate.getFullYear()}-${preDate.getMonth()+1}-${preDate.getDate()}`
  const onFormSubmit = (submitData) => {
    //data.leadImage.name
    console.log(submitData);
    let leadData = {
      ...data,
      ...submitData,
    };
    //console.log(submitData);

    const collection = `executives/${auth.uid}/leads`;

    dispatch(updateData(collection, leadData.leadId, leadData));
  };

  return (
    <>
      {leadId && (
        <LeadsForm
          productId={product}
          doctorId={doctor}
          date={date}
          leads={leads}
          remarks={remarks}
          onFormSubmit={onFormSubmit}
          title="Edit Lead"
        />
      )}
    </>
  );
}

export default EditLead;
