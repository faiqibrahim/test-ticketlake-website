import React from "react";

const ListView = ({ eventsList }) => {
  return eventsList.map((event) => (
    <div className="listViewCard" key={event.id}>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-auto">
            <img src={event.imgSrc} className="listViewImage" alt="" />
          </div>
          <div className="col">
            <div className="card-block px-4">
              <h4 className="cardTitle">{event.title}</h4>
              <p className="cardSubheading">{event.type}</p>
              <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                {event.startTime}-{event.endTime}
              </p>
              <p className="cardSubheading">{event.shows} Shows</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  ));
};

export default ListView;
