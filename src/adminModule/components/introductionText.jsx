import React, { useState } from "react";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";

import ReadHTML from "../../components/readHTML";
import CustomSkeleton from "../../components/customSkeleton";
import ActionEdit from "../../components/actionEdit";
import ActionDelete from "../../components/actionDelete";
import ActionView from "../../components/actionView";
import { deleteData } from "../../modules/firestoreActions";
import AddIntroductionText from "./addIntroductionText";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
    },
    read: {
      maxHeight: 400,
      overflowY: "auto",
    },
  };
});

export default function IntroductionText(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;
  const classes = useStyles();

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "introduction",
          doc: "text",
        },
      ],
      storeAs: "introductionText",
    },
  ]);

  const [write, setWrite] = useState(false);

  const handleWriteStatus = () => {
    setWrite((prev) => !prev);
  };

  const handleDelete = () => {
    dispatch(deleteData(`${collection}/${quizId}/introduction`, "text"));
  };

  const introductionText = useSelector(
    (state) => state.firestore.data.introductionText
  );

  if (!isLoaded(introductionText)) return <CustomSkeleton />;

  return (
    <Grid container justify="center">
      <Grid item xs>
        <Card className={classes.root}>
          <CardHeader
            title="Introduction Text"
            subheader={
              <Grid container>
                {write ? (
                  <ActionView handleViewClick={handleWriteStatus} />
                ) : (
                  <ActionEdit handleEditClick={handleWriteStatus} />
                )}
                {isEmpty(introductionText) ? null : (
                  <ActionDelete handleDelete={handleDelete} />
                )}
              </Grid>
            }
          />
          <CardContent>
            {write ? (
              <AddIntroductionText
                introduction={introductionText?.introduction}
              />
            ) : isEmpty(introductionText) ? (
              <Grid container justify="center">
                <Empty />
              </Grid>
            ) : (
              <div className={classes.read}>
                <ReadHTML html={introductionText.introduction} />
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
