import React from "react";
import { Route } from "react-router-dom";

import ExecutivesDashboard from "../executiveModule/pages/executivesDashboard";
import DoctorsListPage from "../executiveModule/pages/doctorsListPage";
import AddDoctorPage from "../executiveModule/pages/addDoctorPage";
import PreviewDoctorPage from "../executiveModule/pages/previewDoctorPage";
import LeadsListPage from "../executiveModule/pages/leadsListPage";
import AddLeadPage from "../executiveModule/pages/addLeadPage";
import EditLeadPage from "../executiveModule/pages/editLeadPage";
import SingleQuizPage from "../executiveModule/pages/singleQuizPage";
import GroupQuizPage from "../executiveModule/pages/groupQuizPage";
import AddGroupPage from "../executiveModule/pages/addGroupPage";
import GroupsListPage from "../executiveModule/pages/groupsListPage";
import PreviewGroupPage from "../executiveModule/pages/previewGroupPage";
import AddGroupMemberPage from "../executiveModule/pages/addGroupMemberPage";
import GroupMembersListPage from "../executiveModule/pages/groupMemebersListPage";
import ProductsListPage from "../executiveModule/pages/productsListPage";
import GroupMemberPreviewPage from "../executiveModule/pages/groupMemberPreviewPage";

export default function ExecutiveRoutes() {
  return [
    <Route exact path="/" key="/">
      <ExecutivesDashboard />
    </Route>,
    <Route path="/doctors" key="/doctors">
      <DoctorsListPage />
    </Route>,
    <Route path="/addDoctor" key="/addDoctor">
      <AddDoctorPage />
    </Route>,
    <Route path="/editDoctor/:doctorId" key="/editDoctor">
      <PreviewDoctorPage />
    </Route>,
    <Route path="/leadsList" key="/leadsList">
      <LeadsListPage />
    </Route>,
    <Route path="/addLead" key="/addLead">
      <AddLeadPage />
    </Route>,
    <Route path="/editLead/:leadId" key="/editLead">
      <EditLeadPage />
    </Route>,
    <Route path="/singleQuiz" key="/single">
      <SingleQuizPage />
    </Route>,
    <Route path="/groupQuiz" key="/groupQuiz">
      <GroupQuizPage />
    </Route>,
    <Route path="/productsList" key="/productsList">
      <ProductsListPage />
    </Route>,
    <Route path="/groupsList" key="/groupsList">
      <GroupsListPage />
    </Route>,
    <Route path="/addGroup" key="/addGroup">
      <AddGroupPage />
    </Route>,
    <Route path="/preview/group/:groupId" key="/preview/group/:groupId">
      <PreviewGroupPage />
    </Route>,
    <Route path="/addGroupMember/:groupId" key="/addGroupMember/:groupId">
      <AddGroupMemberPage />
    </Route>,
    <Route
      path="/editGroupMember/:groupId/:memberId"
      key="/editGroupMember/:groupId/:memberId"
    >
      <GroupMemberPreviewPage />
    </Route>,
    <Route path="/groupMembers/:groupId" key="/groupMembers/:groupId">
      <GroupMembersListPage />
    </Route>,
    <Route key="fallback">
      <ExecutivesDashboard />
    </Route>,
  ];
}
