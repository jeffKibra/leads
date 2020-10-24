import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import FileUploadForm from "../../components/fileUploadForm";
import { uploadFile, addData } from "../../modules/firestoreActions";

export default function UploadDocument(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;

  const onFormSubmit = (data) => {
    const path = `quizIntroduction/video/${quizId}`;

    const cb = (videoURL) => {
      const dataObj = {
        quizId,
        videoURL,
      };
      dispatch(
        addData(`${collection}/${quizId}/introduction`, "video", dataObj)
      );
    };

    dispatch(uploadFile(path, data.introductionVideo, cb));
  };

  return (
    <FileUploadForm
      accept="video/*"
      fileName="introductionVideo"
      onFormSubmit={onFormSubmit}
    />
  );
}
