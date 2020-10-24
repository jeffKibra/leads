import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextInput from "../../components/textInput";
import DateInput from "../../components/dateInput";
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
  };
});

function SingleQuizForm(props) {
  const {
    register,
    errors,
    setValue,
    quizTitle,
    quizDescription,
    status,
    date,
    title,
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
                  register={register}
                  errors={errors}
                  defaultValue={quizTitle}
                  label="Quiz Title"
                  name="quizTitle"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={quizDescription}
                  label="Quiz Description"
                  name="quizDescription"
                  required={{ value: true, message: "field cannot be empty" }}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <DateInput
                  register={register}
                  errors={errors}
                  defaultValue={date}
                />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center">
                <SimpleSelect
                  register={register}
                  errors={errors}
                  defaultValue={status || ""}
                  name="status"
                  setValue={setValue}
                >
                  <MenuItem value="">
                    <em>Select Status</em>
                  </MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                  <MenuItem value="done">done</MenuItem>
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

SingleQuizForm.propTypes = {
  title: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  quizTitle: PropTypes.string,
  quizDescription: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
};

export default FormHOC(SingleQuizForm);
