import React, {Component} from 'react';
import Transition from '../../commonComponents/transition';
import {errorHandling, verifyCodes, verifyUser} from '../../redux/user/user-actions';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Loader from "../../commonComponents/loader";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class Verification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOtp: '',
            phoneOtp: ''
        };
    }

    componentWillMount(){
        if(!this.props.formData){
            this.props.errorHandling(false,'');
            this.props.history.push('/authentication');
        }else if(!this.props.callback){
            this.props.history.push(this.props.backUrl);
        }
    }
    onInputChange = (e) => {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };


    required = (value) => {
        if (!value.toString().trim().length) {
            return <span className="error">Required</span>
        }
    };

    submitValues = (e, callback, next) => {

        e.preventDefault();
        const codes = {
            emailOtp: this.state.emailOtp,
            phoneOtp: this.state.phoneOtp
        };

        const {_id} = this.props.location.state;

        this.props.verifyCodes(codes, _id, next, callback,
            (errors) => {
                console.error(errors);
            });
    };

    getEmailOtpField = () => {
        if (this.props.location && this.props.location.state && this.props.location.state.emailVerificationRequired) {
            return (
                <div>
                    <label>Email OTP <span>*</span> </label>
                    <Input onChange={this.onInputChange} validations={[this.required]} name="emailOtp" type="text"
                           id='emailOtpSetter'
                           placeholder="Email OTP" required/>
                </div>
            );
        }

        return null;
    };

    getPhoneOtpField = () => {
        if (this.props.location && this.props.location.state && this.props.location.state.smsVerificationRequired) {
            return (
                <div>
                    <label>Phone Number OTP <span>*</span> </label>
                    <Input validations={[this.required]} name="phoneOtp" type="text" placeholder="Phone Number OTP"
                           required
                           onChange={this.onInputChange}/>
                </div>
            );
        }

        return null;
    };

    resendUserOtp = () => {
        this.props.verifyUser(
            (userState) => {
                this.props.history.push('/sign-up/verification', {...userState});
            },
            () => {
                this.props.history.push('/')
            },
            (errorCB) => {
                console.error(errorCB);
            }
        );
    };
    getForm = () => {
        const {callback, next, codeError} = this.props;

        return (
            <Transition>
                <div className="main-register-wrap modal authentication-bg" key={1}>
                    <div className="reg-overlay"/>
                    <div className="main-register-holder" style={{marginTop: '27vh'}}>
                        <div className="main-register fl-wrap">
                            <div id="tabs-container">
                                <div className="tab">
                                    <div id="tab-1" className="tab-content" style={{display: 'block'}}>
                                        <h3>Verification</h3>

                                        <Form className="custom-form"
                                              onSubmit={(e) => this.submitValues(e, callback, next)}>

                                            {this.getLoader()}

                                            {codeError ? <p style={{color: 'red'}}>{codeError}</p> : null}

                                            {this.getEmailOtpField()}

                                            {this.getPhoneOtpField()}

                                            <div style={{textAlign: "center"}}>
                                                <p style={{color: "#666"}}>
                                                    I didn't receive the code!
                                                    <span style={{
                                                        fontWeight: "600",
                                                        marginLeft: "10px",
                                                        color: "red",
                                                        textDecoration: "underline",
                                                        cursor:"pointer"
                                                    }}
                                                          onClick={this.resendUserOtp}>
                                                        Resend
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="clearfix"/>


                                            <div className={"row"} style={{textAlign: 'center',display:"inline-block"}}>


                                                <div className="filter-tags">
                                                    <button type="submit" className="log-submit-btn">
                                                        <span>Verify</span>
                                                    </button>
                                                </div>


                                                <div className="filter-tags" style={{marginLeft:"1rem"}}>
                                                    <button type="button" className="log-submit-btn"
                                                            onClick={() => {
                                                                this.props.history.push('/authentication')
                                                            }}><span>Cancel</span>
                                                    </button>
                                                </div>


                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        )
    };

    getLoader = () => {
        if (this.props.processing)
            return (
                <Loader/>
            );

        return null;
    };

    render() {
        let {formData,callback} = this.props;
        if(!formData || (formData && !callback)) return null;
        let {location} = this.props;

        return (
            <div>
                {
                   (location && location.state && location.state.emailVerificationRequired)
                    ||
                   (location && location.state && location.state.smsVerificationRequired) ?
                        this.getForm() : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        callback: state.user.callback,
        next: state.user.next,
        codeError: state.user.codeError,
        processing: state.user.processing,
        formData : state.user.formData,
        backUrl : state.user.backUrl
    }
};

const connected = connect(mapStateToProps, {verifyCodes, verifyUser,errorHandling})(Verification);
export default withRouter(connected);
