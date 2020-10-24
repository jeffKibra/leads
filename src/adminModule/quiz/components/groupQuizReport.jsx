import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

export default function QuizReport(props) {
  const { quizReport, group, member, questions } = props;
  const { report, percentage, totalCorrect, totalIncorrect } = quizReport;
  return (
    <Grid container justify="center">
      <Grid item xs={12} container direction="column" justify="center">
        <Card>
          <CardHeader title="Quiz Report" />
          <CardContent>
            <Typography variant="h5">{`Name: ${member.firstName} ${member.lastName}`}</Typography>
            <Typography>{`Email: ${member.email}`}</Typography>
            <Typography>{`Group: ${group.groupName}`}</Typography>
            <Typography>{`Total Questions: ${report.length}`}</Typography>
            <Typography variant="h6">{`Score: ${percentage}%`}</Typography>
            <Typography>{`Correct: ${totalCorrect}`}</Typography>
            <Typography>{`Incorrect: ${totalIncorrect}`}</Typography>
            <Divider />
            <Grid container justify="center">
              <Grid item xs={12} sm={8} md={6}>
                <List>
                  {questions.map((question, index) => {
                    const rep = report.filter(
                      (rep) => rep.questionId === question.questionId
                    );
                    return (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`Question ${index + 1} of ${
                            questions.length
                          }`}
                          secondary={
                            <>
                              <Typography variant="subtitle1">
                                {question.question}
                              </Typography>
                              <Typography>{`Choice 1: ${question.choice1}`}</Typography>
                              <Typography>{`Choice 2: ${question.choice2}`}</Typography>
                              <Typography>{`Choice 3: ${question.choice3}`}</Typography>
                              <Typography>{`Choice 4: ${question.choice4}`}</Typography>
                              <Typography>{`Given Answer: ${rep[0].givenAnswer}`}</Typography>
                              <Typography>{`CorrectAnswer: ${rep[0].answer}`}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
