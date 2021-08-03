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
  const { events } = props;

  return (
    <div className="cardItemRow votingEvents">
      {events.length === 0 ? (
        <h1>No Event Exists</h1>
      ) : (
        events &&
        events.map((event) => {
          return event.active ? (
            <CardItem
              key={event.id}
              {...event}
              clicked={() =>
                event.active === true
                  ? eventSelectedHandler(event.id, event.name, props)
                  : eventClosedVotingHandler(event.id, props)
              }
            />
          ) : (
            <h1 key={event.id}>No Event Exists</h1>
          );
        })
      )}
    </div>
  );
};

export default withRouter(VotingEvents);
