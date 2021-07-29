import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import PaidModalContent from "../PaidModalContent/PaidModalContent";
import UnpaidModalContent from "../UnpaidModalContent/UnpaidModalContent";

class NomineeModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteCastSuccess: false,
      nomineeDetail: null,
    };
  }

  componentDidMount() {
    const { nominee } = this.props;
    if (nominee) {
      this.setState({
        nomineeDetail: nominee,
        voteCastSuccess: false,
      });
    }
  }

  voteCastSuccessHandler = () => {
    this.setState({
      voteCastSuccess: true,
    });
  };

  render() {
    const { nomineeDetail } = this.state;
    if (!nomineeDetail) return null;

    return (
      <Fragment>
        {nomineeDetail.votingType === "paid" && (
          <PaidModalContent
            handleOk={this.props.handleOk}
            nomineeDetail={nomineeDetail}
          />
        )}
        {nomineeDetail.votingType === "free" && (
          <UnpaidModalContent
            nomineeDetail={nomineeDetail}
            handleOk={this.props.handleOk}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(NomineeModalBody);
