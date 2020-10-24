import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import QuizList from "../components/quizList";

export default function SingleQuizPage() {
  useFirestoreConnect([
    {
      collection: "singleQuiz",
    },
  ]);

  const singleQuiz = useSelector((state) => state.firestore.ordered.singleQuiz);
  console.log(singleQuiz);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addSingleQuiz"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <QuizList data={singleQuiz} collection="singleQuiz" title="Quiz" />
    </>
  );
}
