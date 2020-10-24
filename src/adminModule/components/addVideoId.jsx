import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'

import { addData } from "../../modules/firestoreActions";
import AddVideoIdForm from "./addVideoIdForm";
import CustomSkeleton from '../../components/customSkeleton'

export default function UploadDocument(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection, quizId } = params;

  useFirestoreConnect([{
      collection:collection,
      doc:quizId,
      subcollections:[{
          collection:"introduction",
          doc:"video"
      }],
      storeAs:"introductionVideo"
  }])

  const introductionVideo=useSelector(state=>state.firestore.data.introductionVideo)

if(!isLoaded(introductionVideo)) return <CustomSkeleton />

  const onFormSubmit = (data) => {
    const dataObj = {
      ...data,
      quizId,
    };
    dispatch(addData(`${collection}/${quizId}/introduction`, "video", dataObj));
  };

  return <AddVideoIdForm onFormSubmit={onFormSubmit} defaultValues={isEmpty(introductionVideo ? {videoId:""} : {...introductionVideo} )} />;
}
