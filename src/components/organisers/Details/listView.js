import React, { Component } from "react";
import Moment from "react-moment";
import classes from "./style.module.css";

class ListView extends Component {
  state = { count: 4 };

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
                    alt="img"
                  />
                </div>
                <div className="col">
                  <div className="card-block px-4">
                    <h4 className="cardTitle">{event.title}</h4>
                    <p className="cardSubheading">
                      {event.categories.map(({ title }) => title).join(" & ")}
                    </p>
                    <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                      <Moment format="ddd, MMMM DD">
                        {event.startDateTime}
                      </Moment>{" "}
                      -
                      <Moment format="ddd, MMMM DD">{event.endDateTime}</Moment>
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
            className={`${classes.loadMoreBtn} mb-2`}
          >
            Load More
          </button>
        ) : null}
      </>
    );
  }
}

export default ListView;
