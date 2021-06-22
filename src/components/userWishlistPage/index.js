// Library
import React, {Component} from 'react';
// Component

import {withRouter} from "react-router-dom";
import DefaultCard from '../../commonComponents/defaultCard';
import UserPagesContainer from '../../commonComponents/userPagesContainer';
import Loader from "../../commonComponents/loader";
//redux
import {getWishlistEvents, getWishListIdsFromApi, wishListToggle} from '../../redux/wishlist/wishlist-actions';
import {connect} from "react-redux";
// Helpers
import {getMaxAndMinPrice, getCardDates} from '../../utils/common-utils';
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ReactPaginate from 'react-paginate';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";

let shareUrl = 'http://google.com/';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.totalPages,
            pageSize:0,
            page:1,
            processing: props.processing,
            wishList: props.wishList,
            activeModal: '',
            status: 'all',
        }
    }

    componentDidMount() {
        this.wishlistEvents()
    }

    wishlistEvents = () => {
        this.props.getWishlistEvents(
            true, //paginate 
            this.state.page, //page
            0, //skip
            6, //pageSize
            true, //all
        );
    };

    loadMorewishlistEvents = (e) => {
        this.setState(
            {page: e.selected + 1, wishList: this.props.wishList}, 
            () => { this.wishlistEvents() }
        );
    };

    wishListToggle = (eventSlotId) => {
        let page = this.state.page;
        if (this.props.auth) {
            this.props.wishListToggle(eventSlotId, true, '', page, () => {
                window.location.reload();
            });
        }
    };


    sharingSocial = (id) => {
        if (id) {
            this.setState({activeModal: id,});
        } else {
            this.setState({activeModal: ''});
        }
    };




    // Rendering Social Media Links
    renderSocialModal = (data, shareUrl) => {
        return (
            <Modal isOpen={this.state.activeModal === data._id} toggle={this.sharingSocial}
                   className={this.props.className + ' social-sharing-model'}>
                <ModalHeader toggle={this.sharingSocial}>{data.eventTitle}</ModalHeader>
                <ModalBody>
                    <h4>Share this event on:</h4>
                    <row className={"social-icons-wrp"}>
                        <FacebookShareButton url= {shareUrl} quote={data.eventTitle}
                                             className="Demo__some-network__share-button">
                            <FacebookIcon size={40} round/>
                        </FacebookShareButton>
                        <TwitterShareButton url= {shareUrl} title={data.eventTitle}
                                            className="Demo__some-network__share-button">
                            <TwitterIcon size={40} round/>
                        </TwitterShareButton>
                    </row>
                </ModalBody>
            </Modal>
        )
    };


    getFilters = () => {
        return (
                <div className="wishlist-filter-wrp">
                    <select name="status"
                            style={{width: '100%',padding:'0px 0px 0px 10px',height:'40px'}}
                            onChange={this.onStatusChange}
                            className="filterDropDowns chosen-select">
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
        )
    };

    onStatusChange = (e) => {
        let {target} = e;
        this.setState({status: target.value},() => {
            this.filterWishlistEvents();
        });
    };

    filterWishlistEvents = () => {
        const {status} = this.state;
        const {wishList} = this.props;
        if(!wishList || status === "all") return ;
        const filteredList =  [...wishList]
        if (status === "upcoming"){
            const upcomingEvents = filteredList.filter( event => event.eventDateTimeSlot.eventEndTime >= new Date().toISOString());
            this.setState({wishList: upcomingEvents});
        }else if (status === "expired") {
            const expiredEvents = filteredList.filter(event => event.eventDateTimeSlot.eventEndTime < new Date().toISOString());
            this.setState({wishList: expiredEvents});
        }

    };


    getWishList = () => {
        const {status, wishList:filteredWishList} = this.state;
        const {wishList} = this.props;
        const wishListEvents = status === "all" ? wishList : filteredWishList;
        return (
            <section className="middle-padding" style={{minHeight: '400px'}}>
                <div className="container custom-container">
                    <div className="dasboard-wrap fl-wrap">
                        <div className="dashboard-content fl-wrap">
                            <div className="box-widget-item-header wishlist-heading-wrp">
                                <h3 className={"wishlist-heading"}>My Wishlist</h3>
                                {this.getFilters()}
                            </div>

                            {
                                this.props.processing ?
                                    <Loader/> :
                                    <div className={"wishlist-box-wrp"}>
                                        {
                                            wishListEvents && wishListEvents.length > 0 ?
                                                <>
                                                    {
                                                        wishListEvents && wishListEvents.map(data => {
                                                            shareUrl = window.location.protocol + '//' + window.location.host + '/event/detail/' + data.eventSlotId;
                                                            return (
                                                                <>
                                                                    <DefaultCard key={1}
                                                                                 gridMd={4}
                                                                                 auth={this.props.auth}
                                                                                 cardTitle={data.eventTitle}
                                                                                 venueName={data.venue && data.venue.name}
                                                                                 image={data.bannerImageKey.imageUrl}
                                                                                 isWishList={true}
                                                                                 wishlistLink={() => this.wishListToggle(data.eventSlotId)}
                                                                                 cardLink={'#'}
                                                                                 cardAddress={data.venue ? data.venue.address : ''}
                                                                                 country={data.venue ? data.venue.country : []}
                                                                                 city={data.venue ? data.venue.city : []}
                                                                                 dates={getCardDates(data.eventDateTimeSlot)}
                                                                                 onClick={() => this.props.history.push(`/event/detail/${data.eventSlotId}`)}
                                                                                 buttonVersion={1}
                                                                                 buttonText={getMaxAndMinPrice(data)}
                                                                                 description={data.parentEventInfo && data.parentEventInfo.description}
                                                                                 buttonLink={`/buy-ticket/${data.eventSlotId}`}
                                                                                 sharing={this.sharingSocial}
                                                                                 id={data._id}

                                                                    />
                                                                    {this.renderSocialModal(data, shareUrl)}
                                                                </>

                                                            )
                                                        })
                                                    }
                                                </>:
                                                <div className={"Error-msg-wrp w100"}>
                                                    <div className={"Error-heading"}>Sorry, No Event Found.</div>
                                                    <span className={"Error-sub-heading"}>There are no liked events in your wishlist.</span>
                                                </div>
                                        }
                                    </div>

                            }
                            {this.props.totalPages > 1 ? (
                                    <ReactPaginate
                                        previousLabel={<i className="fa fa-angle-left"/>}
                                        nextLabel={<i className="fa fa-angle-right"/>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.props.totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={(data) => this.loadMorewishlistEvents(data)}
                                        containerClassName={'list-inline mx-auto justify-content-center pagination'}
                                        subContainerClassName={'list-inline-item pages pagination'}
                                        activeClassName={'active'}
                                    />
                                ) : null}
                        </div>
                    </div>
                </div>
            </section>
        )
    };

    render() {
        const breadCrumbs = [];
        breadCrumbs.push(<BreadcrumbsItem glyph='home' to='/'>Home Page</BreadcrumbsItem>);
        breadCrumbs.push(<BreadcrumbsItem to='/user/wishlist'>User Wishlist</BreadcrumbsItem>);

        return (

            <div id="wrapper">
                <div className="content">
                    <UserPagesContainer
                        page={'wishlist'}
                        breadcrumbs={breadCrumbs}>
                        {this.getWishList()}
                    </UserPagesContainer>
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        wishList: state.wishlist.wishList!==null ? state.wishlist.wishList.data : null,
        auth: state.user.authenticated,
        processing: state.wishlist.processing,
        wishListPage: state.wishlist.wishList!==null ? state.wishlist.wishList.page : 1,
        totalPages: state.wishlist.wishList!==null ? state.wishlist.wishList.totalPages : null
    }
};

const connectedComponent = connect(mapStateToProps, {
    getWishlistEvents,
    getWishListIdsFromApi,
    wishListToggle
})(Wishlist);
export default withRouter(connectedComponent);

