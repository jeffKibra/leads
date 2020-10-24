import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import QuizList from "../components/quizList";

export default function GroupQuizPage() {
  useFirestoreConnect([
    {
      collection: "groupQuiz",
    },
  ]);

  const groupQuiz = useSelector((state) => state.firestore.ordered.groupQuiz);
  console.log(groupQuiz);

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Button
          component={Link}
          to="/addGroupQuiz"
          endIcon={<FontAwesomeIcon icon="plus" />}
        >
          add
        </Button>
      </Grid>
      <QuizList data={groupQuiz} collection="groupQuiz" title="Quiz" />
    </>
  );
}
