import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import classes from "./style.module.css";

class GridView extends Component {
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
      <div className="mb-100 setWidth">
        <div className="row organiser-row">
          {showEvents.map((event) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-6 marginBottom"
                key={event._id}
              >
                <Card key={event.id} className="cardStyling">
                  <Card.Img
                    className="eventCardImage"
                    variant="top"
                    src={event.bannerImageKey.imageUrl}
                  />
                  <div>
                    <p className="cardTitle">{event.title}</p>
                    <p className="cardSubheading">
                      {event.categories.map((category, index) => {
                        return (
                          category.title +
                          (index < event.categories.length - 1 ? " & " : "")
                        );
                      })}
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
                </Card>
              </div>
            );
          })}
        </div>
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
      </div>
    );
  }
}

export default GridView;
