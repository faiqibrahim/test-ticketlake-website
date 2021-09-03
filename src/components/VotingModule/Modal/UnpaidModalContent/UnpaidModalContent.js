import React, { Component } from "react";
import { Button } from "antd";
import { saveFreeVoteCast } from "../../../../redux/voting-events/vote-cast/vote-cast-action";
import { connect } from "react-redux";

import "../../VotingModule.css";
import RemainingTime from "./RemainingTime";

class UnpaidModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteCastSuccess: false,
      remainingTime: "",
      castingMessage:
        "Thanks for voting. Your vote has been cast successfully.",
      error: null,
    };
  }

  voteCastSuccessHandler = (voteData) => {
    this.props.saveFreeVoteCast(voteData, (error, data) => {
      if (!error) {
        this.setState(
          {
            voteCastResponse: this.props.voteCastResponse,
          },
          () => {
            const remainingTime = (
              <RemainingTime remainingTime={this.state.voteCastResponse} />
            );

            const { message } = remainingTime.props.remainingTime;
            const { castingMessage } = this.state;

            this.setState({
              remainingTime,
              castingMessage: message
                ? "You have already cast your vote."
                : castingMessage,
            });
            this.props.onChange(this.props.nomineeDetail.id);
          }
        );
      } else {
        this.setState({
          error: this.props.error.error,
        });
      }
      this.setState({
        voteCastSuccess: true,
      });
    });
  };

  renderVoteCastScreen = () => {
    return (
      <>
        <div className="title">
          <div className="upperTitle">Are you sure for casting</div>
          <div className="bottomTitle">your vote to following nominee?</div>
        </div>
        <div className="detailContent">
          <div className="detailImg">
            <img src={this.props.nomineeDetail.imgSrc} alt={"img"} />
          </div>
          <div className="detailName">
            {this.props.nomineeDetail.nomineeName}
          </div>
          <div className="detailVoteType">
            {this.props.nomineeDetail.balloting === true
              ? "secret balloting"
              : this.props.nomineeDetail.voteCount === 1
              ? this.props.nomineeDetail.voteCount + " vote"
              : this.props.nomineeDetail.voteCount + " votes"}
          </div>
        </div>
        <div className="castVote">
          <Button
            className="active_method"
            onClick={() =>
              this.voteCastSuccessHandler(this.props.nomineeDetail)
            }
          >
            Yes, Cast Vote Now
          </Button>
        </div>
      </>
    );
  };

  _renderVoteSuccessScreen = () => {
    const { error, remainingTime, castingMessage } = this.state;
    const { nomineeDetail, voteCount } = this.props;

    let nomineeVoteCount = voteCount
      ? voteCount.data.totalVotes
      : nomineeDetail.voteCount;
    let voteInfo = null;
    if (error) {
      voteInfo = <div className="timeLeft">{error}</div>;
    } else {
      voteInfo = (
        <>
          <div className="text">You can cast another vote after</div>
          <div className="timeLeft">{remainingTime}</div>
        </>
      );
    }

    return (
      <>
        <div className="title" style={{ marginBottom: "20px" }}>
          {castingMessage}
        </div>
        <div className="subTitle">{voteInfo}</div>
        <div className="detailContent">
          <div className="detailImg">
            <img src={nomineeDetail.imgSrc} alt={"img"} />
          </div>
          <div className="detailName">{nomineeDetail.nomineeName}</div>
          <div className="detailVoteType">
            {nomineeDetail.balloting === true
              ? "secret balloting"
              : nomineeVoteCount === 1
              ? nomineeVoteCount + " vote"
              : nomineeVoteCount + " votes"}
          </div>
        </div>
        <div className="castVote" style={{ paddingTop: "40px" }}>
          <Button onClick={this.props.handleOk} className="active_method">
            Go Back To Nominees
          </Button>
        </div>
      </>
    );
  };
  get renderVoteSuccessScreen() {
    return this._renderVoteSuccessScreen;
  }
  set renderVoteSuccessScreen(value) {
    this._renderVoteSuccessScreen = value;
  }

  render() {
    const { voteCastSuccess } = this.state;
    return (
      <div
        className={`${
          voteCastSuccess ? "DetailBox" : "DetailBox unpaidPadding"
        }`}
      >
        {!voteCastSuccess
          ? this.renderVoteCastScreen()
          : this.renderVoteSuccessScreen()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    voteCastResponse: state.voting.voteCast.voteCastResponse,
    error: state.voting.voteCast.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFreeVoteCast: (voteData, cb) =>
      dispatch(saveFreeVoteCast(voteData, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidModalContent);
