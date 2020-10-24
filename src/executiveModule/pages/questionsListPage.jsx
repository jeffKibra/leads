import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link, useParams } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

import QuestionsList from "../components/questionsList";

export default function QuestionsListPage() {
  const params = useParams();
  console.log(params);
  const { collection, quizId } = params;

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "questions",
        },
      ],
      storeAs: "questions",
    },
  ]);

  const singleQuiz = useSelector((state) => state.firestore.ordered.questions);
  console.log(singleQuiz);

  return (
    <>
      <Grid container justify="center">
        <Button component={Link} to={`/addQuestion/${collection}/${quizId}`}>
          add
        </Button>
      </Grid>
      <QuestionsList quizId={quizId} data={singleQuiz} title="Quiz" />
    </>
  );
}
