import React, { useState } from "react";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";

import ActionDelete from "../../components/actionDelete";
import { deleteFile, deleteData } from "../../modules/firestoreActions";
import CustomSkeleton from "../../components/customSkeleton";
import ActionView from "../../components/actionView";
import ActionEdit from "../../components/actionEdit";
import AddVideoId from "./addVideoId";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
    },
    iframe: {
      width: 320,
      height: 240,
      maxWidth: "90%",
    },
  };
});

export default function IntroductionVideo(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;

  const [view, setView] = useState(true);

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "introduction",
          doc: "video",
        },
      ],
      storeAs: "introductionVideo",
    },
  ]);

  const introductionVideo = useSelector(
    (state) => state.firestore.data.introductionVideo
  );

  const handleDelete = () => {
    const cb = () => {
      dispatch(deleteData(`${collection}/${quizId}/introduction`, "video"));
    };
    dispatch(deleteFile(`quizIntroduction/video/${quizId}`, cb));
  };

  const handleViewStatus = () => {
    setView((prev) => !prev);
  };

  if (!isLoaded(introductionVideo)) return <CustomSkeleton />;

  return (
    <Grid container justify="center">
      <Grid item xs>
        <Card className={classes.root}>
          <CardHeader
            title="Introduction Video"
            subheader={
              <Grid container>
                {view ? (
                  <ActionEdit handleEditClick={handleViewStatus} />
                ) : (
                  <ActionView handleViewClick={handleViewStatus} />
                )}
                {isEmpty(introductionVideo) ? null : (
                  <ActionDelete handleDelete={handleDelete} />
                )}
              </Grid>
            }
          />
          <CardContent>
            {view ? (
              isEmpty(introductionVideo) ? (
                <Grid container justify="center">
                  <Empty description="No Video!" />
                </Grid>
              ) : (
                <Grid container justify="center">
                  <iframe
                    className={classes.iframe}
                    title="youtube video"
                    src={`https:www.youtube.com/embed/${introductionVideo.videoId}`}
                  ></iframe>
                  {/* <video width={320} height={240} controls>
                    <source src={introductionVideo.videoURL} />
                    Your browser does not support videos
                  </video> */}
                </Grid>
              )
            ) : (
              <AddVideoId />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
