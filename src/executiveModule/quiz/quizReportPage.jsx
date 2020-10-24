import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import QuizReport from "../components/quizReport";

export default function QuizReportsPage(props) {
  const params = useParams();
  const { executiveId, groupId, memberId, quizId } = params;

  useFirestoreConnect([
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
        },
      ],
      storeAs: "group",
    },
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
          subcollections: [
            {
              collection: "members",
              doc: memberId,
            },
          ],
        },
      ],
      storeAs: "member",
    },
    {
      collection: "executives",
      doc: executiveId,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
          subcollections: [
            {
              collection: "members",
              doc: memberId,
              subcollections: [
                {
                  collection: "reports",
                  doc: quizId,
                },
              ],
            },
          ],
        },
      ],
      storeAs: "quizReport",
    },
    {
      collection: "groupQuiz",
      doc: quizId,
      subcollections: [
        {
          collection: "questions",
        },
      ],
      storeAs: "questions",
    },
  ]);

  const { quizReport, group, member } = useSelector(
    (state) => state.firestore.data
  );
  const questions = useSelector((state) => state.firestore.ordered.questions);

  if (
    !isLoaded(quizReport) ||
    !isLoaded(group) ||
    !isLoaded(member) ||
    !isLoaded(questions)
  )
    return <CustomSkeleton />;
  if (
    isEmpty(quizReport) ||
    isEmpty(group) ||
    isEmpty(group) ||
    isEmpty(questions)
  )
    return (
      <Grid container justify="center">
        <Empty description="No Report Available! " />
      </Grid>
    );

  return (
    <QuizReport
      questions={questions}
      quizReport={quizReport}
      group={group}
      member={member}
    />
  );
}
