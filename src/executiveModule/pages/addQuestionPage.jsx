import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionForm from "../components/questionForm";
import { addData } from "../../modules/firestoreActions";

export default function AddQuestionPage(props) {
  const params = useParams();
  console.log(params);
  const { collection, quizId } = params;
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const questionId = uuid();
    //data.questionImage.name
    let questionData = {
      question: data.question,
      solution: data.solution,
      choice1: data.choice1,
      questionId,
      choice2: data.choice2,
      choice3: data.choice3,
      choice4: data.choice4,
    };

    const collectionPath = `${collection}/${quizId}/questions`;

    dispatch(addData(collectionPath, questionData.questionId, questionData));
  };

  return <QuestionForm title="Add Question" onFormSubmit={onFormSubmit} />;
}
