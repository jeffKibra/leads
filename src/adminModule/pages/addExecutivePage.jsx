import React from "react";
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";

import ExecutivesForm from "../components/executivesForm";
import { addData, uploadFile } from "../../modules/firestoreActions";

export default function AddExecutivePage(props) {
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {
    const executiveId = uuid();
    //data.executiveImage.name
    let executiveData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      executiveId,
      contact: data.contact,
      isBlock: data.isBlock,
      password: data.password,
      date: new Date().toISOString().substr(0, 10),
    };

    const path = `executiveImages/${executiveData.executiveId}`;
    const collection = "executives";

    //dispatch(addData(collection, executiveData.executiveId, executiveData));

    const cb = (imageURL) => {
      const dataObj = {
        ...executiveData,
        imageURL,
      };
      dispatch(addData(collection, executiveData.executiveId, dataObj));
    };

    if (data.executiveImage) {
      dispatch(uploadFile(path, data.executiveImage, cb));
    } else {
      dispatch(addData(collection, executiveData.executiveId, executiveData));
    }

    // console.log(data);
    // console.log(data.executiveImage[0]);
  };
  return <ExecutivesForm onFormSubmit={onFormSubmit} />;
}
