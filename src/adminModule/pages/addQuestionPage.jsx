import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionForm from "../components/questionForm";
import { addData } from "../../modules/firestoreActions";

export default function AddQuestionPage(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;

  const onFormSubmit = (data) => {
    const questionId = uuid();
    //data.questionImage.name
    let questionData = {
      question: data.question,
      choice1: data.choice1,
      choice2: data.choice2,
      choice3: data.choice3,
      choice4: data.choice4,
      questionId,
    };
    let answer = {
      questionId: questionData.questionId,
      answer: data.answer,
    };

    const questionPath = `${collection}/${quizId}/questions`;
    const answerPath = `${collection}/${quizId}/answers`;

    dispatch(addData(answerPath, answer.questionId, answer));
    dispatch(addData(questionPath, questionData.questionId, questionData));
  };

  return <QuestionForm title="Add Question" onFormSubmit={onFormSubmit} />;
}
