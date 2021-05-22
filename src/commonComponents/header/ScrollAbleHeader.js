// Library
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

// Components
import HeaderNavMenu from '../headerNavMenu';
import {Dropdown, DropdownToggle} from 'reactstrap';

// Helper
import {nameSplitter} from '../../utils/common-utils';

// Logo
import Logo from '../logo';

//Header Search
import HeaderSearch from '../../commonComponents/headerSearch';

// Redux
import {logout, setEventsCountry} from '../../redux/user/user-actions';
import {setLanguage} from '../../redux/multilingual/multilingual-actions';

import ReactFlagsSelect from 'react-flags-select';

//import css module
import 'react-flags-select/css/react-flags-select.css';


class ScrollAbleHeader extends Component {
  state = {
      width: window.innerWidth,
      isVisible: false,
      scroll:false,
  };
  toggle = () => {
      this.setState({isVisible: !this.state.isVisible})
  };

  componentDidMount() {
      window.addEventListener("resize", this.resize.bind(this));
  }

  resize = () => {
      this.setState({width: window.innerWidth});
  };

  logoutUser = () => {
      this.setState({isVisible:false});
      localStorage.removeItem("googleLoacalData")
      localStorage.removeItem("fbLoacalData")
      this.props.logout();
  };



  handleCountrySelect = (countryCode) => {
      const reactFlags = require('../../utils/flag-countries');
      let eventsCountry = {
          label: reactFlags[countryCode],
          countryCode
      };
      this.props.setEventsCountry(eventsCountry);
  };

