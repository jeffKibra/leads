import React from "react";
import { useDispatch } from "react-redux";

import QuizForm from "./quizForm";
import { updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditGroupQuiz(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  //console.log(loadedData);
  //   const quiz = loadedData[quizId];
  const {
    quizTitle,
    quizDescription,
    institution,
    date,
    status,
    quizId,
    product, category
  } = loadedData;

  const onFormSubmit = (data) => {
    let quizData = {
      ...loadedData,
      ...data
    };
    //const path = `quizImages/${quizData.quizId}`;
    const collection = quizData.category;

    dispatch(updateData(collection, quizData.quizId, quizData));
//history.go(0)
  };

  return (
    <>
      {quizId && (
        <QuizForm
          title="Edit Quiz"
          product={product}
          category={category}
          quizTitle={quizTitle}
          quizDescription={quizDescription}
          institution={institution}
          date={date}
          status={status}
          onFormSubmit={onFormSubmit}
          imageRequired={false}
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditGroupQuiz);
