import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import IntroductionForm from "./introductionForm";
import { addData } from "../../modules/firestoreActions";

export default function AddIntroductionText(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;
  const { introduction } = props;

  const onFormSubmit = (data) => {
    console.log(data);
    const introduction = {
      introduction: data.introduction,
      quizId: quizId,
    };
    dispatch(
      addData(`${collection}/${quizId}/introduction`, "text", introduction)
    );
  };

  return (
    <IntroductionForm
      defaultValues={
        introduction ? { introduction: introduction } : { introduction: "" }
      }
      introduction={introduction}
      onFormSubmit={onFormSubmit}
    />
  );
}
