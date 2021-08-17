import React, { Component } from "react";
import classes from "./style.module.css";

class ListView extends Component {
  state = { count: 8 };

  render() {
    const { eventsList } = this.props;
    const { count } = this.state;

    let loadMore = false;
    let showEvents = eventsList.slice(0, count);
    if (eventsList.length > showEvents.length) {
      loadMore = true;
      showEvents = eventsList.slice(0, count);
    }

    return (
      <>
        {" "}
        {showEvents.map((event) => (
          <div className="listViewCard" key={event._id}>
            <div className="card">
              <div className="row no-gutters">
                <div className="col-auto">
                  <img
                    src={event.bannerImageKey.imageUrl}
                    className="listViewImage"
                    alt=""
                  />
                </div>
                <div className="col">
                  <div className="card-block px-4">
                    <h4 className="cardTitle">{event.eventTitle}</h4>
                    <p className="cardSubheading">{event.type}</p>
                    <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                      {event.startTime}-{event.endTime}
                    </p>
                    <p className="cardSubheading">
                      {event.slotsData.length} Shows
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}{" "}
        {loadMore ? (
          <button
            onClick={() => {
              this.setState({ count: count + 8 });
            }}
            className={classes.loadMoreBtn}
          >
            Load More
          </button>
        ) : null}
      </>
    );
  }
}

export default ListView;
