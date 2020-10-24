import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import EditGroupQuiz from "../components/editGroupQuiz";

export default function EditGroupQuizPage(props) {
  const params = useParams();
  const { quizId } = params;

  const quiz = useSelector((state) => {
    return state.firestore.data[quizId];
  });

  useFirestoreConnect([
    {
      collection: "groupQuiz",
      doc: quizId,
      storeAs: quizId,
    },
  ]);

  return (
    <>
      <Grid container justify="center">
        <Button component={Link} to={`/questions/groupQuiz/${quizId}`}>
          Questions
        </Button>
      </Grid>
      <EditGroupQuiz data={quiz} />
    </>
  );
}
