import React, { Component } from "react";
import FormElements from "./FormElements";
import { Form, Button } from "antd";
import { formDataTypes } from "./mobileFormData";

class MobilePaymentMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileInforScreen: props.show ? props.show : false,
      formData: formDataTypes.bind(this)(),
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
    console.log("voteData:", voteData);
  };

  userMobileInfoForm = () => {
    const { formData } = this.state;
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
        />
      );
      formElementArray.push(molibleForm);
    }
    return (
      <>
        <h1>{this.props.title}</h1>
        <Form
          keu={formElementArray}
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
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  render() {
    const { showMobileInforScreen } = this.state;

    return <>{showMobileInforScreen ? this.userMobileInfoForm() : null}</>;
  }
}
export default MobilePaymentMethod;
