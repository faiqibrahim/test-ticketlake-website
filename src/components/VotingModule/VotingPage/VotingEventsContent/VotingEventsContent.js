import React from "react";
import { withRouter } from "react-router-dom";

import CardItem from "../CardItem/CardItem";
import "./VotingEventsContent.css";

const eventSelectedHandler = (id, name, props) => {
  props.history.push({
    pathname: "/voting/" + id,
    search: `eventId=${id}&eventName=${name}`,
  });
};

const eventClosedVotingHandler = (id, props) => {
  props.history.push({
    pathname: "/voting/event-results/" + id,
    search: `eventId=${id}`,
  });
};

const VotingEvents = (props) => {
  return (
    <div className="cardItemRow votingEvents">
      {props.events.map((event) => {
        return (
          <CardItem
            key={event.id}
            {...event}
            clicked={() =>
              event.active === true
                ? eventSelectedHandler(event.id, event.name, props)
                : eventClosedVotingHandler(event.id, props)
            }
          />
        );
      })}
    </div>
  );
};

export default withRouter(VotingEvents);
