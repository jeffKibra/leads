import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";

import QuizQuestionsReport from "./quizQuestionsReport";

export default function QuizReport(props) {
  const { quizReport, individual, questions } = props;
  const { report, percentage, totalCorrect, totalIncorrect } = quizReport;
  return (
    <Grid container justify="center">
      <Grid item xs={12} container direction="column" justify="center">
        <Card>
          <CardHeader title="Quiz Report" />
          <CardContent>
            <Typography variant="h5">{`Name: ${individual.firstName} ${individual.lastName}`}</Typography>
            <Typography>{`Email: ${individual.email}`}</Typography>
            <Typography>{`Total Questions: ${report.length}`}</Typography>
            <Typography variant="h6">{`Score: ${percentage}%`}</Typography>
            <Typography>{`Correct: ${totalCorrect}`}</Typography>
            <Typography>{`Incorrect: ${totalIncorrect}`}</Typography>
            <Divider />
            <QuizQuestionsReport
              questions={questions}
              quizReport={quizReport}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
