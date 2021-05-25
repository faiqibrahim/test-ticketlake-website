// Library
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

// Components
import HeaderNavMenu from '../../commonComponents/headerNavMenu';
import {Dropdown, DropdownToggle} from 'reactstrap';

// Helper
import {nameSplitter} from '../../utils/common-utils';

// Logo
import Logo from '../../commonComponents/logo';

//Header Search
import HeaderSearch from '../../commonComponents/headerSearch';

// Redux
import {logout, setEventsCountry} from '../../redux/user/user-actions';
import {setLanguage} from '../../redux/multilingual/multilingual-actions';

import ReactFlagsSelect from 'react-flags-select';

//import css module
import 'react-flags-select/css/react-flags-select.css';
import ScrollAbleHeader from './ScrollAbleHeader'

class Header extends Component {


    state = {
        width: window.innerWidth,
        isVisible: false,
        scroll: false,
    };
    toggle = () => {
        this.setState({isVisible: !this.state.isVisible})
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        document.addEventListener('scroll', () => {
            const scroll = window.scrollY < 100;
            if (scroll) {
                this.setState({scroll: false})
            } else {
                this.setState({scroll: true})
            }
        });
    }

    resize = () => {
        this.setState({width: window.innerWidth});
    };

    logoutUser = () => {
        this.setState({isVisible: false});
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

            <ReactFlagsSelect className={`box-wrp country-select ${countryClass}`}
                              searchable={true}
                              selectedSize={14}
                              optionsSize={14}
                              showSelectedLabel={showSelectedLabel}
                              defaultCountry={eventsCountry.countryCode} onSelect={this.handleCountrySelect}/>

        )
    };

    render() {
        let {activeUser} = this.props;
        let hasImage = Boolean(activeUser && activeUser.profileImageKey && activeUser.profileImageKey.imageUrl);
        return (
            <>
                {
                    this.state.scroll ?
                        <ScrollAbleHeader isScrollable={this.state.scroll}/> :
                        <header className="main-header">
                            <div className="header-top fl-wrap">
                                <div className="container">
                                    <div className={"header-content-wrp"}>
                                        <div className={"header-content-wrp-top"}>
                                            <div className={"header-logo-column"}>
                                                <Logo
                                                    logoLink={'/'}
                                                    logoImage={window.location.origin + '/images/nav-logo.svg'}
                                                />
                                            </div>
                                            <div className={"header-search-column hide-on-mobileView"}>
                                                <HeaderSearch/>
                                            </div>
                                            <div className={"header-actions-column"}>
                                                {
                                                    activeUser ?
                                                        <>
                                                            <div className={"organiser-btn-wrp action-item"}>
                                                                <a href={"https://organizers.ticketlake.com/"}
                                                                   target="_blank" rel="noopener noreferrer" className={"become-an-organiser"}>
                                                                    Become an organiser
                                                                </a>
                                                            </div>
                                                            <div className="show-reg-form modal-open action-item hide-on-mobileView">
                                                                <NavLink to="/user/wishlist">
                                                                    <span className={"wishlist-icon"}>
                                                                        <img src={'/images/heart.svg'}
                                                                             alt={'Wishlist icon'}/>
                                                                    </span>
                                                                    <span className="wishlist-text"
                                                                          style={{color: 'black'}}>Wishlist</span>
                                                                </NavLink>
                                                            </div>
                                                            <div className="header-user-menu action-item ">
                                                                <Dropdown isOpen={this.state.isVisible}
                                                                          toggle={this.toggle}>
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
                                                                            <NavLink to="/user/profile"
                                                                                     onClick={this.toggle}>
                                                                                Profile
                                                                            </NavLink>
                                                                        </li>
                                                                        <li>
                                                                            <NavLink to="/user/calendar-events"
                                                                                     onClick={this.toggle}>
                                                                                My Calendar
                                                                            </NavLink>
                                                                        </li>
                                                                        <li className={"hide-on-web"}>
                                                                            <NavLink to="user/wishlist"
                                                                                     onClick={this.toggle}>
                                                                                Wishlist
                                                                            </NavLink>
                                                                        </li>
                                                                        <li>
                                                                            <NavLink to="/" onClick={this.logoutUser}>Sign
                                                                                Out</NavLink>
                                                                        </li>
                                                                    </ul>
                                                                </Dropdown>
                                                            </div>

                                                            {this.renderCountrySelect(`mr-0 action-item`)}

                                                        </>
                                                        :
                                                        <>
                                                            <div className={"organiser-btn-wrp action-item"}>
                                                                <a href={"https://organizers.ticketlake.com/"}
                                                                   target="_blank" rel="noopener noreferrer" className={"become-an-organiser"}>
                                                                    Become an organiser
                                                                </a>
                                                            </div>
                                                            <div
                                                                className="show-reg-form modal-open action-item">
                                                                <NavLink key={2} to={"/authentication"}>
                                                                    <i className="fas fa-sign-in-alt"/> <span className={"sign-in"}> Sign in </span>
                                                                </NavLink>
                                                            </div>
                                                            {this.renderCountrySelect('mr-0 action-item')}
                                                        </>



                                                }
                                            </div>
                                        </div>
                                        <div className={"header-content-wrp-bottom"}>
                                            <div className={"header-search-column view-on-mobileView"}>
                                                <HeaderSearch/>
                                            </div>
                                            <div className="header-inner header-nav-column ">
                                                <HeaderNavMenu/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                }
            </>
        );
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

const connected = connect(mapStateToProps, {logout, setLanguage, setEventsCountry})(Header);
export default connected;