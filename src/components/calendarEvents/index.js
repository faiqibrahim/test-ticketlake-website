import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/calendarEvents/calendarStyle.css";
import moment from "moment";
import { NavLink, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getCalendarEvents } from "../../redux/user/user-actions";
import { connect } from "react-redux";

import { Modal, ModalBody } from "reactstrap";
import { getCardDates } from "../../utils/common-utils";

import AuthRoutes from "../../commonComponents/authRotes";

const localizer = momentLocalizer(moment);

class CalendarEvents extends React.Component {
  state = {
    openEventPopup: false,
    eventList: [],
    selectedEventData: null,
  };

  componentDidMount() {
    const fromDate = moment()
      .startOf("month")
      .toISOString();

    const endDate = moment()
      .endOf("month")
      .toISOString();

    const { getCalendarEvents } = this.props;
    getCalendarEvents(fromDate, endDate);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.userCalendarEventsData !== prevProps.userCalendarEventsData
    ) {
      this.setState({
        eventList: this.getEventData(this.props.userCalendarEventsData),
      });
    }
  }

  getEventData(calendarEvents) {
    return calendarEvents.map((event) => {
      const { eventStartTime, eventEndTime } = event.eventDateTimeSlot;

      return {
        start: new Date(eventStartTime),
        end: new Date(eventEndTime),
        title: event.eventTitle,
        allDay: false,
        eventData: event,
      };
    });
  }

  getBreadCrumbs = () => {
    return (
      <>
        <BreadcrumbsItem to="/user/profile">Profile</BreadcrumbsItem>
        <BreadcrumbsItem to="/user/calendar-events">
          My Calendar
        </BreadcrumbsItem>

        <div className="breadcrumbs-hero-buttom fl-wrap">
          <div className="breadcrumbs">
            <Breadcrumbs
              item={NavLink}
              finalItem={"span"}
              finalProps={{
                style: { color: "#EC1C24" },
              }}
            />
          </div>
        </div>
      </>
    );
  };

  openEventModal = (event) => {
    const { openEventPopup } = this.state;
    this.setState({
      openEventPopup: !openEventPopup,
      selectedEventData: event ? event.eventData : null,
    });
  };

  renderCalendarEventModal = () => {
    const { selectedEventData, openEventPopup } = this.state;
    if (!selectedEventData) return null;
    const {
      bannerImageKey,
      eventTitle,
      imageKey,
      categories,
      eventDateTimeSlot,
      venue,
      eventSlotId,
    } = selectedEventData;

    const buttonLink = `/buy-ticket/${eventSlotId}`;
    const { eventStartTime } = eventDateTimeSlot;
    return (
      <Modal
        isOpen={openEventPopup}
        toggle={() => this.openEventModal()}
        className={"modal-danger calender-event-modal"}
      >
        <button
          type="button"
          className="close calender-event-modal-close"
          onClick={() => this.openEventModal()}
          data-dismiss="calender-event-modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <ModalBody>
          <div className={"cl-event-wrp"}>
            <h5 className="modal-time-heading">
              {moment(eventStartTime).format("ddd, Do MMMM, YYYY")}
            </h5>
            <div className={"event-box-wrp"}>
              <div className={"banner-img-wrp"}>
                <img
                  className={"banner-img"}
                  alt="banner-img"
                  src={
                    (bannerImageKey && bannerImageKey.imageUrl) ||
                    (imageKey && imageKey.imageUrl)
                  }
                />
              </div>
              <div className={"event-detail-wrp"}>
                <span className={"heading-name"}>{eventTitle}</span>
                <span className={"event-category-name"}>
                  {categories &&
                    categories.map((category, i) => {
                      return (
                        <span key={i}>
                          {category.title}
                          {i === categories.length - 1
                            ? " "
                            : i === categories.length - 2
                            ? " & "
                            : ", "}
                        </span>
                      );
                    })}
                </span>
                <span className={"date"}>
                  {getCardDates(eventDateTimeSlot)}
                </span>
                <span className={"venue"}>{venue && venue.name}</span>
              </div>
              <div className={"buttons-wrp"}>
                <NavLink to={buttonLink} className={"Btn-url-link black"}>
                  View Tickets
                </NavLink>
                <NavLink
                  onClick={() =>
                    this.props.history.push(`/event/detail/${eventSlotId}`)
                  }
                  className={"Btn-url-link"}
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  render() {
    return (
      <AuthRoutes>
        <div id="wrapper" className="bg-white">
          <div className="my-calendar-wrp">
            <div className="container">
              <div className="content-wrp">
                <div className="page-title-wrp">
                  <h2 className="page-heading">My Calendar</h2>
                  <div className="calendar-breadcrumbs">
                    {this.getBreadCrumbs()}
                  </div>
                </div>
                <Calendar
                  className="calendar-events"
                  localizer={localizer}
                  events={this.state.eventList}
                  popup
                  views={["month", "week", "day"]}
                  onSelectEvent={(event) => this.openEventModal(event)}
                  onSelectslot={(event) => this.openEventModal(event)}
                  onNavigate={(event) => {
                    const fromDate = moment(event)
                      .startOf("month")
                      .toISOString();

                    const endDate = moment(event)
                      .endOf("month")
                      .toISOString();

                    const { getCalendarEvents } = this.props;
                    getCalendarEvents(fromDate, endDate);
                  }}
                />
              </div>
            </div>
          </div>
          {this.renderCalendarEventModal()}
        </div>
      </AuthRoutes>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userCalendarEventsData: state.user.userCalendarEvents,
  };
};

const connectedComponent = connect(
  mapStateToProps,
  { getCalendarEvents }
)(CalendarEvents);
export default withRouter(connectedComponent);
