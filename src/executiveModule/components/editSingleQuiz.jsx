import React from "react";
import { useDispatch } from "react-redux";

import SingleQuizForm from "./singleQuizForm";
import { updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditSingleQuiz(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  console.log(loadedData);
  //   const quiz = loadedData[quizId];
  const { quizTitle, quizDescription, date, status, quizId } = loadedData;

  const onFormSubmit = (data) => {
    let quizData = {
      ...loadedData,
      quizTitle: data.quizTitle,
      quizDescription: data.quizDescription,
      date: data.date,
      status: data.status,
    };

    //const path = `quizImages/${quizData.quizId}`;
    const collection = "singleQuiz";

    dispatch(updateData(collection, quizData.quizId, quizData));
  };

  return (
    <>
      {quizId && (
        <SingleQuizForm
          title="Edit Quiz"
          quizTitle={quizTitle}
          quizDescription={quizDescription}
          date={date}
          status={status}
          onFormSubmit={onFormSubmit}
          imageRequired={false}
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditSingleQuiz);
