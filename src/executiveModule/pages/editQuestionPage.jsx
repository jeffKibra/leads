import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import EditQuestion from "../components/editQuestion";

export default function EditQuestionPage(props) {
  const params = useParams();
  console.log(params);
  const { collection, quizId, questionId } = params;

  const question = useSelector((state) => {
    return state.firestore.data[questionId];
  });

  useFirestoreConnect([
    {
      collection: collection,
      doc: quizId,
      subcollections: [
        {
          collection: "questions",
          doc: questionId,
        },
      ],
      storeAs: questionId,
    },
  ]);

  return <EditQuestion title="Edit Question" data={question} />;
}
