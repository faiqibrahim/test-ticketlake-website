import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../../commonComponents/loader";

import VotingEventsContent from "./VotingPage/VotingEventsContent/VotingEventsContent";
import VotingHeader from "./Header/Layout/Layout";
import "./RouteWrapper/RouteWrapper.css";
import { Helmet } from "react-helmet";
import { getAllVotingEvents } from "../../redux/voting-events/event/event-actions";
import { Button } from "reactstrap";

class VotingEvents extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      eventsListing: [],
      eventsLimit: 2,
      defaultLimit: 2,
    };
  }

  componentDidMount() {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      this.fetchVotingEvents();
    }
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Voting</title>
      </Helmet>
    );
  };

  fetchVotingEvents = () => {
    const { eventsLimit } = this.state;

    this.setState(
      { loading: true },
      this.props.getAllVotingEvents(eventsLimit, (error, response) => {
        if (!error) {
          this.setState({
            eventsListing: this.props.eventsListing,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      })
    );
  };

  loadMoreEvents = () => {
    const { eventsLimit, defaultLimit } = this.state;

    this.setState(
      {
        loading: true,
        eventsLimit: eventsLimit + defaultLimit,
      },
      () => {
        this.fetchVotingEvents();
      }
    );
  };

  render() {
    const { eventsListing, loading, eventsLimit } = this.state;

    const renderButton =
      eventsLimit === eventsListing.length ? (
        <Button className="loadMore" onClick={this.loadMoreEvents}>
          Load More
        </Button>
      ) : null;

    return (
      <Fragment>
        <div className="container">
          <div className="votingContainer">
            {this.pageTitle()}
            <div className="headerContainer">
              <VotingHeader
                pageTitle="Votings"
                breadCrumbs={this.state.breadCrumbs}
              />
            </div>
          </div>
        </div>
        <hr style={{ margin: "5px 0" }} />
        <div className="container">
          <div className="votingContainer">
            <div className="contentBox">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <VotingEventsContent events={eventsListing} />
                  {renderButton}
                </>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsListing: state.voting.event.eventsListing,
  };
};

const mapDisptachToProps = (disptach) => {
  return {
    getAllVotingEvents: (eventsLimit, cb) =>
      disptach(getAllVotingEvents(eventsLimit, cb)),
  };
};

const eventsConnnected = connect(
  mapStateToProps,
  mapDisptachToProps
)(VotingEvents);

export default withRouter(eventsConnnected);
