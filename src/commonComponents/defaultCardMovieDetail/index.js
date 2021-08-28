// Library
import React from "react";
import { Col } from "reactstrap";
// Components
import TwoShadedButtonBuy from "../twoShadedButtonBuy";
import TwoShadedButton from "../twoShadedButton";
import EllipsisText from "react-ellipsis-text";
// Constant
import { TITLE_SIZE } from "../../utils/config";
import moment from "moment";

class DefaultCardMovieDetail extends React.Component {
  /****************************** EVENT UTILS ****************************/

  //Rendering Event Banner, wishlist icon
  renderEventBanner = (props) => {
    const hrefVal = "#";
    return (
      <div className="geodir-category-img">
        <a
          href={hrefVal}
          onClick={() => {
            props.onClickWrp(props.data);
          }}
        >
          <img
            src={
              props.image
                ? props.image
                : window.location.origin + "/images/city/1.jpg"
            }
            alt={"img"}
          />
        </a>
        {props.buttonMaximumTicketPrice === 0 && (
          <span className={"free-tag"}>Free</span>
        )}
      </div>
    );
  };

  //Rendering Event Data ( Location & Event Dates
  renderEventData = (props) => {
    const { venueName, distance } = props;
    const hrefLink = "#";
    return (
      <div className="geodir-category-content-title fl-wrap">
        <div className="geodir-category-content-title-item">
          <h3 className="title-sin_map">
            <a
              href={hrefLink}
              onClick={() => {
                props.onClickWrp(props.data);
              }}
            >
              <EllipsisText
                text={props.cardTitle ? props.cardTitle : "Title"}
                length={TITLE_SIZE}
              />
            </a>
          </h3>

          <div className="geodir-category-location location fl-wrap">
            <div className="map-item">
              <img
                src={window.location.origin + "/images/icons/location-red.svg"}
                alt="location"
                style={{
                  verticalAlign: "sub",
                  width: "14px",
                  marginRight: "8px",
                  marginTop: "3px",
                }}
              />
              <span className={"date"}>
                <div>{venueName || "N/A"}</div>
                {distance && <div>{`${distance} KM`}</div>}
              </span>
            </div>
          </div>

          <div className="geodir-category-location date fl-wrap">
            <div className="map-item">
              <img
                src={window.location.origin + "/images/icons/time-red.svg"}
                alt="img"
                style={{
                  verticalAlign: "sub",
                  width: "14px",
                  marginRight: "8px",
                }}
              />
              <span className={"date"}>
                {props.startDate || props.endDate
                  ? moment(props.startDate).format("ll") +
                    " - " +
                    moment(props.endDate).format("ll")
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="geodir-category-short-desc">
            <span className="three-line-text">{props.description}</span>
          </div>
        </div>
      </div>
    );
  };

  //Footer Payment Buttons
  renderFooterButtons = (props) => {
    console.log("Movie details Card", props);
    let ticketPriceRange = `${
      props.buttonMaximumTicketPrice
        ? props.buttonMaximumTicketPrice === props.buttonMinimumTicketPrice
          ? `Buy Tickets from GHS${props.buttonMaximumTicketPrice}`
          : `Buy Tickets from GHS${props.buttonMinimumTicketPrice} - GHS${props.buttonMaximumTicketPrice}`
        : "Buy Tickets"
    }`;

    return (
      <div className="geodir-category-footer fl-wrap">
        {props.buttonVersion && props.buttonVersion === 2 ? (
          <TwoShadedButton
            buttonText={ticketPriceRange}
            buttonLink={props.buttonLink ? props.buttonLink : ""}
          />
        ) : (
          <TwoShadedButtonBuy
            buttonText={ticketPriceRange}
            buttonLink={props.buttonLink ? props.buttonLink : ""}
          />
        )}
      </div>
    );
  };

  /****************************** END ****************************/

  //Rendering Default Card Component
  render() {
    let props = this.props;

    return (
      <Col md={props.gridMd ? props.gridMd : 3} className={"defaultCard"}>
        <article
          className="geodir-category-listing fl-wrap"
          style={{
            boxShadow: "0px 0px 10px 0.1px #e6e2e2",
          }}
        >
          {this.renderEventBanner(props)}

          <div className="geodir-category-content fl-wrap title-sin_item">
            {this.renderEventData(props)}

            {this.renderFooterButtons(props)}
          </div>
        </article>
      </Col>
    );
  }
}

export default DefaultCardMovieDetail;
