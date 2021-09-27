import React, { Component, Fragment } from "react";
import Loader from "../../../../commonComponents/loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getClosedEventNomineeListingByCategoryId } from "../../../../redux/voting-events/result/result-action";
import { getEventBreadCrumbs } from "../../../../redux/voting-events/bread-crumbs/bread-crumb-actions";
import WinnerNominee from "../WinnerNominee/WinnerNominee";
import EventResultCard from "../EventResultCard/EventResultCard";
import "./EventResults.css";

class EventResults extends Component {
  is_Mounted = false;
  state = {
    loading: true,
    event: null,
    maxVotes: null,
    categoryID: this.props.match.params.categoryId,
    eventID: this.props.match.params.id,
  };

  componentDidMount() {
    this.is_Mounted = true;

    if (this.is_Mounted) {
      this.fetchEventResultNominees();
    }
  }

  fetchEventResultNominees = () => {
    const { eventID, categoryID } = this.state;
    this.props.getClosedEventNomineeListingByCategoryId(
      categoryID,
      (error, data) => {
        if (!error) {
          this.getBreadCrumbs(eventID, categoryID);
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
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categoryID !== this.props.catalogueCategoryID) {
      this.setState(
        {
          categoryID: this.props.catalogueCategoryID,
        },
        () => {
          this.fetchEventResultNominees();
        }
      );
    }
  }

  getBreadCrumbs = (eventID, categoryID) => {
    this.props.getEventBreadCrumbs(eventID, categoryID, (error, data) => {
      if (!error) {
        this.setState({
          eventName: this.props.breadCrumbs[0].eventName,
          categoryName: this.props.breadCrumbs[1].categoryName,
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

  getNomineesExecptWinner = () => {
    const { maxVotes, resultListing } = this.state;

    const filteredListing = resultListing.filter(
      (nomineeItem) => nomineeItem.nomineeVotes !== maxVotes
    );

    filteredListing.sort((a, b) => (a.nomineeVotes > b.nomineeVotes ? -1 : 1));

    return filteredListing;
  };

  render() {
    if (this.state.loading) return <Loader />;

    const { maxVotes } = this.state;

    const nomineeExecptWinner = this.getNomineesExecptWinner();
    const nomineeWinners = this.getWinnerNominees();

    return (
      <Fragment>
        <div className="container eventResultContainer">
          <div className="contentBox">
            <div className="Header">
              <div className="nomineeHeaderCol">
                <div className="heading">
                  Nominees <span>for</span>
                  <div>"{this.state.categoryName}"</div>
                </div>
                <div className="subHeading">
                  Standings for the participants for this position are as
                  follows.
                </div>
              </div>
            </div>
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
            <div className="nomineeBoxRow">
              {nomineeExecptWinner.map((nominee) => {
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

const eventCategoryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventResults);

export default withRouter(eventCategoryConnected);
