// Library
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// Redux
import {connect} from 'react-redux';
// Component
import {login, errorHandling, loginFacebook, loginFacebookData, loginGoogle, loginGoogleData} from '../../redux/user/user-actions';
import Loader from "../../commonComponents/loader";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import axios from '../../utils/axios';
import {NotificationManager} from "react-notifications";
import {Helmet} from "react-helmet";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            fbLoginData:[],
            googleLoginData:[]
        };
    }
    componentDidMount=()=>{
        localStorage.removeItem("googleLoacalData")
        localStorage.removeItem("fbLoacalData")
    }
    responseFacebook = (response) => {
        this.setState({
            fbLoginData:response
        })
        this.props.loginFacebookData(this.state.fbLoginData)
        if(this.state.fbLoginData!==undefined){
            axios.post('/consumers/login-with-fb', {
                "fbId": this.state.fbLoginData.userID,
                "accessToken": this.state.fbLoginData.accessToken
                })
                .then(response => {
                    if(response.data.isExist){
                        NotificationManager.success(response.data._message, '', 3000);
                        this.props.loginFacebook(false, response.data)
                    }else{
                        NotificationManager.error(response.data._message, '', 3000);
                        this.props.loginFacebook(true, null)
                    }
                })
                .catch(err => {
                    console.error('err', err)
                    // NotificationManager.error('Error', '', 3000);
                });
        }
    }
    responseGoogle = (response) => {
        this.setState({
            googleLoginData:response
        }, () => {

            this.props.loginGoogleData(this.state.googleLoginData)
            // localStorage.setItem("googleLoacalData", JSON.stringify(response));
            if(this.state.googleLoginData!==undefined){
                axios.post('/consumers/login-with-google', {
                    "CLIENT_ID": '661662365752-lvjk2j5l5n8ip5d15h71u4j0052i4fmd.apps.googleusercontent.com',
                    "token": this.state.googleLoginData.tokenId
                })
                    .then(response => {
                        if(response.data.isExist){
                            NotificationManager.success(response.data._message, '', 3000);
                            this.props.loginGoogle(false, response)

                        }else{
                            NotificationManager.error(response.data._message, '', 3000);
                            this.props.loginGoogle(true, null)
                        }
                    })
                    .catch(err => {
                        console.error('err', err)
                        // NotificationManager.error(err.response!==undefined?err.response.data._error:'Error', '', 3000);
                    });
            }
        } )

    }

    onButtonClick = () => {
        this.props.history.push('/authentication/forgot-password');
        this.props.errorHandling(false,'');
    };

    onInputChange = (e) => {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    checkAuth = () => {
        if (this.props.authenticated) {
            if (this.props.redirectTo !== null) {
                this.props.history.push(this.props.redirectTo);
            } else if(sessionStorage.getItem('redirectTo')){
                let redirectTo = sessionStorage.getItem('redirectTo');
                sessionStorage.removeItem('redirectTo');
                this.props.history.push(redirectTo);
            } else {
                this.props.history.push('/');
            }
        }
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    };

    pageTitle = () => {
        return (
            <Helmet>
                <title>Sign in</title>
            </Helmet>
        )
    }

    getForm = () => {
        const hrefVal = "#";
        return (
            <div id="tab-1" className="tab-content custom-tab">
                <h3>Sign in <span>TicketLake</span></h3>
                {this.props.error ? <p style={{color: 'red'}}>{this.props.errorMessage}</p> : null}

                <div className="custom-form">
                    <form method="post" name="registerform" onSubmit={this.onFormSubmit}>
                        <label style={{marginBottom:'10px'}}>Email Address <span>*</span> </label>

                        <input name="email" type="email" placeholder="Email" value={this.state.email} required
                               onChange={this.onInputChange}/>

                        <label style={{marginBottom:'10px'}}>Password <span>*</span> </label>

                        <input name="password" type="password" placeholder="Password" value={this.state.password}
                               required
                               onChange={this.onInputChange}/>

                        <button type="submit" className="log-submit-btn" ><span>Log In</span>
                        </button>
                        <div style={{marginTop:'30px', display:'inline-block', width:'100%'}}>
                        <fieldset style={{border:'0px'}}>
                            <legend style={{fontSize:'12px'}}>Or</legend>
                        </fieldset>
                        </div>
                        <div style={{marginTop:'0px', display:'inline-block'}}>
                            <FacebookLogin
                                appId="818233918648935"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                                textButton=""
                            />
                            <GoogleLogin
                                clientId="661662365752-lvjk2j5l5n8ip5d15h71u4j0052i4fmd.apps.googleusercontent.com"
                                buttonText=""
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="my-google-button-class"
                                // cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="clearfix"/>
                    </form>
                    <div className="lost_password">
                        <a href={hrefVal} onClick={this.onButtonClick}>Forgot Password?</a>
                    </div>
                </div>
            </div>
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
                {this.pageTitle()}
                {this.checkAuth()}
                {this.getLoader()}
                {this.getForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        processing: state.user.processing,
        error: state.user.error,
        errorMessage: state.user.message,
        redirectTo: state.user.redirectTo
    }
};
const connectedComponent = connect(mapStateToProps, {login, errorHandling, loginFacebook, loginFacebookData, loginGoogle, loginGoogleData})(SignIn);
export default withRouter(connectedComponent);
