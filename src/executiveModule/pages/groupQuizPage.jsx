import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import GroupQuizList from "../components/groupQuizList";

export default function GroupQuizPage() {
  useFirestoreConnect([
    {
      collection: "groupQuiz",
    },
  ]);

  const groupQuiz = useSelector((state) => state.firestore.ordered.groupQuiz);

  return (
    <>
      <GroupQuizList data={groupQuiz} title="Quiz" />
    </>
  );
}
