import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Transition from '../../commonComponents/transition';
import SignIn from '../signInPage';
import SignUp from '../signUpPage';
import {loginFacebook, loginGoogle} from '../../redux/user/user-actions';
class Authentication extends Component {

    state = {
        signIn: true,
        activeFacebookUser:false,
        activeGoogleUser:false
    };

    showSignIn = () => {
        this.setState({signIn: true});

    };
    componentDidMount(){
        localStorage.removeItem("googleLoacalData")
        localStorage.removeItem("fbLoacalData")
        this.setState({activeFacebookUser: this.props.user!==undefined?this.props.user.activeFacebookUser:false});
        // this.setState({activeGoogleUser: this.props.user!==undefined?this.props.user.activeGoogleUser:false});

    }
    componentDidUpdate(prevProps, prevState) {

        if(prevProps.activeFacebookUser!==this.props.activeFacebookUser || prevProps.activeGoogleUser!==this.props.activeGoogleUser){
            if(this.props.activeFacebookUser===true){
                this.setState({signIn: this.props.activeFacebookUser});
            }else{
                this.setState({signIn: this.props.activeGoogleUser});
            }
            this.showRegister()
          }
      }
    showRegister = () => {
        this.setState({signIn: false});
    };

    getForm = () => this.state.signIn ? <SignIn/> : <SignUp/>;

    getFormNav = () => {
        const hrefLink = '#';
        return (
            <ul className="tabs-menu">
                <li className={this.state.signIn ? 'current' : ''} onClick={this.showSignIn}>
                    <a href={hrefLink}>
                    <i className="fa fa-sign-in-alt fontawesome-fam"/> Login
                    </a>
                </li>
                <li className={this.state.signIn ? '' : 'current'} onClick={this.showRegister}><a href={hrefLink}>
                    <i className="fa fa-user-plus"/> Register</a></li>
            </ul>
        );
    };

    render() {
        return (

                            
            <Transition>
                
                <div className="main-register-wrap modal authentication-bg">
                    <div className="reg-overlay"/>
                    <div className="main-register-holder">
                        <div className="main-register fl-wrap">
                            <div className="close-reg color-bg" onClick={() => this.props.history.push('/')}><i
                                className="fa fa-times"/></div>
                            {this.getFormNav()}
                            <div id="tabs-container">
                                <div className="tab">
                                    {this.getForm()}
                                    {/* {this.props.activeFacebookUser} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        )
    }
}

// export default Authentication;
const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        activeFacebookUser: state.user.activeFacebookUser,
        activeGoogleUser:state.user.activeGoogleUser
    }
};
const connectedComponent = connect(mapStateToProps, {loginFacebook, loginGoogle})(Authentication);
export default withRouter(connectedComponent);