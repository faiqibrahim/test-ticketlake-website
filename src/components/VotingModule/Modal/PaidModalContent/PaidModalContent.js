import React, { Component } from "react";
import { Button, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { savePaidVoteCast } from "../../../../redux/voting-events/vote-cast/vote-cast-action";
import "../../VotingModule.css";
import PaymentProcessor from "../../../../commonComponents/PaymentProcessor";
import { getVotingPaymentInfo } from "./voting-info-provider";

class PaidModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: null,
      activeMethodId: null,
      paidVoteCastSuccess: false,
      showPaymentProcess: false,
      clientToken: null,
      voteCounter: 1,
      votePrice: 0,
      totalVotePrice: null,
      error: null,
      thankyouScreen: false,
      wallet: props.wallet,
      errorMessage: null,
      disabledButton: true,
      currency: null,
    };
  }

  componentDidMount() {
    localStorage.removeItem("conversionRatesOnCheckout");
    const clientToken =
      "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MzMzMmQxMDZjNTY3N2Q4ZjczYTM1YzhlYzJiNzc0N2M2MjY0NmMzYWVjMzM0NTg3Y2QzZGVlY2FlMWI5MGU5fGNyZWF0ZWRfYXQ9MjAxOS0wNS0wN1QwOToyNzozMC4wMTA4NTgxMTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXI4aHpnajV0emN3a2R2NGNcdTAwMjZwdWJsaWNfa2V5PTM1dHJ3aHc2djdneDdmbWYiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcjhoemdqNXR6Y3drZHY0Yy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9yOGh6Z2o1dHpjd2tkdjRjL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3I4aHpnajV0emN3a2R2NGMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoic3luYXZvcyIsImNsaWVudElkIjoiQVNETUFpblFDUDJ2LWpoU19LWC1Od3BSYlp3SWZibnlDVm9NMUZaeWtncEZVR2RpdUdxQkZwd3lvdlhHTU9tbDA5aWx5QlZ5TUE3NFFDZWUiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzeW5hdm9zIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sIm1lcmNoYW50SWQiOiJyOGh6Z2o1dHpjd2tkdjRjIiwidmVubW8iOiJvZmYifQ=="; // If returned as JSON string

    const { votePrice, currency } = this.props.nomineeDetail;
    this.setState({
      clientToken,
      votePrice: votePrice ? votePrice : 0,
      totalVotePrice: votePrice,
      currency: currency ? currency : "GHS",
    });
  }

  voteCounterHandler = (e) => {
    if (e) {
      let { errorMessage, disabledButton } = this.state;
      let voteCount = e;

      if (voteCount < 0) {
        errorMessage = "Voting count cannot be negative";
        disabledButton = false;
      } else if (voteCount % 1 !== 0) {
        errorMessage = "Voting count cannot be in decimal";
        disabledButton = false;
      } else {
        errorMessage = "";
        disabledButton = true;
      }

      const { votePrice } = this.state;
      voteCount = parseInt(voteCount);

      let totalVotePrice = voteCount * votePrice;

      this.setState({
        voteCounter: voteCount,
        totalVotePrice,
        errorMessage: errorMessage,
        disabledButton,
      });
    }
  };

  confirmPriceButtonHandler = () => {
    this.setState({
      showPaymentProcess: true,
    });
  };

  voteCastOnSuccessHandler = (transactionIDs) => {
    const { savePaidVoteCast } = this.props;

    savePaidVoteCast(transactionIDs, (error, data) => {
      if (!error) {
        this.setState({
          thankyouScreen: true,
        });
      }
    });
  };

  renderPaymentProcesses = () => {
    const { currency, totalVotePrice } = this.state;

    const info = getVotingPaymentInfo({ currency, amount: totalVotePrice });

    return (
      <>
        <div className="subTitle">
          <div className="text">
            Total Price: GHS {totalVotePrice.toFixed(2)}
          </div>
        </div>

        <PaymentProcessor
          {...info}
          onSuccess={(response) => this.voteCastOnSuccessHandler(response)}
          onFailure={(error) => console.log("onFailure", error)}
        />
      </>
    );
  };

  inputVoteCountScreen = () => {
    const {
      voteCounter,
      error,
      votePrice,
      totalVotePrice,
      errorMessage,
    } = this.state;

    return (
      <>
        <div className="subTitle">
          <div className="text">GHS {votePrice} per vote</div>
          <div className="text">{error}</div>
        </div>
        <div className="paymentDetail">
          <div className="voteCount">
            <div className="title">Number of Votes</div>
            <div style={{ position: "relative" }}>
              <i className="voting_dropdown_arrow"></i>
              <InputNumber
                name="number_of_votes"
                min={1}
                type="number"
                value={voteCounter}
                onChange={this.voteCounterHandler}
              />
            </div>
            <div className="errorMessage">{errorMessage}</div>
          </div>
        </div>
        <div className="castVote">
          <Button
            className={`active_method enabled`}
            onClick={this.confirmPriceButtonHandler}
          >
            Pay GHS
            {totalVotePrice ? totalVotePrice.toFixed(2) : votePrice.toFixed(2)}
          </Button>
        </div>
      </>
    );
  };

  renderVoteCastScreen = () => {
    const { showPaymentProcess } = this.state;

    const showScreen = !showPaymentProcess
      ? this.inputVoteCountScreen()
      : this.renderPaymentProcesses();

    return (
      <>
        <div className="title" style={{ marginBottom: "20px" }}>
          Vote for {this.props.nomineeDetail.nomineeName}
        </div>
        {showScreen}
      </>
    );
  };

  renderVoteSuccessScreen = () => {
    return (
      <>
        <div className="title">
          Thanks for voting. Your vote has been cast successfully.
        </div>
        <div className="detailContent">
          <div className="detailImg">
            <img src={this.props.nomineeDetail.imgSrc} alt={"img"} />
          </div>
          <div className="detailName">
            {this.props.nomineeDetail.nomineeName}
          </div>
          <div className="detailVoteType">
            {this.props.nomineeDetail.votingType}
          </div>
        </div>
        <div className="castVote" style={{ paddingTop: "50px" }}>
          <Button onClick={this.props.handleOk} className="active_method">
            Go Back To Nominees
          </Button>
        </div>
      </>
    );
  };

  render() {
    const { paidVoteCastSuccess, thankyouScreen } = this.state;

    return (
      <div
        className={`${
          paidVoteCastSuccess ? "DetailBox paidPadding" : "DetailBox"
        }`}
      >
        {!paidVoteCastSuccess && !thankyouScreen
          ? this.renderVoteCastScreen()
          : !thankyouScreen && paidVoteCastSuccess
          ? this.showSelectedPaymentScreen()
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
    savePaidVoteCast: (voteData, cb) =>
      dispatch(savePaidVoteCast(voteData, cb)),
  };
};

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaidModalContent);

export default withRouter(connectedComponent);
