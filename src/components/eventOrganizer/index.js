// Library
import React, {Component} from 'react';

// Component
import HeroBanner from '../../commonComponents/heroBanner';
import {withRouter} from "react-router-dom";

class EventOrganizer extends Component {

    openPage = () => {
        window.location = "https://admin.qa.ticketlake.com/event-organiser";
    };

    render() {
        return (
            <div className="explore-events-wrp">
                <HeroBanner
                    backgroundImage={window.location.origin + '/images/upcoming_events.png'}
                    transformStyle={'translateZ(0px) translateY(-38.1485px)'}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="colomn-text fl-wrap pad-top-column-text_s">
                                    <div className="colomn-text-title">
                                        <h3>Are you an event Organizer?</h3>
                                        <p>Ticketlake is tailor-made for you! Register with us today and get your events on our platform and instantly reach a wider audience never before possible!</p>
                                        <div onClick={() => this.openPage()}
                                             style={{cursor: 'pointer'}}
                                             className={'btn color-bg float-btn float-unset btn-new '}>
                                            Publish your events
                                            <i className={'fa fa-caret-right'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </HeroBanner>
            </div>
        );
    }
}

export default withRouter(EventOrganizer);