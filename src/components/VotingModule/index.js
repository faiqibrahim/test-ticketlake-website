import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "../../commonComponents/loader";

import VotingEventsContent from "./VotingPage/VotingEventsContent/VotingEventsContent";
import VotingHeader from "./Header/Layout/Layout";
import "./RouteWrapper/RouteWrapper.css";
import { Helmet } from "react-helmet";
import { getAllVotingEvents } from "../../redux/voting-events/event/event-actions";

class VotingEvents extends Component {
  state = {
    loading: false,
    eventsListing: [],
  };

  componentDidMount() {
    this.setState(
      { loading: true },
      this.props.getAllVotingEvents((error, response) => {
        if (!error) {
          this.setState(
            {
              eventsListing: this.props.eventsListing,
            },
            () => {
              this.setState({
                loading: false,
              });
            }
          );
        } else {
          this.setState({ loading: false });
        }
      })
    );
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Voting</title>
      </Helmet>
    );
  };

  render() {
    const { eventsListing, loading } = this.state;

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
                <VotingEventsContent events={eventsListing} />
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
    getAllVotingEvents: (cb) => disptach(getAllVotingEvents(cb)),
  };
};

const eventsConnnected = connect(
  mapStateToProps,
  mapDisptachToProps
)(VotingEvents);

export default withRouter(eventsConnnected);
