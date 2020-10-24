import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uuid } from "uuidv4";

import { addData } from "../../modules/firestoreActions";
import GroupForm from "../components/groupForm";

export default function AddGroupPage(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const onFormSubmit = (data) => {
    const groupId = uuid();

    const groupData = {
      ...data,
      groupId,
      executiveId: auth.uid,
    };

    dispatch(
      addData(`executives/${auth.uid}/groups`, groupData.groupId, groupData)
    );
  };

  return <GroupForm title="Add Group" onFormSubmit={onFormSubmit} />;
}
