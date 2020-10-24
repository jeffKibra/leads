import React from "react";
import PropTypes from "prop-types";
import FormHOC from "../HOCs/formHOC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../utils/theme";

function JournalForm(props) {
  //console.log(props);
  const {
    register,
    errors,
    onFormClose,
    btnText,
    journalName,
    journalDescription,
  } = props;
  const classes = useStyles();

  return (
    <Card className={`${classes.card} mx-auto`}>
      <CardHeader title={btnText} />
      <CardContent>
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginBottom={2}
            p={1}
          >
            <TextField
              label="journalName"
              placeholder="journalName"
              name="journalName"
              type="text"
              inputRef={register({
                required: {
                  value: true,
                  message: "please provide a journal name",
                },
                pattern: {
                  value: /^[a-z0-9_., ]+$/i,
                  message: "only numbers and characters allowed",
                },
                maxLength: { value: 20, message: "limited to 20 characters" },
              })}
              error={!!errors.journalName?.message}
              helperText={errors.journalName?.message}
              defaultValue={journalName}
              variant="outlined"
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={1}
            marginBottom={2}
          >
            <TextField
              label="journalDescription"
              placeholder="journalDescription"
              name="journalDescription"
              type="text"
              inputRef={register({
                required: {
                  value: true,
                  message: "please provide a journal description",
                },
                pattern: {
                  value: /^[a-z0-9_., ]+$/i,
                  message: "only numbers and characters allowed",
                },
                maxLength: { value: 50, message: "limited to 50 characters" },
              })}
              error={!!errors.journalDescription?.message}
              defaultValue={journalDescription}
              helperText={errors.journalDescription?.message}
              variant="outlined"
            />
          </Box>
        </>
        <CardActions>
          <ButtonGroup aria-label="journalform action buttons">
            <Button
              component="button"
              type="submit"
              endIcon={<FontAwesomeIcon icon="save" />}
            >
              {btnText}
            </Button>
            <Button
              endIcon={<FontAwesomeIcon icon="times" />}
              onClick={onFormClose}
            >
              cancel
            </Button>
          </ButtonGroup>
        </CardActions>
      </CardContent>
    </Card>
  );
}

JournalForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
  journalName: PropTypes.string.isRequired,
  journalDescription: PropTypes.string.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

export default FormHOC(JournalForm);
