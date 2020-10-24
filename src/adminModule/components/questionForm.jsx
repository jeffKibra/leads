import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextInput from "../../components/textInput";
import SimpleSelect from "../../components/simpleSelect";
import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    Card: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    Typography: {
      padding: theme.spacing(0, 2),
    },
  };
});

function QuestionForm(props) {
  const {
    register,
    errors,
    setValue,
    title,
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    answer,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} container justify="center">
        <Card>
          <CardHeader title={title} />
          <CardContent>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  multiline
                  rows={4}
                  register={register}
                  errors={errors}
                  defaultValue={question}
                  label="Question"
                  name="question"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>

              <Divider />
              <Typography className={classes.Typography} variant="h6">
                Choices
              </Typography>
              <Divider />

              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={choice1}
                  label="Choice 1"
                  name="choice1"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={choice2}
                  label="Choice 2"
                  name="choice2"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={choice3}
                  label="Choice 3"
                  name="choice3"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={choice4}
                  label="Choice 4"
                  name="choice4"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>

              <Divider />
              <Typography className={classes.Typography} variant="h6">
                answer
              </Typography>
              <Divider />

              <Grid item xs={12} container direction="column" justify="center">
                <SimpleSelect
                  register={register}
                  errors={errors}
                  defaultValue={answer || ""}
                  name="answer"
                  setValue={setValue}
                >
                  <MenuItem value="">
                    <em>Select Answer</em>
                  </MenuItem>
                  <MenuItem value="choice1">choice 1</MenuItem>
                  <MenuItem value="choice2">choice 2</MenuItem>
                  <MenuItem value="choice3">choice 3</MenuItem>
                  <MenuItem value="choice4">choice 4</MenuItem>
                </SimpleSelect>
              </Grid>
            </Grid>
            <Button type="submit" className={classes.button}>
              save
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

QuestionForm.propTypes = {
  title: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  quizTitle: PropTypes.string,
  quizDescription: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
};

export default FormHOC(QuestionForm);
