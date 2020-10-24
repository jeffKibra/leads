import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
  Grid,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FormHOC from "../../HOCs/formHOC";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: 2,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(2),
    },
  };
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "name1",
  "name2",
  "name3",
  "name4",
  "name5",
  "name6",
  "name7",
  "name8",
  "name9",
  "name10",
];

function MultiSelect(props) {
  const [values, setValues] = useState([]);
  const classes = useStyles();
  const { register } = props;

  const handleChange = (event) => {
    setValues(event.target.value);
    console.log(event.target.value, event.target.options);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={10}>
          <Card>
            <CardContent>
              <Grid container justify="center">
                <Grid item xs container direction="column" justify="center">
                  <FormControl>
                    <InputLabel id="miltiple-select-with-checkbox-label">
                      Select Values
                    </InputLabel>
                    <Select
                      labelId="multiple-select-with-checkbox-label"
                      id="multipl-select-with-checkbox"
                      multiple
                      value={values}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value, index) => (
                            <Chip
                              key={index}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name, index) => {
                        return (
                          <MenuItem key={index} value={name}>
                            <Checkbox checked={values.indexOf(name) > -1} />
                            <ListItemText primary="names" />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

MultiSelect.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormHOC(MultiSelect);
