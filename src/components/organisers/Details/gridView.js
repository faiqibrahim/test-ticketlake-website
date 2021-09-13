import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import classes from "./style.module.css";
import ReactTooltip from "react-tooltip";

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
                className="col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3     marginBottom"
                key={event._id}
              >
                <Card key={event.id} className="cardStyling">
                  <Card.Img
                    className="eventCardImage"
                    variant="top"
                    src={event.bannerImageKey.imageUrl}
                  />
                  <div>
                    <p data-tip={event.title} className="organiserCardTitle">
                      {event.title}
                    </p>
                    <p className="cardSubheading">
                      {event.categories.map(({ title }) => title).join(" & ")}
                    </p>
                    <p className="cardSubheading" style={{ color: "#EC1B23" }}>
                      <Moment format="ddd, MMM DD">
                        {event.startDateTime}
                      </Moment>{" "}
                      -<Moment format="ddd, MMM DD">{event.endDateTime}</Moment>
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
        {loadMore && (
          <button
            onClick={() => {
              this.setState({ count: count + 8 });
            }}
            className={classes.loadMoreBtn}
          >
            Load More
          </button>
        )}
        <ReactTooltip />
      </div>
    );
  }
}

export default GridView;
