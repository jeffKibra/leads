import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

import AssignedQuizList from "../components/assignedQuizList";
import CustomSkeleton from "../../components/customSkeleton";
import SelectQuiz from "../components/selectSingleQuiz";

export default function AssignedSingleQuizListPage(props) {
  const params = useParams();
  const { doctorId } = params;

  const auth = useSelector((state) => state.firebase.auth);
  //console.log(assignedSingleQuiz);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "doctors",
          doc: doctorId,
          subcollections: [
            {
              collection: "quiz",
            },
          ],
        },
      ],
      storeAs: "assignedSingleQuiz",
    },
  ]);

  const assignedSingleQuiz = useSelector(
    (state) => state.firestore.ordered.assignedSingleQuiz
  );

  if (!isLoaded(assignedSingleQuiz)) return <CustomSkeleton />;

  return (
    <>
      <SelectQuiz group="doctors" groupId={doctorId} />

      {isEmpty(assignedSingleQuiz) ? (
        <Grid container justify="center">
          <Empty description="No quiz assigned!" />
        </Grid>
      ) : (
        <AssignedQuizList
          group="doctors"
          groupId={doctorId}
          quizList={assignedSingleQuiz}
        />
      )}
    </>
  );
}
