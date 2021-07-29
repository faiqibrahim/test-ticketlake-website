import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVotingEvents } from "./data-fetcher";
import VotingEventsContent from "./VotingPage/VotingEventsContent/VotingEventsContent";
import VotingHeader from "./Header/Layout/Layout";
import "./RouteWrapper/RouteWrapper.css";
import { Helmet } from "react-helmet";
import { getAllVotingEvents } from "../../redux/voting-events/event/event-actions";

class VotingEvents extends Component {
  state = {
    loading: true,
    events: [],
    eventsListing: [],
  };

  componentDidMount() {
    getVotingEvents()
      .then((events) => {
        this.setState({
          loading: false,
          events,
          breadCrumbs: [
            { path: "/", crumbTitle: "Home" },
            { path: "/voting", crumbTitle: "Votings" },
          ],
        });
      })
      .catch((error) => {});

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
    });
  }

  pageTitle = () => {
    return (
      <Helmet>
        <title>Voting</title>
      </Helmet>
    );
  };

  render() {
    if (this.state.loading) return <p>Component Loading!</p>;

    const { eventsListing } = this.state;

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
              <VotingEventsContent
                events={eventsListing ? eventsListing : null}
              />
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
