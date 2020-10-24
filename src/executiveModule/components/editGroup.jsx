import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateData } from "../../modules/firestoreActions";
import GroupForm from "./groupForm";

export default function EditGroup(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const { group } = props;

  const onFormSubmit = (data) => {
    const groupData = {
      ...group,
      ...data,
      executiveId: auth.uid,
    };

    dispatch(
      updateData(`executives/${auth.uid}/groups`, group.groupId, groupData)
    );
  };

  return (
    <GroupForm
      title="Edit Group"
      defaultValues={{ ...group }}
      date={group.date}
      groupName={group.groupName}
      onFormSubmit={onFormSubmit}
    />
  );
}
