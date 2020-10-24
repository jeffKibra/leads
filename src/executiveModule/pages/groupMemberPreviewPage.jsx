import React from "react";
import CustomTabs from "../../components/customTabs";

import EditGroupMemberPage from "./editGroupMemberPage";
import GroupMemberReportsListPage from "./groupMemberReportsListPage";

export default function PreviewGroupPage(props) {
  const dataArray = [
    { label: "Edit", component: <EditGroupMemberPage /> },
    { label: "Reports", component: <GroupMemberReportsListPage /> },
  ];
  // { label: "Reports", component: <p>Reports</p> },

  return <CustomTabs dataArray={dataArray} />;
}
