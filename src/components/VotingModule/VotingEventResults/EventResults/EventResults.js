import React, { Component, Fragment } from "react";
import Loader from "../../../../commonComponents/loader";
import { connect } from "react-redux";

import { getClosedEventNomineeListingByCategoryId } from "../../../../redux/voting-events/result/result-action";
import { getEventBreadCrumbs } from "../../../../redux/voting-events/bread-crumbs/bread-crumb-actions";
import VotingHeader from "../../Header/Layout/Layout";
import WinnerNominee from "../WinnerNominee/WinnerNominee";
import EventResultCard from "../EventResultCard/EventResultCard";
import "./EventResults.css";

class EventResults extends Component {
  state = {
    loading: true,
    event: null,
    maxVotes: null,
  };

  componentDidMount() {
    const { id, categoryId } = this.props.match.params;
    this.props.getClosedEventNomineeListingByCategoryId(
      categoryId,
      (error, data) => {
        if (!error) {
          this.getBreadCrumbs(id, categoryId);
          this.setState(
            {
              loading: false,
              resultListing: this.props.resultListing,
            },
            () => {
              this.getMaxNomineeVote();
            }
          );
        } else {
          this.setState({ loading: false });
        }
      }
    );
  }

  getBreadCrumbs = (eventID, categoryID) => {
    this.props.getEventBreadCrumbs(eventID, categoryID, (error, data) => {
      if (!error) {
        this.setState({
          eventName: this.props.breadCrumbs[0].eventName,
          categoryName: this.props.breadCrumbs[1].categoryName,
          breadCrumbs: [
            { path: "/", crumbTitle: "Home" },
            { path: "/voting", crumbTitle: "Votings" },
            {
              path: `/voting/${eventID}`,
              crumbTitle: this.props.breadCrumbs[0].eventName,
            },
            {
              path: `/voting/${eventID}/categories/${categoryID}`,
              crumbTitle: this.props.breadCrumbs[1].categoryName,
            },
          ],
        });
      }
    });
  };
  getMaxNomineeVote = () => {
    const { resultListing } = this.state;
    const nomineeVotess = [];
    nomineeVotess.push(
      resultListing.map((nominee) => {
        return nominee.nomineeVotes;
      })
    );
    const max = Math.max(...nomineeVotess[0]);
    this.setState({
      maxVotes: max,
    });
  };

  getWinnerNominees = () => {
    const { maxVotes, resultListing } = this.state;

    return resultListing.filter(
      (nomineeItem) => nomineeItem.nomineeVotes === maxVotes
    );
  };

  render() {
    if (this.state.loading) return <Loader />;

    const { maxVotes } = this.state;
    const [...resultListing] = this.state.resultListing;

    resultListing.sort((a, b) => (a.nomineeVotes > b.nomineeVotes ? -1 : 1));

    const nomineeWinners = this.getWinnerNominees();

    return (
      <Fragment>
        <div className="container">
          <div>
            <VotingHeader
              pageTitle={this.state.eventName}
              breadCrumbs={this.state.breadCrumbs}
            />
          </div>
        </div>
        <hr style={{ margin: "5px 0" }} />
        <div className="container eventResultContainer">
          <div className="contentBox">
            <div className="winnerBox">
              <div className="row winnerRow">
                {nomineeWinners.map((nominee) => (
                  <WinnerNominee
                    key={nominee.id}
                    nomineeDetail={nominee}
                    categoryName={this.state.categoryName}
                  />
                ))}
              </div>
            </div>

            <hr style={{ margin: "5px 0" }} />

            <div className="Header">
              <div className="nomineeHeaderCol">
                <div className="heading">
                  Nominees for "{this.state.categoryName}"
                </div>
                <div className="subHeading">
                  Standings for the participants for this position are as
                  follows.
                </div>
              </div>
              <div className="nomineeHeaderCol">
                <div className="sortContent">
                  <div
                    className="nomineeBoxRow"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <div className="col2">
                      <div className="sortBox">
                        <label>Sort by: &nbsp;</label>
                        <i className="sortArrow"></i>
                        <div
                          className="dropdown"
                          name="nomineeSort"
                          id="nomineeSort"
                        >
                          <span>Most Votes</span>
                          <div className="dropdown-content">
                            <p>Most Votes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nomineeBoxRow">
              {resultListing.map((nominee) => {
                return (
                  <EventResultCard
                    key={nominee.id}
                    nomineeDetail={nominee}
                    maxVotes={maxVotes}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resultListing: state.voting.result.resultListing,
    breadCrumbs: state.voting.breadCrumbs.breadCrumbs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClosedEventNomineeListingByCategoryId: (categoryID, cb) =>
      dispatch(getClosedEventNomineeListingByCategoryId(categoryID, cb)),
    getEventBreadCrumbs: (eventID, categoryID, cb) =>
      dispatch(getEventBreadCrumbs(eventID, categoryID, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventResults);
