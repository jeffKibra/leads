import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import EditQuestion from "../components/editQuestion";
import CustomSkeleton from "../../components/customSkeleton";

export default function EditQuestionPage(props) {
  const params = useParams();
  const { collection, quizId, questionId } = params;

  const question = useSelector((state) => {
    return state.firestore.data.question;
  });

  const answer = useSelector((state) => {
    return state.firestore.data.answer;
  });

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "questions",
          doc: questionId,
        },
      ],
      storeAs: "question",
    },
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "answers",
          doc: questionId,
        },
      ],
      storeAs: "answer",
    },
  ]);

  if (!isLoaded(question) || !isLoaded(answer)) return <CustomSkeleton />;
  if (isEmpty(question) || isEmpty(answer))
    return (
      <Grid container justify="center" spacing={3}>
        <Empty />
      </Grid>
    );

  return (
    <EditQuestion title="Edit Question" answer={answer} question={question} />
  );
}
