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
  const { doctorId } = params;

  useFirestoreConnect([
    {
      collection: "singleQuiz",
      where: ["status", "==", "done"],
    },
  ]);

  const singleQuiz = useSelector((state) => state.firestore.ordered.singleQuiz);
  const quizObject = useSelector((state) => state.firestore.data.singleQuiz);

  if (!isLoaded(singleQuiz)) return <CustomSkeleton />;
  if (isEmpty(singleQuiz))
    return (
      <Grid container justify="center">
        <Empty description="No quiz" />
      </Grid>
    );

  const onFormSubmit = (data) => {
    const quizData = quizObject[data.quiz];

    dispatch(
      addData(
        `executives/${auth.uid}/doctors/${doctorId}/quiz`,
        quizData.quizId,
        quizData
      )
    );
  };

  return <SelectQuizForm onFormSubmit={onFormSubmit} quizzes={singleQuiz} />;
}
