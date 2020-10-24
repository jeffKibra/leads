import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionForm from "./questionForm";
import { updateData } from "../../modules/firestoreActions";

export default function EditQuestion(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;
  const { question, answer } = props;

  const { choice1, choice2, choice3, choice4, questionId } = question;

  const onFormSubmit = (data) => {
    //data.questionImage.name
    let questionData = {
      ...question,
      ...data,
    };

    const updatedAnswer = {
      ...answer,
      answer: data.answer,
    };

    dispatch(
      updateData(
        `${collection}/${quizId}/answers`,
        questionData.questionId,
        updatedAnswer
      )
    );
    dispatch(
      updateData(
        `${collection}/${quizId}/questions`,
        questionData.questionId,
        questionData
      )
    );
  };

  return (
    <>
      {questionId && (
        <QuestionForm
          defaultValues={{
            question: question.question,
            answer: answer.answer,
            choice1,
            choice2,
            choice3,
            choice4,
          }}
          question={question.question}
          answer={answer.answer}
          choice1={choice1}
          choice2={choice2}
          choice3={choice3}
          choice4={choice4}
          onFormSubmit={onFormSubmit}
          title="Edit Question"
        />
      )}
    </>
  );
}
