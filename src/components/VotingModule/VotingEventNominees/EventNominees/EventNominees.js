import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";
import { setRedirectTo } from "../../../../redux/user/user-actions";
import NomineeCard from "../NomineeCard/NomineeCard";
import NomineeModalBody from "../../Modal/NomineeModalBody/NomineeModalBody";
import Loader from "../../../../commonComponents/loader";
import { getAllVotingNominees } from "../../../../redux/voting-events/nominee/nominee-action";
import VotingHeader from "../../Header/Layout/Layout";
import "./EventNominees.css";
import "../../VotingModule.css";

class EventNominees extends Component {
  is_Mounted = false;

  state = {
    loading: true,
    nominees: null,
    visible: false,
    nomineeId: null,
    authentication: this.props.auth,
  };

  componentDidMount() {
    this.is_Mounted = true;

    const { id, categoryId } = this.props.match.params;
    const params = new URLSearchParams(this.props.location.search);
    const categoryName = params.get("categoryName");
    const eventName = params.get("eventName");

    this.props.getAllVotingNominees(categoryId, (error, data) => {
      if (!error) {
        this.setState({
          loading: false,
          nominees: this.props.nomineeListing,
          categoryName,
          eventName,
          breadCrumbs: [
            { path: "/", crumbTitle: "Home" },
            { path: "/voting", crumbTitle: "Votings" },
            { path: `/voting/${id}`, crumbTitle: eventName },
            {
              path: `/voting/${id}/categories/${categoryId}`,
              crumbTitle: categoryName,
            },
          ],
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  toggleModal = (nominee) => {
    const authentication = this.state.authentication;

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

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  renderNomineesModal = () => {
    const { nominee } = this.state;

    if (!nominee) return null;

    return (
      <Modal
        title=""
        visible={this.state.visible}
        onOk={this.toggleModal}
        onCancel={this.toggleModal}
        width={800}
        wrapClassName="NomineeModal"
        footer={null}
      >
        <NomineeModalBody
          handleOk={this.handleOk}
          nominee={nominee}
          key={nominee.id}
        />
      </Modal>
    );
  };

  render() {
    if (this.state.loading) return <Loader />;

    const { nominees } = this.state;

    return (
      <Fragment>
        {this.renderNomineesModal()}
        <div className="container">
          <div className="headerContainer">
            <VotingHeader
              pageTitle={`${this.state.eventName} - Nominees`}
              breadCrumbs={this.state.breadCrumbs}
            />
          </div>
        </div>
        <hr style={{ margin: "5px 0" }} />
        <div className="container eventNomineesContainer">
          <div className="contentBox">
            <div className="Header">
              <div className="nomineeHeaderCol">
                <div className="heading">
                  Nominees for "{this.state.categoryName}"
                </div>
                <div className="subHeading">
                  Please select a nominee to vote for
                </div>
              </div>
              <div className="nomineeHeaderCol">
                <div className="timeContent">
                  <div className="nomineeBoxRow">
                    <div className="col3">
                      <img
                        className="timerClock"
                        src={"/images/votingimages/clock.svg"}
                        alt="img"
                      />
                    </div>
                    <div className="col9">
                      <div className="timeLeft">02 hours, 30 mins</div>
                      <div className="timeText">Remaining in votings..</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nomineeBoxRow">
              {nominees && nominees.length > 0 ? (
                nominees.map((nominee) => {
                  return (
                    <NomineeCard
                      key={nominee.id}
                      {...nominee}
                      clicked={() => this.toggleModal(nominee)}
                    />
                  );
                })
              ) : (
                <h1>No Nominee Exists</h1>
              )}
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
    nomineeListing: state.voting.nominee.nomineeListing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVotingNominees: (id, cb) => dispatch(getAllVotingNominees(id, cb)),
    setRedirectTo,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventNominees);

export default withRouter(connectedComponent);
