// Library
import React, {Component} from 'react';
// Style
const bannerStyle = {
    background: '#ec1b23'
};

class MobileAppBanner extends Component {
    render() {
        return (
            <section className="color-bg hidden-section mobile-app-wrp">
                <div className="wave-bg wave-bg2" style={bannerStyle}/>
                <div className="container custom-container">
                    <div className="row" style={{position:'relative'}}>
                        <div className="col-md-6">
                            {/* */}
                            <div className="colomn-text  pad-top-column-text fl-wrap">
                                <div className="colomn-text-title">
                                    <h3>Get the app, Get your ticket</h3>
                                    <p className={"justify-text"}>
                                        Search millions of events and get real-time updates as new listings go live.
                                        Use interactive 3-D venue maps and see your seat view before you buy.
                                        Get alerts about your favorite events, artists, and venues.
                                    </p>
                                    <a href="https://apps.apple.com/us/app/ticketlake/id1496918851#?platform=iphone" className=" down-btn color3-bg"
                                       style={{background: '#FFE0E1', color: '#EC1C24'}} target={"_blank"}>
                                        <i className="fab fa-apple"/> Download for iPhone</a>
                                    <a href="https://play.google.com/store/apps/details?id=com.consumer.ticketlake&hl=en_US" className=" down-btn color3-bg"
                                       style={{background: '#FFE0E1', color: '#EC1C24'}} target={"_blank"}>
                                        <i className="fab fa-android"/> Download for Android</a>
                                </div>
                            </div>
                            {/*process-wrap   end*/}
                        </div>
                        <div className="col-md-6" style={{position:'absolute',right:'0px'}}>
                            <div className="images-collage-title">Share <span>Ticket</span></div>
                            <img alt={"Mobile-img"} src={window.location.origin + '/images/mobile.png'} style={{maxWidth:'101%'}}/>
                            <div className="collage-image-input">Search <i className="fa fa-search"/></div>
                            <div className="collage-image-btn color2-bg">Booking now</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MobileAppBanner;