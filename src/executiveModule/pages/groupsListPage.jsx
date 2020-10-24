import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import GroupsList from "../components/groupsList";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

export default function GroupsListPage(props) {
  const auth = useSelector((state) => state.firebase.auth);
  const classes = useStyles();

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "groups",
        },
      ],
      storeAs: "groups",
    },
  ]);

  const { groups } = useSelector((state) => state.firestore.ordered);

  if (!isLoaded(groups)) return <CustomSkeleton />;

  return (
    <>
      <Grid container justify="center">
        <Button className={classes.button} component={Link} to="/addGroup">
          add
        </Button>
      </Grid>
      {isEmpty(groups) ? (
        <Grid container justify="center">
          <Empty />
        </Grid>
      ) : (
        <GroupsList groups={groups} />
      )}
    </>
  );
}
