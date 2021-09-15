import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../../../../commonComponents/loader";
import { scroller } from "react-scroll";

import { getSingleVotingEvent } from "../../../../redux/voting-events/event/event-actions";
import BannerContent from "../BannerConent/BannerImage/BannerImage";
import DetailDescription from "../DetailDescription/DetailDescription";
import VotingCategories from "../../VotingEventCategories/EventCategories/EventCategories";

import classes from "./styles.module.css";

class EventDetailContent extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.categoryRef = createRef();
    this.state = {
      loading: true,
      eventID: props.match.params.id,
      event: null,
      bannerImage: null,
      bannerContent: null,
      remainingTime: null,
      votingImage: null,
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
    const { getSingleVotingEvent, history } = this.props;

    getSingleVotingEvent(eventID, (error, data) => {
      if (!error && data) {
        const { event } = this.props;

        this.setState({
          loading: false,
          event,
          bannerContentData: event[1],
          bannerInfoData: event[0],
        });
      } else {
        history.push("/voting");
        this.setState({ loading: false });
      }
    });
  };

  scrollToSection = () => {
    scroller.scrollTo("scrollToVoteCategory", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  shareEventHandler = () => {
    console.log("shareEventHandler");
  };

  wishlistEventHandler = () => {
    console.log("wishlistEventHandler");
  };

  castVoteHandler = (target) => this.scrollToSection(target);

  render() {
    if (this.state.loading) return <Loader />;

    const { bannerContentData, bannerInfoData } = this.state;

    const { votingImage, votePrice, description } = bannerInfoData;
    return (
      <Fragment>
        <div className={classes.detailPageContainer}>
          <BannerContent
            bannerCardContent={bannerContentData}
            bannerImage={votingImage}
            bannerButtons={{
              onShareButton: this.shareEventHandler,
              onWishButton: this.wishlistEventHandler,
              onAddButton: {
                text: votePrice,
                funcClick: () => this.castVoteHandler(this.categoryRef),
              },
            }}
          />
          <DetailDescription title="Description" description={description} />
          <div ref={this.categoryRef} className="scrollToVoteCategory">
            <VotingCategories />
          </div>
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
