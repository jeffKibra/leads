import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

import CustomSkeleton from "../../components/customSkeleton";
import SelectQuizForm from "./selectQuizForm";
import { addData } from "../../modules/firestoreActions";

export default function SelectQuiz(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const params = useParams();
  const { individualId } = params;

  useFirestoreConnect([
    {
      collection: "singleQuiz",
      where: ["status", "==", "done"],
    },
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "individuals",
          doc: individualId,
          subcollections: [
            {
              collection: "quiz",
            },
          ],
        },
      ],
      storeAs: "assignedQuiz",
    },
  ]);

  const singleQuiz = useSelector((state) => state.firestore.ordered.singleQuiz);
  const singleQuizObject = useSelector(
    (state) => state.firestore.data.singleQuiz
  );
  const assignedQuiz = useSelector(
    (state) => state.firestore.data.assignedQuiz
  );

  if (!isLoaded(singleQuiz) || !isLoaded(assignedQuiz))
    return <CustomSkeleton />;
  if (isEmpty(singleQuiz))
    return (
      <Grid container justify="center">
        <Empty description="No quiz" />
      </Grid>
    );

  const quizzes = singleQuiz.filter((quiz) => !assignedQuiz[quiz.quizId]);

  const onFormSubmit = (data) => {
    const quizData = singleQuizObject[data.quizId];
    console.log({ data, quizData });

    dispatch(
      addData(
        `executives/${auth.uid}/groups/${individualId}/quiz`,
        data.quizId,
        quizData
      )
    );
  };

  return <SelectQuizForm onFormSubmit={onFormSubmit} quizzes={quizzes} />;
}
