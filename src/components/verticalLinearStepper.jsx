import React, { useState } from "react";
import { Stepper, Step, StepLabel, StepContent, Grid } from "@material-ui/core";
import { useStyles } from "../../utils/theme";

function VerticalLinearStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const { steps } = props;

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid className={classes.margin} container justify="center">
      <Grid item xs={11} sm={9} md={7}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {props.render(activeStep, handleNext, handlePrev)}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}

export default VerticalLinearStepper;
