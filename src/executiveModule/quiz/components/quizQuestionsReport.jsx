import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  return {
    answers: {
      paddingLeft: theme.spacing(3),
      color: theme.palette.text.secondary,
    },
  };
});

export default function QuizQuestionsReport(props) {
  const { quizReport, questions } = props;
  const classes = useStyles();

  console.log(props);
  const { report } = quizReport;
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} container spacing={3}>
        {questions.map((question, index) => {
          const rep = report.filter(
            (rep) => rep.questionId === question.questionId
          );
          return (
            <Grid item xs={12} key={index}>
              <Typography variant="body2">{`Question ${index + 1} of ${
                questions.length
              }`}</Typography>
              <Typography variant="h6">{question.question}</Typography>

              <div className={classes.answers}>
                <Typography>{`Choice 1: ${question.choice1}`}</Typography>
                <Typography>{`Choice 2: ${question.choice2}`}</Typography>
                <Typography>{`Choice 3: ${question.choice3}`}</Typography>
                <Typography>{`Choice 4: ${question.choice4}`}</Typography>
                <Typography>{`Given Answer: ${rep[0].givenAnswer}`}</Typography>
                <Typography>{`CorrectAnswer: ${rep[0].answer}`}</Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

QuizQuestionsReport.propTypes = {
  questions: PropTypes.array.isRequired,
  quizReport: PropTypes.object.isRequired,
};
