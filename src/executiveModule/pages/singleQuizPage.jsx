import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import SingleQuizList from "../components/singleQuizList";

export default function SingleQuizListPage() {
  useFirestoreConnect([
    {
      collection: "singleQuiz",
    },
  ]);

  const singleQuiz = useSelector((state) => state.firestore.ordered.singleQuiz);

  return (
    <>
      <SingleQuizList data={singleQuiz} title="Quiz" />
    </>
  );
}
