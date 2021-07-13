// Library
import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Table
} from 'reactstrap';

// Component

import {withRouter} from "react-router-dom";
import TableHead from '../../commonComponents/tableHead';
import AuthRoutes from '../../commonComponents/authRotes';
import { getDateAndTimeFromIso } from "../../utils/common-utils";
import Loader from "../../commonComponents/loader";
import UserPagesContainer from '../../commonComponents/userPagesContainer';
//redux
import {getAllTickets, setProcessing} from '../../redux/user/user-actions';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";

import {getStateObjForUrl} from './ticketHelper';
import localAxios from 'axios';
import {FILE_URL} from "../../utils/config";
import store from "../../redux/store";
import {Helmet} from "react-helmet";

const header = ["SR#", "Name", "Event", "Status", "Type | Class", "Event Date", "Action"];
const spanStyle = {
    color: "#EC1C24",
    cursor: "pointer"
};

let page = '1';
let pageSize = '10';

class Tickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticket: '',
            status: 'Upcoming',
            activeModal: "",
        };
    }

    toggle(id) {
        if (id) {
            this.setState({activeModal: id});
        } else {

            this.setState({activeModal: ''});
        }
    }

    componentDidMount() {
        // document.title = "Ticket Lake - User Tickets";
        this.props.getAllTickets('', '', page, 10, true);
    }

    onTicketChange = (e) => {
        let {target} = e;
        let state = {...this.state};
        state[target.name] = target.value;
        this.setState(state);
        this.getChangeFilters(state);
    };

    pageTitle = () => {
        return (
            <Helmet>
                <title>Tickets</title>
            </Helmet>
        )
    }



    getChangeFilters = (state) => {
        if (state.ticket === "My Tickets" && state.status === "Upcoming") {
            this.props.getAllTickets(true, true, 1, 10, true)
        }
        if (state.ticket === "My Tickets" && state.status === "Expired") {
            this.props.getAllTickets(true, false, 1, 10, true)
        }

        if (state.ticket === "Guest Tickets" && state.status === "Upcoming") {
            this.props.getAllTickets(false, true, 1, 10, true)
        }

        if (state.ticket === "Guest Tickets" && state.status === "Expired") {
            this.props.getAllTickets(false, false, 1, 10, true)
        }

        if (state.ticket === "All") {
            this.props.getAllTickets('', '', 1, 10, true)
        }

        if (state.ticket === "All" && state.status === "Upcoming") {
            this.props.getAllTickets('', '', 1, 10, true)
        }

        if (state.ticket === "All" && state.status === "Expired") {
            this.props.getAllTickets('', false, 1, 10, true)
        }
    };

    onStatusChange = (e) => {
        let {target} = e;
        let state = {...this.state};
        state[target.name] = target.value;
        this.setState(state);
        this.getStatusFilters(state);
    };

    getStatusFilters = (state) => {
        this.setState({allTickets: []});
        if (state.status === "Upcoming" && state.ticket === '') {
            this.props.getAllTickets('', true, 1, 10, true)
        }
        if (state.status === "Upcoming" && state.ticket === "My Tickets") {
            this.props.getAllTickets(true, true, 1, 10, true)
        }
        if (state.status === "Upcoming" && state.ticket === "Guest Tickets") {
            this.props.getAllTickets(false, true, 1, 10, true)
        }

        if (state.status === "Expired" && state.ticket === "Guest Tickets") {
            this.props.getAllTickets(false, false, 1, 10, true)
        }

        if (state.status === "Expired") {
            this.props.getAllTickets('', false, 1, 10, true)
        }

        if (state.status === "Upcoming" && state.ticket === "All") {
            this.props.getAllTickets('', true, 1, 10, true)
        }

        if (state.status === "Expired" && state.ticket === "All") {
            this.props.getAllTickets('', false, 1, 10, true)
        }
    };

    loadMoreTickets = (e) => {
        e.preventDefault();
        let getStateObj = {};

        if (this.props.ticketPagination && this.props.ticketPagination.hasNextPage === true) {
            if (this.props.ticketPagination.page) {
                page = this.props.ticketPagination.page + 1
            }
        }

        getStateObj = getStateObjForUrl(this.state);

        this.props.getAllTickets(
            getStateObj.self, //self
            getStateObj.status, //status
            page, //page
            pageSize, //pageSize
            false // resetTicket
        )

    };

    getFilters = () => {
        return (
            <div className={'row justify-content-end'}>
                <div className="col-lg-4 col-md-12 offset-lg-3" style={{marginTop: '27px'}}>
                    <select name="ticket"
                            defaultValue={"All"}
                            style={{width: '100%',padding:'0px 0px 0px 10px',height:'40px'}}
                            onChange={this.onTicketChange}
                            className="filterDropDowns chosen-select">
                        <option value={"All"}>All Tickets</option>
                        <option>My Tickets</option>
                        <option>Guest Tickets</option>
                    </select>
                </div>
                <div className="col-lg-4 col-md-12" style={{marginTop: '27px'}}>
                    <select name="status"
                            style={{width: '100%',padding:'0px 0px 0px 10px',height:'40px'}}
                            onChange={this.onStatusChange}
                            className="filterDropDowns chosen-select">
                        <option>Upcoming</option>
                        <option>Expired</option>
                    </select>
                </div>

            </div>
        )
    };

    handlePreviewDownload = (data, isPreview = false) => {
        let options = {
            headers: {
                'X-Auth': store.getState().user.token
            },
            responseType: 'blob'
        };
        let {dispatch} = store;
        dispatch(setProcessing(true));
        localAxios.get(`${FILE_URL}api/v1/tickets/get-ticket-pdf/${data._id}`, options)
            .then(res => {
                dispatch(setProcessing(false));
                if (!isPreview) {
                    let fileName = data.eventInfo.eventTitle + "-" + data._id;
                    const url = window.URL.createObjectURL(res.data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                } else {
                    let blob = new Blob([res.data], {type: 'application/pdf'});
                    let pdf = URL.createObjectURL(blob);
                    window.open(pdf, "_blank");
                }
            }).catch(err => {
            dispatch(setProcessing(false));
            console.error(err);
        })
    };

    getData = () => {
        return (
            <>
                {
                    Array.isArray(this.props.allTickets) && this.props.allTickets.length === 0 ?
                        <tbody>
                        <tr>
                            <td colSpan={7}>No Ticket Purchase</td>
                        </tr>
                        </tbody>
                        :
                        Array.isArray(this.props.allTickets) && this.props.allTickets.map((data, i) => {
                            return (
                                <tbody key={i} style={{textAlign: 'left'}}>
                                <tr key={i}>
                                    <td>
                                        {++i}
                                    </td>
                                    <td>
                                        {data.purchaseDetails.name}
                                    </td>
                                    <td>
                                        {data.eventInfo.eventTitle}
                                    </td>
                                    <td>
                                        {
                                            data.ticketStatus === 'VALID' ?
                                                <span className={'badge badge-success'}
                                                      style={{fontSize: '12px'}}>{data.ticketStatus}</span>
                                                : data.ticketStatus === 'REFUNDED' ?
                                                <span className={'badge badge-warning'}
                                                      style={{fontSize: '12px'}}>{data.ticketStatus}</span> :
                                                <span className={'badge badge-danger'}
                                                      style={{fontSize: '12px'}}>{data.ticketStatus}</span>
                                        }
                                    </td>
                                    <td>
                                        {data.type} {data.ticketClassInfo.ticketClassName ? "|" : ''} {data.ticketClassInfo.ticketClassName}
                                    </td>
                                    <td>
                                        {getDateAndTimeFromIso(data.eventInfo && data.eventInfo.eventDateTimeSlot ? data.eventInfo.eventDateTimeSlot.eventStartTime : 'Invalid Date')}
                                    </td>
                                    <td>
                                        <span style={spanStyle}
                                              onClick={() => this.handlePreviewDownload(data, true)}>Preview</span>
                                        <span style={{color: "#EC1C24", padding: "0px 4px"}}>|</span>
                                        <span style={spanStyle}
                                              onClick={() => this.handlePreviewDownload(data)}>Download</span>
                                    </td>

                                </tr>

                                </tbody>
                            )
                        })
                }
            </>
        )
    };

    getTicket = (guestTicketsCount,myTicketsCount) => {
        const hrefVal = "#";
        return (
            <section className="middle-padding">
                <div className="container custom-container">
                    <div className="dasboard-wrap fl-wrap">
                        <div className="dashboard-content fl-wrap">
                            <div className="box-widget-item-header">
                                <h3 style={{color: 'black'}}>Tickets</h3>
                            </div>

                            <div className="list-single-facts fl-wrap">
                                <div className="inline-facts-wrap text-left profile-tic-box">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                My Tickets
                                            </div>
                                        </div>
                                        <br/>
                                        <h4 style={{marginBottom:'0px'}}>{myTicketsCount}</h4>
                                    </div>
                                </div>

                                <div className="inline-facts-wrap text-left profile-tic-box">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                Guest Tickets
                                            </div>
                                        </div>
                                        <br/>
                                        <h4 style={{marginBottom:'0px'}}>{guestTicketsCount}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="list-single-facts fl-wrap" style={{backgroundColor: 'transparent'}}>
                                <div className="box-widget-item-header">
                                    <div className={"row"}>
                                        <div className={"col-lg-4 col-md-12"}>
                                            <h3 style={{marginTop: '14%', color: 'black'}}>Purchased Tickets</h3>
                                        </div>
                                        <div className={"col-lg-6 col-md-12 offset-lg-2"}>
                                            {this.getFilters()}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Table responsive className={'customTable'}>
                                <thead>
                                <TableHead>
                                    {header}
                                </TableHead>
                                </thead>
                                {
                                    this.props.processing ?
                                        <tbody style={{textAlign: 'left'}}>
                                        <tr>
                                            <td colSpan={7}><Loader/></td>
                                        </tr>
                                        </tbody> :
                                        this.getData()
                                }
                            </Table>
                            {
                                this.props.ticketPagination && this.props.ticketPagination.hasNextPage === true ?
                                    <a className="load-more-button load-more-button-light" href={hrefVal}
                                       onClick={(e) => this.loadMoreTickets(e)}>Load more
                                        {
                                            this.props.paginateProcessing ?
                                                <i className="fas fa-spinner"/> : null
                                        }
                                    </a> : null
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    };

    render() {
        const breadCrumbs = [];
        breadCrumbs.push(<BreadcrumbsItem glyph='home' to='/' key={1}>Home Page</BreadcrumbsItem>);
        breadCrumbs.push(<BreadcrumbsItem to='/user/ticket' key={2}>User Ticket</BreadcrumbsItem>);
        const { ticketPagination = {} } = this.props;
        const { guestTicketsCount = 0, myTicketsCount = 0 } = ticketPagination;

        return (
            <AuthRoutes>

                    <div id="wrapper">
                        {this.pageTitle()}
                        <UserPagesContainer
                            page={'ticket'}
                            breadcrumbs={breadCrumbs}
                            userTickets={myTicketsCount}
                        >
                            {this.getTicket(guestTicketsCount,myTicketsCount)}

                        </UserPagesContainer>
                    </div>

            </AuthRoutes>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTickets: state.user.allTickets,
        processing: state.user.processing,
        ticketPagination: state.user.ticketPagination,
        paginateProcessing: state.user.paginateProcessing
    }
};


const connectedComponent = connect(mapStateToProps, {getAllTickets})(Tickets);
export default withRouter(connectedComponent);
