import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateData } from "../../modules/firestoreActions";
import MemberForm from "./memberForm";

export default function EditGroup(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { groupId, memberId } = params;

  const { groupMember } = props;

  const onFormSubmit = (data) => {
    const groupMemberData = {
      ...groupMember,
      ...data,
    };

    dispatch(
      updateData(
        `executives/${auth.uid}/groups/${groupId}/groupMembers`,
        memberId,
        groupMemberData
      )
    );
  };

  return (
    <MemberForm
      title="Edit Member"
      defaultValues={{ ...groupMember }}
      onFormSubmit={onFormSubmit}
    />
  );
}
