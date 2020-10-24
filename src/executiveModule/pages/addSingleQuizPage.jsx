import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";

import SingleQuizForm from "../components/singleQuizForm";
import { addData } from "../../modules/firestoreActions";

export default function AddSingleQuizPage(props) {
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const quizId = uuid();

    let quizData = {
      quizTitle: data.quizTitle,
      quizDescription: data.quizDescription,
      date: data.date,
      quizId,
      status: data.status,
    };

    // const path = `quizImages/${quizData.quizId}`;
    const collection = "singleQuiz";

    dispatch(addData(collection, quizData.quizId, quizData));
  };

  return <SingleQuizForm onFormSubmit={onFormSubmit} title="Add Quiz" />;
}
