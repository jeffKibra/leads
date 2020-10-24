import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";

import QuizForm from "../components/quizForm";
import { addData } from "../../modules/firestoreActions";

export default function AddSingleQuizPage(props) {
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const quizId = uuid();
    //data.quizImage.name
    let quizData = {
      ...data,
      quizId,
    };

    console.log(quizData)
    // const path = `quizImages/${quizData.quizId}`;
    const collection = quizData.category;

    dispatch(addData(collection, quizData.quizId, quizData));
  };

  return <QuizForm onFormSubmit={onFormSubmit} title="Add Quiz" />;
}
