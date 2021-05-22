import React, {Component} from 'react';
import Loader from '../../commonComponents/loader'
import Transition from '../../commonComponents/transition';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {forgotPassword, errorHandling} from '../../redux/user/user-actions';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import validator from 'validator';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            success: '',
        };
    }

    onInputChange = (e) => {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onButtonClick = () => {
        this.props.errorHandling(false, '');
        this.props.history.push('/authentication')
    };

    submitValues = (e) => {
        e.preventDefault();
        this.props.forgotPassword(
            this.state.email,
            (errorCB) => {
                console.error(errorCB);
            }
        );
    };

    getForm = () => {

        const required = (value) => {
            if (!value.toString().trim().length) {
                return <span className="error">Required</span>
            }
        };

        const email = (value) => {
            if (!validator.isEmail(value)) {
                return `${value} is not a valid email.`
            }
        };

        return (
            <Transition>
                <div className="main-register-wrap modal authentication-bg" key={1}>
                    <div className="reg-overlay"/>
                    <div className="main-register-holder">
                        <div className="main-register fl-wrap">
                            <div id="tabs-container">
                                <div className="tab">

                                    <div id="tab-1" className="tab-content" style={{display: 'block'}}>
                                        <h3 style={{textAlign: 'left'}}><strong>Email</strong></h3>

                                        <Form onSubmit={this.submitValues}>
                                            <div className="custom-form">

                                                {this.getLoader()}

                                                {
                                                    this.props.success ?
                                                        <p style={{color: 'green'}}>{this.props.success}</p> : null
                                                }

                                                {
                                                    this.props.success ? null :
                                                        this.props.error ?
                                                            <p style={{color: 'red'}}>{this.props.errorMessage}</p> : null

                                                }

                                                <div style={{display: this.props.success ? "none" : "block"}}>

                                                    <label>Enter Email </label>
                                                    <Input name="email" type="email" id='email' placeholder="Email"
                                                           validations={[required, email]}
                                                           value={this.state.email}
                                                           style={{marginTop: '15px'}}
                                                           onChange={this.onInputChange} required/>
                                                </div>

                                                <div className="clearfix"/>

                                                <div className="filter-tags" style={{width: '100%'}}>
                                                    {
                                                        this.props.success ?
                                                            <button type="button" className="log-submit-btn" style={{
                                                                backgroundColor: '#EC1C24',
                                                                marginLeft: '10px',
                                                                width: "100%",
                                                                float: "unset"
                                                            }}
                                                                    onClick={() => this.props.history.push('/authentication')}>
                                                                <span>Login Again</span>
                                                            </button> :
                                                            <>
                                                                <button type="submit" className="log-submit-btn"
                                                                        style={{
                                                                            backgroundColor: '#EC1C24',
                                                                            width: "unset",
                                                                            float: "unset",
                                                                            display: 'inline-table'
                                                                        }}>
                                                                    Submit
                                                                </button>
                                                                <button type="button" className="log-submit-btn"
                                                                        style={{
                                                                            backgroundColor: '#bdc1c5',
                                                                            marginLeft: '10px',
                                                                            width: "unset",
                                                                            float: "unset"
                                                                        }}
                                                                        onClick={this.onButtonClick}>
                                                                    <span>Back</span>
                                                                </button>
                                                            </>
                                                    }


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
        return (
            <div>
                {this.getForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        success: state.user.success,
        processing: state.user.processing,
        errorMessage: state.user.message,
    }
};

const connected = connect(mapStateToProps, {forgotPassword, errorHandling})(ForgotPassword);
export default withRouter(connected);
