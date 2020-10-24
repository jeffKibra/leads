import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import EditGroupMember from "../components/editGroupMember";

export default function EditGroupPage(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { groupId, memberId } = params;

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
          subcollections: [
            {
              collection: "members",
              doc: memberId,
            },
          ],
        },
      ],
      storeAs: "groupMember",
    },
  ]);

  const groupMember = useSelector((state) => state.firestore.data.groupMember);
  if (!isLoaded(groupMember)) return <CustomSkeleton />;
  if (isEmpty(groupMember))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return <EditGroupMember groupMember={groupMember} />;
}
