import React, { useEffect, useState } from "react";
import { RadioGroup, FormControl, FormLabel } from "@material-ui/core";
import PropTypes from "prop-types";

export default function CustomRadioGroup(props) {
  const {
    register,
    setValue,
    watch,
    children,
    question,
    questionId,
    defaultValue,
  } = props;
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    register(questionId);
    setRegistered(true);
  }, [register, questionId]);

  useEffect(() => {
    setValue(questionId, defaultValue);
  }, [registered, defaultValue, setValue, questionId]);

  const handleRadioChange = (e) => {
    setValue(questionId, e.target.value);
  };

  const value = watch(questionId);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>
      <RadioGroup value={value} onChange={handleRadioChange}>
        {children}
        {/* <FormControlLabel  value="choice1" control={<Radio />} label="Choice 1" />
    <FormControlLabel value="choice2" control={<Radio />} label="Choice 2" />
    <FormControlLabel value="choice3" control={<Radio />} label="Choice 3" />
    <FormControlLabel value="choice4" control={<Radio />} label="Choice 4" /> */}
      </RadioGroup>
    </FormControl>
  );
}

CustomRadioGroup.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
};
