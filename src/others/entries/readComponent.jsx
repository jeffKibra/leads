import React from "react";
import { Paper, Box, Typography, Divider, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { Skeleton } from "antd";

function ReadFinal(props) {
  const { date, time, myComponent, loading } = props;

  return (
    <div className="container">
      {loading ? (
        <Grid container justify="center">
          <Grid item xs={11} sm={9} md={7}>
            <Skeleton active loading={loading} />
          </Grid>
        </Grid>
      ) : (
        <Paper style={{ minHeight: "80vh" }}>
          <Box display="flex" flexDirection="column" m={1}>
            <Box display="flex" padding={2} alignItems="center">
              <Box display="flex" flexGrow={1} flexDirection="column">
                <Typography variant="caption">{`${date} ${time}`}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box padding={2}>{myComponent()}</Box>
          </Box>
        </Paper>
      )}
    </div>
  );
}

ReadFinal.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ReadFinal;
