import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import EditGroup from "../components/editGroup";

export default function EditGroupPage(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { groupId } = params;

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
        },
      ],
      storeAs: "group",
    },
  ]);

  const group = useSelector((state) => state.firestore.data.group);

  if (!isLoaded(group)) return <CustomSkeleton />;
  if (isEmpty(group))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return <EditGroup group={group} />;
}
