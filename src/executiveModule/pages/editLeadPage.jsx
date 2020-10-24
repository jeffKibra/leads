import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";
import { Grid } from "react";

import EditLead from "../components/editLead";
import CustomSkeleton from "../../components/customSkeleton";

export default function EditLeadPage(props) {
  const params = useParams();
  const auth = useSelector((state) => state.firebase.auth);
  const { leadId } = params;

  const lead = useSelector((state) => {
    return state.firestore.data[leadId];
  });

  //console.log(lead);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "leads",
          doc: leadId,
          storeAs: leadId,
        },
      ],
      storeAs: leadId,
    },
  ]);

  if (!isLoaded(lead)) return <CustomSkeleton />;

  if (isEmpty(lead))
    return (
      <Grid container justify="center">
        <Empty />
      </Grid>
    );

  return <EditLead data={lead} />;
}
