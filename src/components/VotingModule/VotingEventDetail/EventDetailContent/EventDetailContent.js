import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../../../../commonComponents/loader";

import { getSingleVotingEvent } from "../../../../redux/voting-events/event/event-actions";
import { duration } from "../../VotingPage/Duration/duration";
import BannerContent from "../BannerConent/BannerImage/BannerImage";
import DetailDescription from "../DetailDescription/DetailDescription";
import VotingCategories from "../../VotingEventCategories/EventCategories/EventCategories";

import classes from "./styles.module.css";

class EventDetailContent extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventID: props.match.params.id,
      event: null,
      remainingTime: null,
    };
  }

  componentDidMount() {
    this.is_Mounted = true;

    if (this.is_Mounted) {
      this.fetchEvent();
    }
  }

  fetchEvent = () => {
    const { eventID } = this.state;
    const { getSingleVotingEvent } = this.props;

    getSingleVotingEvent(eventID, (error, data) => {
      if (!error && data) {
        const { event } = this.props;
        let durationCheck = duration(event);

        this.setState({
          loading: false,
          event,
          remainingTime: durationCheck.eventEnd
            ? durationCheck.durationString
            : durationCheck,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  shareEventHandler = () => {
    console.log("shareEventHandler");
  };

  wishlistEventHandler = () => {
    console.log("wishlistEventHandler");
  };

  render() {
    if (this.state.loading) return <Loader />;

    const { event, remainingTime } = this.state;
    const { numberOfNominees } = event;
    return (
      <Fragment>
        <div className={classes.detailPageContainer}>
          <BannerContent
            bannerContent={event}
            remainingTime={remainingTime}
            shareClick={this.shareEventHandler}
            wishClick={this.wishlistEventHandler}
          />
          <DetailDescription
            title="Description"
            description={event.description}
          />
          <VotingCategories numberOfNominees={numberOfNominees} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.voting.event.singleEvent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleVotingEvent: (eventID, cb) =>
      dispatch(getSingleVotingEvent(eventID, cb)),
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailContent);

export default withRouter(connectedComponent);
