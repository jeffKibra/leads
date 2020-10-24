import React from "react";
import { Card, CardHeader, CardContent, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextInput from "../../components/textInput";
import EmailInput from "../../components/emailInput";
import DateInput from "../../components/dateInput";
import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(2, 0),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  };
});

function MemberForm(props) {
  const { register, errors, firstName, lastName, email, date, title } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} container justify="center">
        <Card className={classes.root}>
          <CardHeader title={title} />
          <CardContent>
            <Grid container justify="space-between" spacing={3}>
              <Grid
                item
                xs={12}
                sm={5}
                container
                direction="column"
                justify="center"
              >
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={firstName}
                  label="First Name"
                  name="firstName"
                  required={{ value: true, message: "Required!" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                container
                direction="column"
                justify="center"
              >
                <TextInput
                  register={register}
                  errors={errors}
                  defaultValue={lastName}
                  label="Last Name"
                  name="lastName"
                  required={{ value: true, message: "Required!" }}
                />
              </Grid>

              <Grid item xs={12} container direction="column" justify="center">
                <EmailInput
                  register={register}
                  errors={errors}
                  defaultValue={email}
                />
              </Grid>

              <Grid item xs={12} container direction="column" justify="center">
                <DateInput
                  register={register}
                  errors={errors}
                  defaultValue={date}
                />
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

MemberForm.propTypes = {
  defaultValues: PropTypes.object,
  title: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  date: PropTypes.string,
};

export default FormHOC(MemberForm);
