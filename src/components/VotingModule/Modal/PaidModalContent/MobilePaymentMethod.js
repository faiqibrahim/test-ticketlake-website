import React, { Component } from "react";
import FormElements from "./FormElements";
import { Form, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formDataTypes } from "./mobileFormData";
import { savePaidVoteCast } from "../../../../redux/voting-events/vote-cast/vote-cast-action";
import Loader from "../../../../commonComponents/loader";

class MobilePaymentMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileInforScreen: props.show ? props.show : false,
      formData: formDataTypes.bind(this)(),
      error: null,
      successMessage: "",
      loading: false,
    };
  }

  onChangeHandler = (e, key) => {
    const { formData } = this.state;
    const updatedFormData = { ...formData };
    updatedFormData[key].value = e;

    this.setState({
      formData: updatedFormData,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { voteData } = this.props;
    const { formData } = this.state;

    voteData.msisdn = formData.mobile.value;
    voteData.channel = formData.channel.value;

    this.setState(
      { loading: true },
      this.props.savePaidVoteCast(voteData, (error, data) => {
        if (!error) {
          this.setState(
            {
              successResponse: this.props.voteCastResponse,
            },
            () => {
              this.setState({
                loading: false,
                successMessage:
                  "Thanks for voting. Your vote has been cast successfully.",
              });
            }
          );
        } else {
          this.setState({
            error: this.props.error.error,
            loading: false,
            successMessage: "Vote Will Be Cast Once Your Payment Is Verified",
          });
        }
      })
    );
  };

  successResponseWait = () => {
    const { loading, successMessage } = this.state;

    if (loading) return <Loader />;

    return (
      <div className="subTitle">
        <div className="text">
          <h1>{successMessage}</h1>
        </div>
      </div>
    );
  };

  userMobileInfoForm = () => {
    const { formData, error } = this.state;
    const formElementArray = [];
    for (let key in formData) {
      const formElement = {
        id: key,
        data: formData[key],
      };

      const molibleForm = (
        <FormElements
          formElement={formElement}
          onChange={this.onChangeHandler}
          key={key}
        />
      );
      formElementArray.push(molibleForm);
    }

    return (
      <>
        <h1>{this.props.title}</h1>
        <div className="subTitle">
          <div className="text">{error}</div>
        </div>
        <Form
          name="userMobileInfoForm"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          onSubmit={this.onSubmit.bind(this)}
        >
          {formElementArray}
          <Form.Item
            wrapperCol={{
              span: 20,
            }}
            name="payment_button"
          >
            <Button className="mobile_payment" htmlType="submit">
              Pay
            </Button>
          </Form.Item>
        </Form>
        {this.successResponseWait()}
      </>
    );
  };

  render() {
    const { showMobileInforScreen } = this.state;

    return <>{showMobileInforScreen ? this.userMobileInfoForm() : null}</>;
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
)(MobilePaymentMethod);

export default withRouter(connectedComponent);
