import React from "react";
import {
  Card,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Grid,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    card: (props) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      //padding: theme.spacing(1, 0),
      borderLeft: `.25rem solid ${props.borderColor}`,
    }),
    cardContent: {
      padding: 20,
    },
    listItem: {
      flex: 1,
      padding: 0,
    },
    list: {
      padding: 12,
    },
    icon: {
      fontSize: 32,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

export default function DashboardCard(props) {
  const { number, name, icon, borderColor, to } = props;
  const classes = useStyles({ borderColor });
  return (
    <Grid item xs={12} md={6}>
      <List className={classes.list}>
        <ListItem component={Link} to={to} button className={classes.listItem}>
          <Card className={classes.card}>
            <div className={classes.cardContent}>
              <ListItemText
                primary={name}
                secondary={<Typography variant="h5">{number}</Typography>}
              />
              <ListItemSecondaryAction className={classes.icon}>
                <FontAwesomeIcon icon={icon} />
              </ListItemSecondaryAction>
            </div>
          </Card>
        </ListItem>
      </List>
    </Grid>
  );
}
