import React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  ButtonGroup,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../utils/theme";

function JournalDisplay(props) {
  const classes = useStyles();
  const journal = props.journal;
  const { journalName, journalDescription, createdAt, journalId } = journal;

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <>
      <Card
        className={`${classes.card} ${classes.cardWidth} ${classes.cardFlex} `}
      >
        <CardHeader title={journalName} subheader={journalDescription} />
        <CardContent>
          <Typography variant="body1">{date || ""}</Typography>
          <Typography variant="body2">{time || ""}</Typography>
        </CardContent>
        <Box className={classes.cardActionsContainer}>
          <CardActions className={classes.cardActions}>
            <ButtonGroup aria-label="card action buttons">
              <Button
                endIcon={<FontAwesomeIcon icon="folder-open" />}
                component={Link}
                to={"/entriesList/" + journalId}
              >
                {" "}
                Open {"  "}
              </Button>
              <Button
                onClick={props.onEditClick}
                className="btn btn-outline-warning"
              >
                <FontAwesomeIcon icon="edit" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}

export default JournalDisplay;
