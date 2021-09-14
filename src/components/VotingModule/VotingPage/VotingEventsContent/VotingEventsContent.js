import React from "react";
import { withRouter } from "react-router-dom";

import { duration } from "../../../../commonComponents/Duration/duration";
import CardItem from "../CardItem/CardItem";
import "./VotingEventsContent.css";

const eventSelectedHandler = (id, props) => {
  props.history.push({
    pathname: "/voting/" + id,
  });
};

const VotingEvents = (props) => {
  const { events } = props;

  return (
    <div className="cardItemRow votingEvents">
      {events.length === 0 ? (
        <h1>No Active Event Found</h1>
      ) : (
        events &&
        events.map((event) => {
          return (
            <CardItem
              key={event.id}
              {...event}
              status={duration(event).eventEnd}
              clicked={() => eventSelectedHandler(event.id, props)}
            />
          );
        })
      )}
    </div>
  );
};

export default withRouter(VotingEvents);
