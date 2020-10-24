import React from "react";
import { useDispatch } from "react-redux";

import ExecutivesForm from "./executivesForm";
import { uploadFile, updateData } from "../../modules/firestoreActions";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

function EditExecutive(props) {
  const dispatch = useDispatch();
  const { loadedData } = props;
  //console.log(loadedData);
  //   const Executive = loadedData[ExecutiveId];
  const {
    firstName,
    lastName,
    email,
    contact,
    isBlock,
    password,
    executiveId,
  } = loadedData;

  const onFormSubmit = (data) => {
    //data.ExecutiveImage.name
    let executiveData = {
      ...loadedData,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      isBlock: data.isBlock,
      password: data.password,
    };

    const path = `executiveImages/${executiveData.executiveId}`;
    const collection = "executives";

    const cb = (imageURL) => {
      const dataObj = {
        ...executiveData,
        imageURL,
      };

      dispatch(updateData(collection, executiveData.executiveId, dataObj));
    };

    if (data.executiveImage) {
      dispatch(uploadFile(path, data.executiveImage, cb));
    } else {
      dispatch(
        updateData(collection, executiveData.executiveId, executiveData)
      );
    }
  };

  return (
    <>
      {executiveId && (
        <ExecutivesForm
          defaultValues={{
            firstName,
            lastName,
            email,
            contact,
            isBlock,
            password,
          }}
          firstName={firstName}
          lastName={lastName}
          email={email}
          contact={contact}
          isBlock={isBlock}
          password={password}
          onFormSubmit={onFormSubmit}
          imageRequired={false}
        />
      )}
    </>
  );
}

export default IsLoadedIsEmptyHOC(EditExecutive);
