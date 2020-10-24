import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

import AssignedQuizList from "../components/assignedQuizList";
import CustomSkeleton from "../../components/customSkeleton";
import SelectQuiz from "../components/selectGroupQuiz";

export default function AssignedSingleQuizListPage(props) {
  const params = useParams();
  const { groupId } = params;

  const auth = useSelector((state) => state.firebase.auth);
  //console.log(assignedQuiz);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "groups",
          doc: groupId,
          subcollections: [
            {
              collection: "quiz",
            },
          ],
        },
      ],
      storeAs: "assignedGroupQuiz",
    },
  ]);

  const assignedGroupQuiz = useSelector(
    (state) => state.firestore.ordered.assignedGroupQuiz
  );

  if (!isLoaded(assignedGroupQuiz)) return <CustomSkeleton />;

  return (
    <>
      <SelectQuiz group="groups" groupId={groupId} />

      {isEmpty(assignedGroupQuiz) ? (
        <Grid container justify="center">
          <Empty description="No quiz assigned!" />
        </Grid>
      ) : (
        <AssignedQuizList
          group="groups"
          groupId={groupId}
          quizList={assignedGroupQuiz}
        />
      )}
    </>
  );
}
