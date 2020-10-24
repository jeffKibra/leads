import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { Skeleton } from "antd";

export default function CustomSkeleton(props) {
  return (
    <Grid container direction="column" justify="center">
      <Grid item xs={12} container direction="column" justify="center">
        <Card>
          <CardContent>
            <Grid container justify="center">
              <Grid item xs={11} sm={9} md={7}>
                <Skeleton active loading={true} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
