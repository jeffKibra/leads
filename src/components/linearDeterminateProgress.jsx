import React from "react";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function LinearDeterminateProgress(props) {
  const progress = useSelector((state) => state.custom.linearProgress);
  const showProgress = useSelector((state) => state.custom.showProgress);
  //console.log(progress);
  return (
    <>
      {showProgress && (
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography>
              {progress === 100 ? "uploaded" : "Uploading..."}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={progress}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">
              {progress === 100 ? "done" : Math.round(progress)}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
