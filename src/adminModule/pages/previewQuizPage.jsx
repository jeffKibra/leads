import React from "react";
import CustomTabs from "../../components/customTabs";

import EditQuizPage from "./editQuizPage";
import QuestionsListPage from "./questionsListPage";
import ManageIntroductionsPage from "./manageIntroductionsPage";

export default function PreviewQuizPage(props) {
  const dataArray = [
    { label: "Edit", component: <EditQuizPage /> },
    { label: "questions", component: <QuestionsListPage /> },
    { label: "Introduction", component: <ManageIntroductionsPage /> },
  ];

  return <CustomTabs dataArray={dataArray} />;
}
