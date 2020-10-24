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
    console.log(data);

    const cb = (documentURL) => {
      const dataObj = {
        quizId,
        documentURL,
      };

      dispatch(
        addData(`${collection}/${quizId}/introduction`, "document", dataObj)
      );
    };

    const path = `quizIntroduction/document/${quizId}`;
    dispatch(uploadFile(path, data.document, cb));
  };

  return (
    <FileUploadForm
      accept=".pdf"
      fileName="document"
      onFormSubmit={onFormSubmit}
    />
  );
}
