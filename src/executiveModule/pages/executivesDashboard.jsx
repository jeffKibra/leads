import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

import Dashboard from "../components/dashboard";
import CustomSkeleton from "../../components/customSkeleton";

export default function AdminDashboard(props) {
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "adminDashboard",
    },
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "dashboard",
          storeAs: "executiveDashboard",
        },
      ],
      storeAs: "executiveDashboard",
    },
  ]);
  const data = useSelector((state) => {
    return state.firestore.data;
  });

  const { adminDashboard, executiveDashboard } = data;

  if (!isLoaded(adminDashboard) || !isLoaded(executiveDashboard))
    return <CustomSkeleton loading={true} />;

  return (
    <>
      <Dashboard
        products={adminDashboard?.products?.products || 0}
        groupQuiz={adminDashboard?.groupQuiz?.groupQuiz || 0}
        singleQuiz={adminDashboard?.singleQuiz?.singleQuiz || 0}
        doctors={executiveDashboard?.doctors?.doctors || 0}
      />
    </>
  );
}