  renderCountrySelect = (countryClass) => {
      let {eventsCountry} = this.props;
      let {width} = this.state;
      let showSelectedLabel = Boolean(width >= 768);
      countryClass = width > 350 ? countryClass : '';
      return (

          <ReactFlagsSelect className={` box-wrp country-select ${countryClass}`}
                            searchable={true}
                            selectedSize={14}
                            optionsSize={14}
                            showSelectedLabel={showSelectedLabel}
                            defaultCountry={eventsCountry.countryCode} onSelect={this.handleCountrySelect}/>

      )
  };
  render() {
    let {activeUser} = this.props;
        let isMobile = Boolean(this.state.width <= 500);
        let hasImage = Boolean(activeUser && activeUser.profileImageKey && activeUser.profileImageKey.imageUrl);
    return(
      <div className="scrollable-header">
            <div className="header-top fl-wrap">
                <div className=" container">
                    <Logo
                        logoLink={'/'}
                        logoImage={window.location.origin + '/images/nav-logo.svg'}
                    />

                    <div className={"mobile-view-options mobile-view"}>
                        {
                            activeUser ?
                                <div className={"header-right-nav-wrp col-md-2"}>
                                    <div className="header-user-menu box-wrp">
                                        <Dropdown isOpen={this.state.isVisible} toggle={this.toggle}>
                                            <DropdownToggle
                                                tag="span"
                                                data-toggle="dropdown"
                                                className={"header-user-name header-dropdown"}
                                                id='headerNavUserMenu'
                                            >
                                            <span className="user-img-wrp">
                                                <img
                                                    src={hasImage ? activeUser.profileImageKey.imageUrl : '/images/default-dp.png'}
                                                    alt={''}/>
                                            </span>
                                                <span className="username-wrp">
                                                {nameSplitter(activeUser.name)}
                                            </span>
                                            </DropdownToggle>

                                            <ul className={`${this.state.isVisible ? 'hu-menu-vis' : ''}`}>
                                                <li>
                                                    <NavLink to="/user/profile" onClick={this.toggle}>
                                                        Profile
                                                    </NavLink>
                                                </li>
                                                 <li>
                                                    <NavLink to="/user/calendar-events" onClick={this.toggle}>
                                                        My Calendar
                                                    </NavLink>
                                                </li>}
                                                <li className={`${this.props.isScrollable ? "show-on-web" : "hide-on-web"}`}>
                                                    <NavLink to="user/wishlist" onClick={this.toggle}>
                                                        Wishlist
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/" onClick={this.logoutUser}>Sign Out</NavLink>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                    {this.renderCountrySelect(`mr-${isMobile ? '5' : '4'}`)}
                                    <div className={`show-reg-form modal-open hide-on-mobile box-wrp wishlist-box ${this.props.isScrollable ? "hide-on-web" : "show-on-web"}`}>
                                        <NavLink to="/user/wishlist">
                                    <span>
                                        <img src={'/images/heart.svg'} alt={''}/>
                                    </span>
                                            <span className="wishlist-text" style={{color: 'black'}}>Wishlist</span>
                                        </NavLink>
                                    </div>


                                </div>
                                :
                                <div className={"header-right-nav-wrp col-md-2"}>

                                    <div className="show-reg-form modal-open box-wrp wishlist-box">

                                        <NavLink key={2} to={"/authentication"}>
                                            <i className="fas fa-sign-in-alt"/> Sign in
                                        </NavLink>

                                    </div>
                                    {this.renderCountrySelect('mr-3')}


                                </div>
                        }
                    </div>

                    <div className="header-inner fl-wrap col-md-5 desktop-view">
                          <HeaderNavMenu/>
                    </div>
                    <HeaderSearch isScrollable={this.props.isScrollable}/>
                    <div className={"mobile-view-menu mobile-view"}>
                        <HeaderNavMenu/>
                    </div>
                    <div className={"actions-for-desktop-view desktop-view"}>
                        {
                            activeUser ?
                                <div className={"header-right-nav-wrp col-md-2"}>
                                    <div className="header-user-menu box-wrp">
                                        <Dropdown isOpen={this.state.isVisible} toggle={this.toggle}>
                                            <DropdownToggle
                                                tag="span"
                                                data-toggle="dropdown"
                                                className={"header-user-name header-dropdown"}
                                                id='headerNavUserMenu'
                                            >
                                                <span className="user-img-wrp">
                                                    <img
                                                        src={hasImage ? activeUser.profileImageKey.imageUrl : '/images/default-dp.png'}
                                                        alt={''}/>
                                                </span>
                                                <span className="username-wrp">
                                                    {nameSplitter(activeUser.name)}
                                                </span>
                                            </DropdownToggle>

                                            <ul className={`${this.state.isVisible ? 'hu-menu-vis' : ''}`}>
                                                <li>
                                                    <NavLink to="/user/profile" onClick={this.toggle}>
                                                        Profile
                                                    </NavLink>
                                                </li>
                                                {<li>
                                                    <NavLink to="/user/calendar-events" onClick={this.toggle}>
                                                        My Calendar
                                                    </NavLink>
                                                </li> }
                                                <li className={`${this.props.isScrollable ? "show-on-web" : "hide-on-web"}`}>
                                                    <NavLink to="/user/wishlist" onClick={this.toggle}>
                                                        Wishlist
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/" onClick={this.logoutUser}>Sign Out</NavLink>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                    {this.renderCountrySelect(`mr-${isMobile ? '5' : '4'}`)}
                                    <div className={`show-reg-form modal-open hide-on-mobile box-wrp wishlist-box ${this.props.isScrollable ? "hide-on-web" : "show-on-web"}`}>
                                        <NavLink to="/user/wishlist">
                                        <span>
                                            <img src={'/images/heart.svg'} alt={''}/>
                                        </span>
                                        <span className="wishlist-text" style={{color: 'black'}}>Wishlist</span>
                                        </NavLink>
                                    </div>
                                </div>
                                :
                                <div className={"header-right-nav-wrp col-md-2"}>

                                    <div className="show-reg-form modal-open box-wrp wishlist-box">

                                        <NavLink key={2} to={"/authentication"}>
                                            <i className="fas fa-sign-in-alt"/> Sign in
                                        </NavLink>

                                    </div>
                                    {this.renderCountrySelect('mr-3')}


                                </div>
                        }
                    </div>
                    {/*<div className="header-inner fl-wrap desktop-view">*/}
                    {/*    <div className="container">*/}
                    {/*        <HeaderNavMenu/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        activeUser: state.user.user,
        eventsCountry: state.user.eventsCountry,
        authenticated: state.user.authenticated,
        profileImage: state.user.profileImage,
        activeLanguage: state.multilingual.activeLanguage
    }
};

const connected = connect(mapStateToProps, {logout, setLanguage, setEventsCountry})(ScrollAbleHeader);
export default connected;