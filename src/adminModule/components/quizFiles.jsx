import React from "react";

import FileUploadForm from "../../components/fileUploadForm";

function QuizFiles(props) {
  const uploadPdf = (data) => {
    console.log(data);
  };

  return (
    <>
      <FileUploadForm fileName="pdf" onFormSubmit={uploadPdf} />
    </>
  );
}

export default QuizFiles;
