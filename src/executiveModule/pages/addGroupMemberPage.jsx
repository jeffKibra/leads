import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uuid } from "uuidv4";

import MemberForm from "../components/memberForm";
import { addData } from "../../modules/firestoreActions";

export default function AddGroupMemberPage(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { groupId } = params;

  const auth = useSelector((state) => state.firebase.auth);

  const onFormSubmit = (data) => {
    const memberId = uuid();
    const memberData = {
      ...data,
      memberId,
    };

    console.log(memberData);

    dispatch(
      addData(
        `executives/${auth.uid}/groups/${groupId}/members`,
        memberData.memberId,
        memberData
      )
    );
  };

  return (
    <>
      <MemberForm title="Add Member" onFormSubmit={onFormSubmit} />
    </>
  );
}
