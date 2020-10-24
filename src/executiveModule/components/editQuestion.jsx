import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionForm from "./questionForm";
import { updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditQuestion(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;
  const { loadedData } = props;
  console.log(loadedData);
  //   const question = loadedData[questionId];
  const {
    question,
    solution,
    choice1,
    choice2,
    choice3,
    choice4,
    questionId,
  } = loadedData;

  const onFormSubmit = (data) => {
    //data.questionImage.name
    let questionData = {
      ...loadedData,
      ...data,
    };

    const collectionPath = `${collection}/${quizId}/questions`;

    dispatch(updateData(collectionPath, questionData.questionId, questionData));
  };

  return (
    <>
      {questionId && (
        <QuestionForm
          question={question}
          solution={solution}
          choice1={choice1}
          choice2={choice2}
          choice3={choice3}
          choice4={choice4}
          onFormSubmit={onFormSubmit}
          imageRequired={false}
          title="Edit Question"
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditQuestion);
