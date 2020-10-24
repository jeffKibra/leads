import React from "react";
import { useDispatch } from "react-redux";

import GroupQuizForm from "./groupQuizForm";
import { updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditGroupQuiz(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  console.log(loadedData);
  //   const quiz = loadedData[quizId];
  const {
    quizTitle,
    quizDescription,
    institution,
    date,
    status,
    quizId,
  } = loadedData;

  const onFormSubmit = (data) => {
    let quizData = {
      ...loadedData,
      quizTitle: data.quizTitle,
      quizDescription: data.quizDescription,
      institution: data.institution,
      date: data.date,
      status: data.status,
    };

    //const path = `quizImages/${quizData.quizId}`;
    const collection = "groupQuiz";

    dispatch(updateData(collection, quizData.quizId, quizData));
  };

  return (
    <>
      {quizId && (
        <GroupQuizForm
          title="Edit Quiz"
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
