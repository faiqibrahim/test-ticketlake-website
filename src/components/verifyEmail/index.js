import React from 'react';
import {NavLink} from "react-router-dom";
import { Modal, Button, Form, Input } from 'antd';
import axios from '../../utils/axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUserProfile} from "../../redux/user/user-actions";

class VerifyEmailComponent extends React.Component {
  state={
    verifyLater:false,
    tokenId:null,
    optError:null,
    // profileData:this.props.prodileData
}
// componentDidMount(){
//   this.setState({
//     verifyLater: this.props.prodileData
//   })
// }
verifyLater=()=>{
    this.setState({
        verifyLater:true,
        visible: false
    })
    // localStorage.setItem("verifyLater", true);
    sessionStorage.setItem('verifyLater', true);
}
resendOtp=()=>{
    console.log('resendOtp')
}
showModal = () => {
    axios.post('/consumers/send-email-otp')
        .then(response => {
            this.setState({
                visible: true,
                tokenId: response.data.verificationCredentials.tokenId
            });
        })
        .catch(err => {
            console.log(err.response.data._error)
            NotificationManager.error(err.response.data._error);
        });
  };
  resendOtp = () => {
    axios.post('/consumers/send-email-otp')
    .then(response => {
        this.setState({
            tokenId: response.data.verificationCredentials.tokenId
        });
        
    })
    .catch(err => {
        console.log(err.response.data._error)
    });
}
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

onFinish = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    if (!err) {
        axios.post('/consumers/verify-email-otp',{
          "emailOtp":values.otp,
          "_id":this.state.tokenId
        })
        .then(response => {
            sessionStorage.setItem('verifyLater', true);
            this.setState({
                visible: false,
                verifyLater:true
            });
            // NotificationManager.success(response.response.data._message);
        })
        .catch(err => {
            // console.log(err.response.data._error)
            this.setState({
              optError:err.response.data._error
            })
        });
    }
    });
// this.handleOk();
};

onFinishFailed = errorInfo => {
console.log('Failed:', errorInfo);
};

rnderHTML(){
  const { getFieldDecorator } = this.props.form;
// console.log('prodileData', this.props.user.email)
let getItem = sessionStorage.getItem('verifyLater')

  return(
    getItem===null?
    <div className={this.state.verifyLater===true?"none":"verify-email-container"}>
              <div className="container custom-container">
                  <p><span>Please verify your email </span><br/>
                  Please verify your email <span style={{fontWeight:'500', fontSize:'14px'}}>{this.props.user!==null?this.props.user.email:'no email found'} </span>linked with your Ticketlake account<br/>
                  Once email is verified, you will be able to make your Wishlist, set up wallet and access more features. <NavLink to="/user/profile" style={{textDecoration:'underline'}}>Use a different email?</NavLink></p>
                  <p>
                      <button className="btn btn-danger buttonDefault defaultBackground" onClick={this.showModal}>Verify Now</button>
                      <button className="btn btn-grey buttonDefault defaultBackground" onClick={this.verifyLater}>Later</button>
                  </p>
                  <div>
                      <Modal
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                          footer={false}
                          style={{textAlign:'left'}}
                          destroyOnClose={true}
                      >
                          
                      

                      {/* <Transition> */}
                          <div className="main-register-wrap modal authentication-bg" key={1}>
                              <div className="reg-overlay"/>
                              <div className="main-register-holder" style={{marginTop: '27vh'}}>
                                  <div className="main-register fl-wrap">
                                      <div id="tabs-container">
                                          <div className="tab">
                                              <div id="tab-1" className="tab-content" style={{display: 'block'}}>
                                                  <h3>Verification</h3>
                                                  <Form
                                                      name="basic"
                                                      initialValues={{ remember: true }}
                                                      onSubmit={this.onFinish}
                                                      // onFinishFailed={this.onFinishFailed}
                                                      >
                                                      <Form.Item
                                                              label="Enter Email OTP"
                                                          >
                                                              {getFieldDecorator('otp', {
                                                                  rules: [{
                                                                      required: true,
                                                                      message: 'Please input your OTP',
                                                                      whitespace: true
                                                                  }],
                                                              })(<Input style={{background: '#F2F3F8',
                                                                border: '1px solid #eee',
                                                                lineHeight: '45px',
                                                                height: '44px',}}/>)}
                                                          </Form.Item>
                                                          <p style={{textAlign:'center', color:'rgb(102, 102, 102)'}}>I didn't receive the code! <span onClick={this.resendOtp} style={{color:'red', fontWeight:'500', cursor:'pointer'}}>Resend</span></p>
                                                      {/* <p style={{color:'red'}} >{this.state.optError}</p> */}
                                                      <Form.Item className="custom-form">
                                                          <Button type="primary" htmlType="submit" className="log-submit-btn veritfy-email-btn" >
                                                              Verify
                                                          </Button> 
                                                          <Button type="primary"className="log-submit-btn veritfy-email-btn" style={{marginLeft:'10px'}} onClick={this.handleCancel}>
                                                              Cancel
                                                          </Button>
                                                      </Form.Item>
                                                  </Form>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      {/* </Transition> */}
                      </Modal>
                  </div>
              </div>
          </div>
          :
          ''
  )
}
    render() {
      // console.log('this.props.prodileDatathis.props.prodileData', this.props.user)
      // console.log('this.props.prodileDatathis.props.prodileData2', this.props.prodileData)
      // console.log('profileData', this.state.profileData)
      return (
          this.props.user!==null?
            this.props.prodileData!==undefined?
            this.props.prodileData===true?
              '' : this.rnderHTML()
            :null
          :null
        )
    }
}

const mapStateToProps = (state) => {
  // console.log('profile info1:', state.user);
  return {
    prodileData: state.user.profileData!==undefined?state.user.profileData.isEmailVerfied:undefined,
    profileEmail: state.user,
    user:state.user.user
  }
};


const OrgAddForm = Form.create()(VerifyEmailComponent);
const VerifyEmail = connect(mapStateToProps, {fetchUserProfile})(OrgAddForm);
export default withRouter(VerifyEmail);