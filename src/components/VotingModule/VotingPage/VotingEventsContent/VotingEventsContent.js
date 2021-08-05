import React from "react";
import { withRouter } from "react-router-dom";

import { duration } from "../Duration/duration";
import CardItem from "../CardItem/CardItem";
import "./VotingEventsContent.css";

const eventSelectedHandler = (id, name, props, eventClosed) => {
  props.history.push({
    pathname: "/voting/" + id,
    search: `${
      eventClosed
        ? "eventId=" +
          id +
          "&eventName=" +
          name +
          "&event-closed=" +
          eventClosed
        : "eventId=" + id + "&eventName=" + name
    }`,
  });
};

const VotingEvents = (props) => {
  const { events } = props;

  return (
    <div className="cardItemRow votingEvents">
      {events.length === 0 ? (
        <h1>No Active Events Found</h1>
      ) : (
        events &&
        events.map((event) => {
          return event.active ? (
            <CardItem
              key={event.id}
              {...event}
              status={duration(event).eventEnd}
              clicked={() =>
                eventSelectedHandler(
                  event.id,
                  event.name,
                  props,
                  duration(event).eventEnd
                )
              }
            />
          ) : null;
        })
      )}
    </div>
  );
};

export default withRouter(VotingEvents);
