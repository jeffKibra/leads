import React from "react";
import CustomTabs from "../../components/customTabs";

import EditGroupPage from "./editGroupPage";
import GroupMembersListPage from "./groupMemebersListPage";
import AssignedGroupQuizPage from "./assignedGroupQuizPage";

export default function PreviewGroupPage(props) {
  const dataArray = [
    { label: "Edit", component: <EditGroupPage /> },
    { label: "Members", component: <GroupMembersListPage /> },
    { label: "Quiz", component: <AssignedGroupQuizPage /> },
  ];
  // { label: "Reports", component: <p>Reports</p> },

  return <CustomTabs dataArray={dataArray} />;
}
