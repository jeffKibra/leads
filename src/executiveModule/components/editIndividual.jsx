import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateData } from "../../modules/firestoreActions";
import MemberForm from "./memberForm";

export default function EditGroup(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { individualId } = params;

  const { individual } = props;

  const onFormSubmit = (data) => {
    const individualData = {
      ...individual,
      ...data,
    };

    dispatch(
      updateData(
        `executives/${auth.uid}/individuals`,
        individualId,
        individualData
      )
    );
  };

  return (
    <MemberForm
      title="Edit Individual"
      defaultValues={{ ...individual }}
      onFormSubmit={onFormSubmit}
    />
  );
}
