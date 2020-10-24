import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

import Dashboard from "../components/dashboard";
import CustomSkeleton from "../../components/customSkeleton";

export default function AdminDashboard(props) {
  useFirestoreConnect([
    {
      collection: "adminDashboard",
    },
  ]);

  const adminDashboard = useSelector((state) => {
    return state.firestore.data.adminDashboard;
  });

  if (!isLoaded(adminDashboard)) return <CustomSkeleton />;

  return (
    <>
      <Dashboard
        executives={adminDashboard?.executives?.executives || 0}
        products={adminDashboard?.products?.products || 0}
        singleQuiz={adminDashboard?.singleQuiz?.singleQuiz || 0}
        groupQuiz={adminDashboard?.groupQuiz?.groupQuiz || 0}
      />
    </>
  );
}
