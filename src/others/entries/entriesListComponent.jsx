import React from "react";
import {
  Badge,
  Divider,
  Typography,
  List,
  ListSubheader,
  Grid,
} from "@material-ui/core";
import { Empty, Skeleton } from "antd";
import { useStyles } from "../../utils/theme";
import PropTypes from "prop-types";
import EntriesListItem from "./entriesListItem";

function EntriesListComponent(props) {
  const classes = useStyles();
  //console.log(props);
  const { loadedData, journal, empty, loading } = props;

  return (
    <div className="container">
      <List className={classes.listRoot}>
        <ListSubheader>
          <Badge badgeContent={loadedData.length || 0} color="primary">
            <Typography variant="subtitle1">
              {journal.journalName ? journal.journalName : "My Notes"}
            </Typography>
          </Badge>
        </ListSubheader>
        <Divider component="li" />

        {loading ? (
          <Grid container justify="center">
            <Grid item xs={11} sm={9} md={7}>
              <Skeleton active loading={loading} />
            </Grid>
          </Grid>
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
                description={
                  <Typography variant="caption">
                    You have zero (0) entries! If you had saved some entries,
                    please ensure you are connected to the internet.{" "}
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        ) : (
          loadedData.map((entry, index) => {
            return <EntriesListItem key={index} entry={entry} />;
          })
        )}
      </List>
    </div>
  );
}

EntriesListComponent.propTypes = {
  journal: PropTypes.object.isRequired,
  loadedData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  empty: PropTypes.bool.isRequired,
};

export default EntriesListComponent;
