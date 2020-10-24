import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import SingleQuizReport from "../components/singleQuizReport";

export default function QuizReportsPage(props) {
  const params = useParams();
  const { executiveId, individualId, quizId } = params;

  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "individuals",
          doc: individualId,
        },
      ],
      storeAs: "individual",
    },
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "individuals",
          doc: individualId,
          subcollections: [
            {
              collection: "reports",
              doc: quizId,
            },
          ],
        },
      ],
      storeAs: "quizReport",
    },
    {
      collection: "singleQuiz",
      doc: quizId,
      subcollections: [
        {
          collection: "questions",
        },
      ],
      storeAs: "questions",
    },
  ]);

  const { quizReport, individual } = useSelector(
    (state) => state.firestore.data
  );
  const questions = useSelector((state) => state.firestore.ordered.questions);

  if (!isLoaded(quizReport) || !isLoaded(individual) || !isLoaded(questions))
    return <CustomSkeleton />;
  if (isEmpty(quizReport) || isEmpty(individual) || isEmpty(questions))
    return (
      <Grid container justify="center">
        <Empty description="No Report Available! " />
      </Grid>
    );

  return (
    <SingleQuizReport
      questions={questions}
      quizReport={quizReport}
      individual={individual}
    />
  );
}
