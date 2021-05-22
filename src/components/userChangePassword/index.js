// Library
import React, {Component} from 'react';
import {NotificationManager} from "react-notifications";
// Component

import AuthRoutes from '../../commonComponents/authRotes';
import UserPagesContainer from '../../commonComponents/userPagesContainer';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {changeConsumerPassword} from "../../redux/user/user-actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class ChangePassword extends Component {

    state = {
        existingPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    onSaveChanges = (e) => {
        e.preventDefault();
        if ((this.state.newPassword === '') || (this.state.confirmPassword === '') || (this.state.existingPassword === '')) {
            NotificationManager.error("Please fill in all the fields!", '', 3000);
        } else {
            if (this.state.newPassword === this.state.confirmPassword) {
                this.props.changeConsumerPassword(this.state.existingPassword, this.state.newPassword)
            } else {
                NotificationManager.error("New and Confirm Password Mismatch", '', 3000);
            }
        }
    };

    onInputChange = (e) => {
        let state = {...this.state};
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getInputs = () => {
        return (
            <section className="middle-padding">
                <div className="container custom-container">
                    <div className="dasboard-wrap fl-wrap">
                        <div className="dashboard-content fl-wrap">
                            <div className="box-widget-item-header">
                                <h3>Change Password</h3>
                            </div>
                            <div className="profile-edit-container">

                                <div className="custom-form">

                                    <label>Existing Password <span style={{color:'red'}}>*</span><i className="fa fa-key"/></label>
                                    <input type="password"
                                           placeholder="Existing Password"
                                           name="existingPassword"
                                           onChange={this.onInputChange}
                                           value={this.state.existingPassword}/>

                                    <label>New Password <span style={{color:'red'}}>*</span><i className="fa fa-key"/></label>
                                    <input type="password"
                                           placeholder="New Password"
                                           name="newPassword"
                                           onChange={this.onInputChange}
                                           value={this.state.newPassword}/>

                                    <label>Confirm Password <span style={{color:'red'}}>*</span><i className="fa fa-key"/></label>
                                    <input type="password"
                                           placeholder="Confirm Password"
                                           name="confirmPassword"
                                           onChange={this.onInputChange}
                                           value={this.state.confirmPassword}/>
                                </div>
                            </div>

                            <div className="profile-edit-container">
                                <div className="custom-form">
                                    <button className="btn color2-bg  float-btn" onClick={this.onSaveChanges}>Save
                                        Changes<i
                                            className="fa fa-save"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    };

    render() {
        const breadCrumbs = [];
        breadCrumbs.push(<BreadcrumbsItem glyph='home' to='/'>Home Page</BreadcrumbsItem>);
        breadCrumbs.push(<BreadcrumbsItem to='/user/change-password'>Change Password</BreadcrumbsItem>);
        return (
            <AuthRoutes>
                <div id="wrapper">
                    <div className="content">
                        <UserPagesContainer
                            page={'change-password'}
                            breadcrumbs={breadCrumbs}>
                            {this.getInputs()}
                        </UserPagesContainer>
                    </div>
                </div>
            </AuthRoutes>

        )
    }
}

const connectedComponent = connect(null, {changeConsumerPassword})(ChangePassword);
export default withRouter(connectedComponent);
