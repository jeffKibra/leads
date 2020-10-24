import React from "react";
import CustomTabs from "../../components/customTabs";

import EditDoctorPage from "./editDoctorPage";
import AssignedSingleQuizPage from "./assignedSingleQuizPage";
import DoctorsQuizListPage from "./doctorsQuizListPage";

export default function PreviewGroupPage(props) {
  const dataArray = [
    { label: "Edit", component: <EditDoctorPage /> },
    { label: "Quiz", component: <AssignedSingleQuizPage /> },
    { label: "Reports", component: <DoctorsQuizListPage /> },
  ];
  // { label: "Reports", component: <p>Reports</p> },

  return <CustomTabs dataArray={dataArray} />;
}
