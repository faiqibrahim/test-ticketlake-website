// Library
import React from "react";
import { Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import BASE_SERVER from "../../utils/config";
import ToolTip from "../../commonComponents/toolTip";
import {
  ticketLakeFbLink,
  ticketLakeInstagramLink,
  ticketLakeTwitterLink,
  ticketLakeYoutubeLink,
  ticketLakeWhatsAppLink,
} from "../../utils/constant";
import { NavLink } from "react-router-dom";

// Components
import SubFooter from "../../commonComponents/subFooter";
import Axios from "axios";
import { getAllCategories } from "../../redux/category/category-actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const eventLimit = 7;

// Style
const imgStyle = {
  width: "42px",
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribeValue: "",
      isTooltipOpen: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories((categories) => {
      sessionStorage.setItem("categories", JSON.stringify(categories));
      this.setState({
        categories,
      });
    });
  }

  subscribeNowValue = (e) => {
    this.setState({
      subscribeValue: e.target.value,
    });
  };

  onToggleTooltip = () => {
    const { isTooltipOpen } = this.state;
    this.setState({ isTooltipOpen: !isTooltipOpen });
  };

  subscribeNow = (value) => {
    let subscribe_email = this.state.subscribeValue;
    if (value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(subscribe_email)) {
        Axios.get(
          `${BASE_SERVER}api/v1/subscriptions/subscribe-me/${subscribe_email}`
        )
          .then((response) => {
            NotificationManager.success(
              "You are successfully subscribed!",
              "",
              3000
            );
            this.setState({ subscribeValue: "" });
          })
          .catch((error) => {
            NotificationManager.error(error.response.data._error);
          });
      } else {
        NotificationManager.error("Invalid email!", "", 3000);
      }
    }
  };

  onNavClick = (item) => {
    let obj = {
      parentCategory: item,
      navLink: true,
    };
    sessionStorage.setItem("eventsListing", JSON.stringify(obj));
  };

  getEventBullets = () => {
    let categories = this.state.categories;
    let { selectedCategories } = this.props;
    let breadCrumbsState = [];

    return (
      categories &&
      categories.map((item, i) => {
        if (i < eventLimit) {
          selectedCategories = selectedCategories.filter(
            (category) => category.title === item.name
          );
          let link = `/events/listing`;

          if (selectedCategories && selectedCategories.length) {
            link = selectedCategories[0].link;
            breadCrumbsState.push({
              category: item,
              url: `${link}/?id=${item._id}`,
              mainLink: link,
            });
          }
          let pathName = `${link}/?id=${item._id}`;

          return (
            <li key={i}>
              <NavLink
                className={"footer-link-style"}
                to={{
                  pathname: pathName,
                  state: {
                    parentCategory: item,
                    breadCrumbs: breadCrumbsState,
                    navLink: true,
                  },
                }}
                onClick={() => this.onNavClick(item)}
              >
                {item.name}
              </NavLink>
            </li>
          );
        } else return null;
      })
    );
  };

  render() {
    const { isTooltipOpen } = this.state;
      return (
      <footer className="main-footer" id="main-footer">
        <div className="footer-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xl-3" span={8}>
                <div className="footer-widget fl-wrap">
                  <h3>Ticketlake</h3>
                  <div className="pull-left color-white">
                    <p className={"footer-text"}>
                      Ticketlake is an amazing platform to help users purchase
                      tickets globally with great range of coupons and
                      promotions
                    </p>
                  </div>
                </div>
                <ul className="footer-contacts fl-wrap footer-second-widget">
                  <li>
                    <a href={"mailto:info@ticketlake.com"}>info@ticketlake.com</a>
                  </li>
                  <li>
                    Odotei Tsui Avenue, Dzorwulu (GA-121-9846) - Accra, Ghana
                  </li>
                  <li>
                    <span>
                      +233 (0) 30 296 3020 | +233 (0) 55 252 0555
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="col-md-4 col-lg-4 col-xl-2 offset-xl-1"
                span={5}
                style={{ marginBottom: "17px" }}
              >
                <div className="footer-widget fl-wrap">
                  <h3>Explore</h3>
                  <div className="pull-left color-white">
                    <ul className="footer-contacts-custom">
                      <li><a
                          title="About Us"
                          href="/about-us"
                          className={"footer-link-style"}
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                            title="Contact Us"
                            href="/contact-us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={"footer-link-style"}
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          title="Event Organisers"
                          href="/organisers"
                          className={"footer-link-style"}
                        >
                          Event Organisers
                        </a>
                      </li>
                      <li>
                        <a
                          title="Publish an Event"
                          href="https://admin.qa.ticketlake.com/event-organiser"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={"footer-link-style"}
                        >
                          Publish an Event
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 col-lg-4 col-xl-2 offset-xl-1"
                span={5}
                style={{ marginBottom: "17px" }}
              >
                <div className="footer-widget fl-wrap">
                  <h3>Events</h3>
                </div>
                <div className="pull-left color-white">
                  <ul className="footer-contacts-custom">
                    {this.getEventBullets()}
                  </ul>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-3" span={6}>
                <div className="footer-widget fl-wrap">
                  <h3>Social Media</h3>
                </div>

                <div className="footer-social-btns">
                  <ul>
                    <li>
                      <a
                        href={ticketLakeFbLink}
                        className={"social-media-style"}
                        target={"_blank"}
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <img
                        src={"/images/socialMedia/instagram.svg"}
                        className={"pointer"}
                        onClick={() => window.open(ticketLakeInstagramLink)}
                        alt="Instagram"
                        style={imgStyle}
                      />
                    </li>
                    <li>
                      <a
                        href={ticketLakeTwitterLink}
                        className={"social-media-style"}
                        target={"_blank"}
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <img
                        src={"/images/socialMedia/Youtube.svg"}
                        className={"pointer"}
                        onClick={() => window.open(ticketLakeYoutubeLink)}
                        alt="Youtube"
                        style={imgStyle}
                      />
                    </li>
                    <li>
                      <img
                        src={"/images/socialMedia/whatsapp-1.svg"}
                        className={"pointer"}
                        id="footerPageIcon"
                        alt="WhatsApp"
                        onClick={() => window.open(ticketLakeWhatsAppLink)}
                        style={imgStyle}
                      />
                      <ToolTip
                        isOpen={isTooltipOpen}
                        target={"footerPageIcon"}
                        toggle={this.onToggleTooltip}
                        value={"Chat With us"}
                      />
                    </li>
                  </ul>
                </div>

                <div className="footer-widget fl-wrap">
                  <h3 style={{ marginTop: "60px" }}>Subscribe</h3>
                </div>
                <div className="subscribe-form">
                  <Input
                    value={this.state.subscribeValue}
                    type="email"
                    name="email"
                    id="examplePassword"
                    placeholder="Enter your email"
                    onChange={(value) => this.subscribeNowValue(value)}
                    className="autocomplete-input"
                  />
                  <button
                    onClick={this.subscribeNow}
                    className="color2-bg subscribe-btn"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SubFooter />
      </footer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategories: (cb) => dispatch(getAllCategories(cb, "v2")),
  };
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    selectedCategories: state.category.selectedCategories,
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
export default withRouter(connected);
