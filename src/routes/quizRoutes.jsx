import React from "react";
import { Route } from "react-router-dom";

//quiz components
import GroupQuizPlayPage from "../playQuiz/pages/groupQuizPlayPage";
import GroupQuizListPage from "../playQuiz/pages/groupQuizListPage";
import SingleQuizPlayPage from "../playQuiz/pages/singleQuizPlayPage";
import SingleQuizListPage from "../playQuiz/pages/singleQuizListPage";
import CheckMember from "../playQuiz/components/checkMember";
import QuizReportPage from "../playQuiz/pages/quizReportPage";

export default function AuthRoutes(props) {
  return [
    <Route
      exact
      path="/playQuiz/groupQuiz/:executiveId/:groupId"
      key="/playQuiz/groupQuiz/:executiveId/:groupId"
    >
      <CheckMember />
    </Route>,
    <Route
      exact
      path="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId"
      key="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId"
    >
      <GroupQuizListPage />
    </Route>,
    <Route
      exact
      path="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId/:quizId"
      key="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId/:quizId"
    >
      <GroupQuizPlayPage />
    </Route>,
    <Route
      exact
      path="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId/:quizId/report"
      key="/playQuiz/groupQuiz/:executiveId/:groupId/:memberId/:quizId/report"
    >
      <QuizReportPage />
    </Route>,
    <Route
      exact
      path="/playQuiz/singleQuiz/:executiveId"
      key="/playQuiz/singleQuiz/:executiveId"
    >
      <SingleQuizPlayPage />
    </Route>,
    <Route
      exact
      path="/playQuiz/singleQuiz/:executiveId/:individualId"
      key="/playQuiz/singleQuiz/:executiveId/:individualId"
    >
      <SingleQuizListPage />
    </Route>,
  ];
}
