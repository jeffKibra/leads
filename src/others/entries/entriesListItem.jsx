import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import * as moment from "moment";
import {
  Divider,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { useStyles } from "../../utils/theme";
import PropTypes from "prop-types";

function EntriesListItem(props) {
  const { entry } = props;
  const classes = useStyles();
  const { subject, createdAt, entryId } = entry;
  const location = useLocation();
  const params = useParams();
  const { journalId } = params;

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");
  return (
    <Link
      to={{
        pathname: "/read/" + entryId,
        state: { from: location, journalId },
      }}
      className={classes.link}
    >
      <ListItem button className={classes.listItem} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>{subject.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={subject}
          secondary={
            <>
              <Typography
                component="span"
                variant="caption"
                className={classes.listInline}
                //color="textPrimary"
              >
                {`${date} - ${time}`}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Link>
  );
}

EntriesListItem.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EntriesListItem;
