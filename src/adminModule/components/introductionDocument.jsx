import React, { useState } from "react";
import { Grid, Button, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Empty } from "antd";

import UploadDocument from "./uploadDocument";
import { deleteFile, deleteData } from "../../modules/firestoreActions";
import ActionDelete from "../../components/actionDelete";
import ActionEdit from "../../components/actionEdit";
import ActionView from "../../components/actionView";
import CustomSkeleton from "../../components/customSkeleton";
import PdfViewer from "../../components/pdfViewer";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
    },
  };
});

export default function IntroductionDocument(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;
  const classes = useStyles();

  const [view, setView] = useState(true);

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "introduction",
          doc: "document",
        },
      ],
      storeAs: "introductionDocument",
    },
  ]);

  const introductionDocument = useSelector(
    (state) => state.firestore.data.introductionDocument
  );

  const handleViewStatus = () => {
    setView((prev) => !prev);
  };

  const handleDelete = () => {
    const cb = () => {
      dispatch(deleteData(`${collection}/${quizId}/introduction`, "document"));
    };
    dispatch(deleteFile(`quizIntroduction/document/${quizId}`, cb));
  };

  if (!isLoaded(introductionDocument)) return <CustomSkeleton />;

  return (
    <Grid container justify="center">
      <Grid item xs>
        <Card className={classes.root}>
          <CardHeader
            title="Introduction Document"
            subheader={
              <Grid container>
                {view ? (
                  <ActionEdit handleEditClick={handleViewStatus} />
                ) : (
                  <ActionView handleViewClick={handleViewStatus} />
                )}
                {isEmpty(introductionDocument) ? null : (
                  <ActionDelete handleDelete={handleDelete} />
                )}
              </Grid>
            }
          />
          <CardContent>
            {view ? (
              isEmpty(introductionDocument) ? (
                <Grid container justify="center">
                  <Empty description="No Document!" />
                </Grid>
              ) : (
                <PdfViewer documentURL={introductionDocument.documentURL} />
                // <Grid container>
                //   <Button
                //     component="a"
                //     href={introductionDocument.documentURL}
                //     download
                //   >
                //     review
                //   </Button>
                // </Grid>
              )
            ) : (
              <UploadDocument />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
