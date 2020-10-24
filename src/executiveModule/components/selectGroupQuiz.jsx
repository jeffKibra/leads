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
  const { groupId } = params;
  console.log(params);

  useFirestoreConnect([
    {
      collection: "groupQuiz",
      where: ["status", "==", "done"],
    },
  ]);

  const groupQuiz = useSelector((state) => state.firestore.ordered.groupQuiz);
  const groupQuizObject = useSelector(
    (state) => state.firestore.data.groupQuiz
  );

  if (!isLoaded(groupQuiz)) return <CustomSkeleton />;
  if (isEmpty(groupQuiz))
    return (
      <Grid container justify="center">
        <Empty description="No quiz" />
      </Grid>
    );

  const onFormSubmit = (data) => {
    const quizData = groupQuizObject[data.quiz];
    console.log({ data, quizData });

    dispatch(
      addData(
        `executives/${auth.uid}/groups/${groupId}/quiz`,
        quizData.quizId,
        quizData
      )
    );
  };

  return <SelectQuizForm onFormSubmit={onFormSubmit} quizzes={groupQuiz} />;
}
