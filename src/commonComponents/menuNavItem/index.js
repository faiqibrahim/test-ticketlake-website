// Library
import React, {Component} from 'react';
import {NavLink, Switch} from "react-router-dom";
import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, UncontrolledDropdown} from "reactstrap";
import { Route , withRouter} from 'react-router-dom';
import EventListing from '../../components/eventListingPage';
import Movies from "../../components/moviesPage/Movies";


class menuNavItem extends Component {
    redirectToEventListing=()=>{
        this.props.history.push("/events/listing")
    }


    render() {

    let mapSubmenu = [];
    let displaySubmenu = [];

    if (this.props.children.length>0) {
        this.props.children.map((item, i) => (
            mapSubmenu.push(
                <DropdownItem>
                    <NavLink to={'/events/listing/'+item._id}>{item.name}</NavLink>
                </DropdownItem>
                )
        ));

        displaySubmenu.push(<UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret onClick={this.redirectToEventListing}>
                {this.props.name}
            </DropdownToggle>
            <DropdownMenu right className="one p-0">
                {mapSubmenu}
            </DropdownMenu>
        </UncontrolledDropdown>);
    } else {
        displaySubmenu.push(
        <NavItem key={1}>
            <NavLink to={'/events/listing/'+this.props._id}>{this.props.name}</NavLink>
        </NavItem>);
    }
    return (
        <>
            <Route path="/events/listing" component={EventListing} />
            {displaySubmenu}
        </>

    );
    }
}


export default withRouter(menuNavItem);