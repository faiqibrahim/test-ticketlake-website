// Library
import React, {Component} from 'react';
import MapContainer from "../../commonComponents/googleMapComponent";
// Component
import ToolTip from '../../commonComponents/toolTip';
import {ticketLakeFbLink, ticketLakeInstagramLink, ticketLakeTwitterLink, ticketLakeYoutubeLink} from '../../utils/constant';

const imgStyle = {
    width: '37px'
};

class ContactUsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTooltipOpen: false
        }
    }

    onToggleTooltip = () => {
        const {isTooltipOpen} = this.state;
        this.setState({isTooltipOpen: !isTooltipOpen});
    };

    render() {
        const {isTooltipOpen} = this.state;
        const hrefLink = "#";
        return (
                <div id="wrapper">
                    {/* content*/}
                    <div className="content">
                        {/* map-view-wrap */}
                        <div className="map-view-wrap">
                            <div className="container custom-container">
                                <div className="map-view-wrap_item">
                                    <div className="list-single-main-item-title fl-wrap">
                                        <h3 className={"contact-us-heading"}>Contact</h3>
                                    </div>
                                    <div className="box-widget-list mar-top">
                                        <ul>
                                            <li><span><i className="fa fa-map-marker"/> Address :</span>
                                                <a href={hrefLink}>
                                                    Odotei Tsui Avenue, Dzorwulu (GA-121-9846) - Accra, Ghana
                                                </a>
                                            </li>
                                            <li><span><i className="fa fa-phone"/> Phone :</span> <a
                                                href={hrefLink}>+233 (0) 30 296 3020 | +233 (0) 55 252 0555</a></li>
                                            <li><span><i className="fa fa-envelope"/> Mail :</span> <a
                                                href={hrefLink}>info@ticketlake.com</a></li>
                                        </ul>
                                    </div>
                                    <div className="list-widget-social">
                                        <ul>
                                            <li><a href={ticketLakeFbLink}
                                                   target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"/></a></li>
                                            <li>
                                                <img src={'/images/socialMedia/instagram-1.svg'}
                                                     className={'pointer'}
                                                     onClick={() => window.open(ticketLakeInstagramLink)}
                                                     alt="Instagram"
                                                     style={imgStyle}/>
                                            </li>
                                            <li><a href={ticketLakeTwitterLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"/></a></li>
                                            <li>
                                                <img src={'/images/socialMedia/Youtube-1.svg'}
                                                     className={'pointer'}
                                                     onClick={() => window.open(ticketLakeYoutubeLink)}
                                                     alt="Youtube"
                                                     style={imgStyle}/>
                                            </li>
                                            <li>
                                                <img src={'/images/socialMedia/whatsapp.svg'}
                                                     className={'pointer'}
                                                     id="contactPageIcon"
                                                     alt="WhatsApp"
                                                     style={imgStyle}/>
                                                <ToolTip isOpen={isTooltipOpen}
                                                         target={'contactPageIcon'}
                                                         toggle={this.onToggleTooltip}
                                                         value={'+233 552 520 555'}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*map-view-wrap end */}
                        {/* Map */}
                        <div className="">

                            <div className="box-widget"
                                 style={{minHeight: '510px'}}>
                                <div className="box-widget-content"
                                     style={{
                                         minHeight: '510px',
                                         padding: 'unset'
                                     }}>
                                    <MapContainer
                                        width={"100%"}
                                        latitude={7.9528}
                                        longitude={-1.0307}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* content end*/}
                </div>
        );
    }
}

export default ContactUsPage;