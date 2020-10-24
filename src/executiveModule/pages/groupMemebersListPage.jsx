import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Empty } from "antd";
import { useParams, Link } from "react-router-dom";

import CustomSkeleton from "../../components/customSkeleton";
import GroupMembersList from "../components/groupMembersList";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

export default function GroupMembersListPage(props) {
  const classes = useStyles();
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
          subcollections: [
            {
              collection: "members",
            },
          ],
        },
      ],
      storeAs: "groupMembers",
    },
  ]);

  const groupMembers = useSelector(
    (state) => state.firestore.ordered.groupMembers
  );

  if (!isLoaded(groupMembers)) return <CustomSkeleton />;

  return (
    <>
      <Grid container justify="center">
        <Button
          className={classes.button}
          component={Link}
          to={`/addGroupMember/${groupId}`}
        >
          add
        </Button>
      </Grid>

      {isEmpty(groupMembers) ? (
        <Grid container justify="center">
          <Empty />
        </Grid>
      ) : (
        <GroupMembersList groupMembers={groupMembers} />
      )}
    </>
  );
}
