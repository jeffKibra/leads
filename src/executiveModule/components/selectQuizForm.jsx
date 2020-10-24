import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import SimpleSelect from "../../components/simpleSelect";
import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(2, 0),
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(2, 0),
    },
  };
});

function SelectQuizForm(props) {
  const { register, errors, setValue, title, quizzes } = props;

  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} container justify="center">
        <Card className={classes.root}>
          <CardHeader title={title} />
          <CardContent>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} container direction="column" justify="center">
                <SimpleSelect
                  name="quiz"
                  label="Select Quiz"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                >
                  <MenuItem value="">
                    <Typography variant="subtitle1">Select Quiz</Typography>
                  </MenuItem>
                  {quizzes.length === 0 ? (
                    <MenuItem value="">No quizzes</MenuItem>
                  ) : (
                    quizzes.map((quiz, index) => {
                      const { quizId, quizTitle } = quiz;
                      return (
                        <MenuItem key={index} value={quizId}>
                          {quizTitle}
                        </MenuItem>
                      );
                    })
                  )}
                </SimpleSelect>
              </Grid>
              <Grid item xs>
                <Button type="submit">save</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

SelectQuizForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  quizzes: PropTypes.array.isRequired,
};

export default FormHOC(SelectQuizForm);
