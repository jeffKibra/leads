import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";

import GroupQuizForm from "../components/groupQuizForm";
import { addData } from "../../modules/firestoreActions";

export default function AddSingleQuizPage(props) {
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const quizId = uuid();
    //data.quizImage.name
    let quizData = {
      quizTitle: data.quizTitle,
      quizDescription: data.quizDescription,
      date: data.date,
      quizId,
      status: data.status,
      institution: data.institution,
    };

    // const path = `quizImages/${quizData.quizId}`;
    const collection = "groupQuiz";

    dispatch(addData(collection, quizData.quizId, quizData));
  };

  return <GroupQuizForm onFormSubmit={onFormSubmit} title="Add Quiz" />;
}
