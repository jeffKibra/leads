import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Empty, Skeleton } from "antd";

import { setLoading } from "../modules/basicActions";

const useStyles = makeStyles((theme) => {
  return {
    empty: {
      margin: theme.spacing(2),
    },
  };
});

export default function IsLoadedIsEmptyHOC(WrappedComponent) {
  return function HOC(props) {
    const { loading } = useSelector((state) => state.custom);
    const classes = useStyles();

    //console.log(props);
    const [loadedData, setLoadedData] = useState("");
    const [empty, setEmpty] = useState(false);
    const dispatch = useDispatch();
    const { data } = props;

    useEffect(() => {
      if (isLoaded(data)) {
        dispatch(setLoading(false));
        setLoadedData(data);
        if (isEmpty(data)) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      } else {
        dispatch(setLoading(true));
        setLoadedData("");
      }
    }, [data, dispatch]);

    return (
      <>
        {loading ? (
          <Card>
            <CardContent>
              <Grid container justify="center">
                <Grid item xs={11} sm={9} md={7}>
                  <Skeleton active loading={loading} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : empty ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.empty}
          >
            <Grid
              item
              xs={11}
              sm={9}
              md={7}
              container
              justify="center"
              alignItems="center"
            >
              <Empty
              // description={
              //   <Typography variant="caption">
              //     You have zero (0) entries! If you had saved some entries,
              //     please ensure you are connected to the internet.{" "}
              //   </Typography>
              // }
              />
            </Grid>
          </Grid>
        ) : (
          loadedData && (
            <WrappedComponent
              {...props}
              empty={empty}
              loading={loading}
              loadedData={loadedData}
            />
          )
        )}
      </>
    );
  };
}
