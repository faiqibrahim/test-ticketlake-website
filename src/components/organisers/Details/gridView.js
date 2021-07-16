import React from "react";
import { Card } from "react-bootstrap";

const GridView = ({ eventsList }) => {
  return (
    <div className="mb-100 setWidth">
      <div className="row organiser-row">
        {eventsList.map((event) => {
          return (
            <div
              className="col-xl-3 col-lg-4 col-md-6 marginBottom"
              key={event.id}
            >
              <Card key={event.id} className="cardStyling">
                <Card.Img
                  className="eventCardImage"
                  variant="top"
                  src={event.imgSrc}
                />
                <div>
                  <p className="cardTitle">{event.title}</p>
                  <p className="cardSubheading">{event.type}</p>
                  <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                    {event.startTime}-{event.endTime}
                  </p>
                  <p className="cardSubheading">{event.shows} Shows</p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
