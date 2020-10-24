import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@material-ui/core";

export default function CustomCircularProgress(props) {
  return (
    <>
      <Box position="relative" display="inline-flex">
        <CircularProgress color="secondary" variant="static" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div">
            {`${Math.floor(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

CustomCircularProgress.propTypes = {
  value: PropTypes.number.isRequired,
};
