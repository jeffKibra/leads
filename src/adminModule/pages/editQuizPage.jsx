import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import EditQuiz from "../components/editQuiz";

export default function EditQuizPage(props) {
  const params = useParams();
  const { collection, quizId } = params;

  const quiz = useSelector((state) => {
    return state.firestore.data[quizId];
  });

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      storeAs: quizId,
    },
  ]);

  return (
    <>
      
      <EditQuiz data={quiz} />
    </>
  );
}
