import React from "react";
import { Route } from "react-router-dom";

import AdminDashboard from "../adminModule/pages/adminDashboard";
// executives
import ExecutivesListPage from "../adminModule/pages/executivesListPage";
import AddExecutivePage from "../adminModule/pages/addExecutivePage";
import EditExecutivePage from "../adminModule/pages/editExecutivePage";
//products
import ProductsListPage from "../adminModule/pages/productsListPage";
import AddProductPage from "../adminModule/pages/addProductPage";
import EditProductPage from "../adminModule/pages/editProductPage";
//quizzes
import SingleQuizPage from "../adminModule/pages/singleQuizPage";
import GroupQuizPage from "../adminModule/pages/groupQuizPage";
import AddQuizPage from "../adminModule/pages/addQuizPage";
import EditQuizPage from "../adminModule/pages/editQuizPage";
import QuestionsListPage from "../adminModule/pages/questionsListPage";
import AddQuestionPage from "../adminModule/pages/addQuestionPage";
import EditQuestionPage from "../adminModule/pages/editQuestionPage";

//reports
import ExecutiveLeadReportsPage from "../adminModule/pages/executiveLeadsReportPage";
//group reports
import GroupMemberReportsListPage from "../adminModule/pages/groupMemberReportsListpage";
import GroupMembersListPage from "../adminModule/pages/groupMembersListPage";
import GroupMemberQuizReportPage from "../adminModule/pages/groupMemberQuizReportPage";

import GroupsQuizReportPage from "../adminModule/pages/groupsQuizReportPage";

//doctors reports
import DoctorsListPage from "../adminModule/pages/doctorsListPage";
import DoctorQuizListPage from "../adminModule/pages/doctorQuizListPage";
import DoctorQuizReportPage from "../adminModule/pages/doctorQuizReportPage";
//lead reports
import SingleExecutiveLeadsReportPage from "../adminModule/pages/singleExecutiveLeadsReportPage";
//import DoctorsLeadReportsPage from "../adminModule/pages/doctorsLeadReportsPage";
import PreviewQuizPage from "../adminModule/pages/previewQuizPage";

//this is a function not a component
export default function AdminRoutes() {
  return [
    <Route exact path="/" key="/dashboard" component={AdminDashboard} />,
    <Route
      path="/executives"
      key="/executives"
      component={ExecutivesListPage}
    />,
    <Route
      path="/addExecutive"
      key="/addExecutive"
      component={AddExecutivePage}
    />,
    <Route
      path="/editExecutive/:executiveId"
      key="/editExecutive/:executiveId"
      component={EditExecutivePage}
    />,
    <Route
      path="/doctorsList"
      key="/doctorsList"
      component={DoctorsListPage}
    />,
    <Route
      path="/editProduct/:productId"
      key="/editProduct/:productId"
      component={EditProductPage}
    />,
    <Route path="/addProduct" key="/addProduct" component={AddProductPage} />,
    <Route
      path="/productsList"
      key="/productsList"
      component={ProductsListPage}
    />,
    <Route path="/singleQuiz" key="/singleQuiz" component={SingleQuizPage} />,
    <Route path="/groupQuiz" key="/groupQuiz" component={GroupQuizPage} />,
    <Route path="/addQuiz" key="/addQuiz" component={AddQuizPage} />,
    <Route
      path="/editQuiz/:quizId"
      key="/editQuiz/:quizId"
      component={EditQuizPage}
    />,
    <Route
      path="/previewQuiz/:collection/:quizId"
      key="/previewQuiz/:collection/:quizId"
      component={PreviewQuizPage}
    />,
    <Route
      path="/questions/:collection/:quizId"
      key="/questions/:collection/:quizId"
      component={QuestionsListPage}
    />,
    <Route
      path="/addQuestion/:collection/:quizId"
      key="/addQuestion/:collection/:quizId"
      component={AddQuestionPage}
    />,
    <Route
      path="/editQuestion/:collection/:quizId/:questionId"
      key="/editQuestion/:collection/:quizId/:questionId"
      component={EditQuestionPage}
    />,
    <Route
      path="/executiveLeadReports"
      key="/executiveLeadReports"
      component={ExecutiveLeadReportsPage}
    />,
    <Route
      path="/executiveLeads/:executiveId/:date"
      key="/executiveLeads/:executiveId/:date"
      component={SingleExecutiveLeadsReportPage}
    />,

    <Route exact path="/groupQuizReports" key="/groupQuizReports">
      <GroupsQuizReportPage />
    </Route>,
    <Route
      exact
      path="/groupQuizReports/:executiveId/:groupId"
      key="/groupQuizReports/:executiveId/:groupId"
    >
      <GroupMembersListPage />
    </Route>,

    <Route
      exact
      path="/groupQuizReports/:executiveId/:groupId/:memberId"
      key="/groupQuizReports/:executiveId/:groupId/:memberId"
    >
      <GroupMemberReportsListPage />
    </Route>,
    <Route
      exact
      path="/groupQuizReports/:executiveId/:groupId/:memberId/quizId"
      key="/groupQuizReports/:executiveId/:groupId/:memberId/quizId"
    >
      <GroupMemberQuizReportPage />
    </Route>,

    <Route exact path="/doctorsQuizReports" key="/doctorsQuizReports">
      <DoctorsListPage />
    </Route>,
    <Route
      exact
      path="/doctorsQuizReports/:executiveId/:doctorId"
      key="/doctorsQuizReports/:executiveId/:doctorId"
    >
      <DoctorQuizListPage />
    </Route>,

    <Route
      exact
      path="/doctorsQuizReports/:executiveId/:doctorId/quizId"
      key="/doctorsQuizReports/:executiveId/:doctorId/quizId"
    >
      <DoctorQuizReportPage />
    </Route>,

    <Route key="fallback">
      <AdminDashboard />
    </Route>,
  ];
}
