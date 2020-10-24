import React from "react";
import { useHistory } from "react-router-dom";
import ActionView from "./actionView";

export default function ActionsSee(props) {
  const history = useHistory();
  const { route } = props;

  const handleSee = () => {
    history.push(route);
  };

  return <ActionView handleViewClick={handleSee} />;
}
