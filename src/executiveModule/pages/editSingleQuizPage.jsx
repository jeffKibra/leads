import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import EditSingleQuiz from "../components/editSingleQuiz";

export default function EditSingleQuizPage(props) {
  const params = useParams();
  const { quizId } = params;

  const quiz = useSelector((state) => {
    return state.firestore.data[quizId];
  });

  useFirestoreConnect([
    {
      collection: "singleQuiz",
      doc: quizId,
      storeAs: quizId,
    },
  ]);

  return (
    <>
      <Grid container justify="center">
        <Button component={Link} to={`/questions/singleQuiz/${quizId}`}>
          Questions
        </Button>
      </Grid>
      <EditSingleQuiz data={quiz} />
    </>
  );
}
