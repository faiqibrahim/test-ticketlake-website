import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";
import { setRedirectTo } from "../../../../redux/user/user-actions";
import NomineeCard from "../NomineeCard/NomineeCard";
import NomineeModalBody from "../../Modal/NomineeModalBody/NomineeModalBody";
import Loader from "../../../../commonComponents/loader";
import { getAllVotingNominees } from "../../../../redux/voting-events/nominee/nominee-action";
import { getEventBreadCrumbs } from "../../../../redux/voting-events/bread-crumbs/bread-crumb-actions";
import { getSingleNomineeDetail } from "../../../../redux/voting-events/nominee/nominee-action";
import ToolTips from "../../ToolTips/ToolTips";

import { duration } from "../../../../commonComponents//Duration/duration";
import "./EventNominees.css";
import "../../VotingModule.css";

class EventNominees extends Component {
  is_Mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nominees: null,
      visible: false,
      nomineeId: null,
      remainingTime: null,
      categoryName: "",
      eventName: "",
      voteCount: null,
      authentication: this.props.auth,
      wallet: this.props.wallet,
      categoryID: this.props.match.params.categoryId,
      eventID: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.is_Mounted = true;

    if (this.is_Mounted) {
      this.fetchAllNominees();
    }
  }

  fetchAllNominees = () => {
    const { eventID, categoryID } = this.state;

    this.props.getAllVotingNominees(categoryID, (error, data) => {
      if (!error && data.length > 0) {
        let durationCheck = duration(this.props.nomineeListing[0]);

        if (durationCheck.eventEnd) {
          this.props.history.push(
            `/voting/${eventID}/event-results/${categoryID}`
          );
        } else {
          this.getBreadCrumbs(eventID, categoryID);
          this.setState({
            loading: false,
            nominees: this.props.nomineeListing,
            remainingTime: durationCheck,
          });
        }
      } else {
        this.props.history.push("/voting");
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categoryID !== this.props.catalogueCategoryID) {
      this.setState(
        {
          categoryID: this.props.catalogueCategoryID,
        },
        () => {
          this.fetchAllNominees();
        }
      );
    }
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  getBreadCrumbs = (eventID, categoryID) => {
    this.props.getEventBreadCrumbs(eventID, categoryID, (error, data) => {
      if (!error) {
        this.setState({
          eventName: this.props.breadCrumbs[0].eventName + " - Nominees",
          categoryName: this.props.breadCrumbs[1].categoryName,
        });
      }
    });
  };

  toggleModal = (nominee) => {
    const { authentication } = this.state;

    this.setState({
      visible: !this.state.visible,
      nominee,
    });

    if (!authentication) {
      sessionStorage.setItem(
        "redirectTo",
        this.props.history.location.pathname
      );
      this.props.setRedirectTo(this.props.history.location.pathname);
      this.props.history.push("/authentication");
    }
  };

  onChange = () => {
    const { id, votingCategoryId } = this.state.nominee;

    this.props.getSingleNomineeDetail(id, (error, data) => {
      if (!error) {
        this.setState({
          voteCount: this.props.voteCount,
        });
      }
    });
    this.props.getAllVotingNominees(votingCategoryId, (error, data) => {
      if (!error) {
        this.setState({
          nominees: this.props.nomineeListing,
        });
      }
    });
  };

  renderNomineesModal = () => {
    const { nominee, voteCount, wallet } = this.state;

    if (!nominee) return null;

    return (
      <Modal
        title=""
        visible={this.state.visible}
        onOk={this.toggleModal}
        onCancel={this.toggleModal}
        width={650}
        wrapClassName="NomineeModal"
        footer={null}
      >
        <NomineeModalBody
          handleOk={this.toggleModal}
          nominee={nominee}
          key={nominee.id}
          onChange={this.onChange}
          wallet={wallet}
          voteCount={voteCount ? voteCount : null}
        />
      </Modal>
    );
  };

  render() {
    if (this.state.loading) return <Loader />;

    const [, ...nominees] = this.state.nominees;

    nominees.sort((a, b) => (a.voteCount > b.voteCount ? -1 : 1));

    const { voteCount, remainingTime } = this.state;

    return (
      <Fragment>
        {this.renderNomineesModal()}
        <div className="container eventNomineesContainer">
          <div className="contentBox">
            <div className="Header">
              <div className="nomineeHeaderCol">
                <div className="heading">
                  Nominees <span>for</span>
                  <div>"{this.state.categoryName}"</div>
                </div>
                <div className="subHeading">
                  Please select a nominee to vote for
                </div>
              </div>
              <div className="nomineeHeaderCol">
                <div className="timeContent">
                  <div className="nomineeBoxRow">
                    <div className="col-md-3 timerClock">
                      <img src={"/images/votingimages/clock.svg"} alt="img" />
                    </div>
                    <div className="col-md-9">
                      <ToolTips
                        text={remainingTime}
                        textLength={21}
                        classes={{
                          toolStyle: "tooltipStyle",
                          textClasses: { title: "timeLeft" },
                        }}
                      />
                      <div className="timeText">Remaining in votings..</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nomineeBoxRow">
              {nominees && nominees.length > 0
                ? nominees.map((nominee) => {
                    return (
                      <NomineeCard
                        key={nominee.id}
                        {...nominee}
                        voteCountDetail={voteCount ? voteCount : null}
                        clicked={() => this.toggleModal(nominee)}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default Authentication;
const mapStateToProps = (state) => {
  return {
    auth: state.user.authenticated,
    wallet: state.user.userWallet,
    nomineeListing: state.voting.nominee.nomineeListing,
    breadCrumbs: state.voting.breadCrumbs.breadCrumbs,
    voteCount: state.voting.nominee.updatedVoteCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVotingNominees: (id, cb) => dispatch(getAllVotingNominees(id, cb)),
    getEventBreadCrumbs: (eventID, categoryID, cb) =>
      dispatch(getEventBreadCrumbs(eventID, categoryID, cb)),
    getSingleNomineeDetail: (nomineeID, cb) =>
      dispatch(getSingleNomineeDetail(nomineeID, cb)),
    setRedirectTo,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventNominees);

export default withRouter(connectedComponent);
