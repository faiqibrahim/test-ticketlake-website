// Library
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select, { components } from "react-select";
// Component

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  resetRedux,
  saveFormData,
  updateUser,
  fetchUserProfile,
  saveBackUrl,
  getAllTickets,
} from "../../redux/user/user-actions";
import AuthRoutes from "../../commonComponents/authRotes";
import UserPagesContainer from "../../commonComponents/userPagesContainer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// Helpers
import {
  getCountries,
  getCities,
  formatCurrency,
} from "../../utils/common-utils";
// Css
import "./style.css";
import ReactPhoneInput from "react-phone-input-2";
import { Helmet } from "react-helmet";

const countries = [];
let cities = [];

class UserProfile extends Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    dateOfBirth: "",
    profileImageKey: {},
    selectedOptionCountry: "",
    selectedOptionCity: [],
  };

  constructor(props) {
    super(props);

    this.fetchCities = this.fetchCities.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  componentDidMount() {
    getCountries().forEach((data) => {
      countries.push({
        value: data,
        label: data,
      });
    });
    if (this.props.user) {
      let {
        name,
        email,
        phoneNumber,
        country,
        city,
        dateOfBirth,
      } = this.props.user;
      this.setState({
        name,
        email,
        phoneNumber,
        country,
        city,
        dateOfBirth,
      });
      cities = [];
      const citiesArr = [];
      getCities(country).forEach((data) => {
        citiesArr.push({
          label: data,
          value: data,
          link: country,
        });
      });
      this.setState({
        selectedOptionCountry: { label: country || 'Select Country', value: country|| null },
      });
      this.setState({ selectedOptionCity: { label: city || 'Select City', value: city || null } });
      cities = citiesArr;
    }

    this.props.fetchUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileImage) {
      this.setState({
        profileImageKey: nextProps.profileImage,
      });
    }
  }

  onSaveChanges = (e) => {
    e.preventDefault();
    this.props.resetRedux();
    const {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      profileImageKey,
    } = this.state;

    const preparingFormData = {
      name,
      email,
      phoneNumber,
      country: this.state.country
        ? this.state.country.value
          ? this.state.country.value
          : this.state.country
        : this.state.country,
      city: this.state.city
        ? this.state.city.value
          ? this.state.city.value
          : this.state.city
        : this.state.city,
      dateOfBirth: dateOfBirth,
      profileImageKey:
        typeof(profileImageKey) === "string" ? {} : profileImageKey,
    };

    this.props.saveFormData(preparingFormData);
    this.props.saveBackUrl("/user/profile");
    this.props.updateUser(
      (userState) => {
        this.props.history.push("/sign-up/verification", { ...userState });
      },
      () => {
        this.props.history.push("/user/profile");
      },
      (errorCB) => {
        console.error(errorCB);
      }
    );
  };

  pageTitle = () => {
    return (
      <Helmet>
        <title>Profile</title>
      </Helmet>
    );
  };

  fetchCities(e) {
    cities = [];
    const citiesArr = [];
    getCities(e.value).forEach((data) => {
      citiesArr.push({
        label: data,
        value: data,
        link: e.value,
      });
    });
    this.setState({ selectedOptionCountry: e });
    this.setState({ selectedOptionCity: [] });
    this.setState({ country: e });
    cities = citiesArr;
  }

  handleChange = (date) => {
    this.setState({
      dateOfBirth: date,
    });
  };

  setCity(e) {
    this.setState({ selectedOptionCity: e });
    this.setState({ city: e });
  }

  handlePhoneChange = (value) => {
    this.setState({ phoneNumber: value });
  };

  onInputChange = (e) => {
    let state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  _style = {
    paddingLeft: "20px",
    float: "left",
    border: " 1px solid #eee",
    backgroundColor: "#F2F3F8",
    width: "100%",
    padding: " 14px 20px 14px 20px",
    borderRadius: "6px",
    color: "#666",
    fontSize: "13px",
    WebkitAppearance: "none",
    textIndent: "20px",
    marginBottom: "0px",
  };

  getProfile = () => {
    const ValueContainer = ({ children, ...props }) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              <i
                className={
                  props.selectProps && props.selectProps.id === "country"
                    ? "fas fa-flag"
                    : "fas fa-city"
                }
                aria-hidden="true"
                style={{ position: "absolute", left: 10, color: "#c6161d" }}
              />
            )}
            {children}
          </components.ValueContainer>
        )
      );
    };
    const styles = {
      valueContainer: (base) => ({
        ...base,
        paddingLeft: 34,
      }),
    };
    const required = (value) => {
      if (!value.toString().trim().length) {
        return <span className="error">Required</span>;
      }
    };

    return (
      <section className="middle-padding">
        <div className="container custom-container">
          <div className="dasboard-wrap fl-wrap">
            <div className="dashboard-content fl-wrap">
              <div className="box-widget-item-header">
                <h3> Your Profile</h3>
              </div>
              <div className="profile-edit-container">
                {this.props.error ? (
                  <p style={{ color: "red" }}>{this.props.error}</p>
                ) : null}

                <Form>
                  <div className="custom-form profile-form">
                    <label>
                      Name <i className="fa fa-user" />
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      validations={[required]}
                      onChange={this.onInputChange}
                      value={this.state.name}
                    />

                    <label>
                      Email
                      <i className="fa fa-envelope" />
                    </label>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      validations={[required]}
                      onChange={this.onInputChange}
                      value={this.state.email}
                    />

                    <label>
                      Phone Number
                      <i className="fa fa-phone" />
                    </label>
                    <div className={"profile-phone"}>
                      <ReactPhoneInput
                        required
                        countryCodeEditable={false}
                        country={this.state.defaultCountry}
                        value={this.state.phoneNumber}
                        onChange={this.handlePhoneChange}
                      />
                    </div>
                    <label>
                      {" "}
                      Country <i className="fas fa-city" />
                    </label>

                    <Select
                      validations={[required]}
                      id="country"
                      name="country"
                      className="react-select-container iconSelectDropDown"
                      classNamePrefix="react-select"
                      value={this.state.selectedOptionCountry}
                      placeholder="Select Country"
                      onChange={this.fetchCities}
                      options={countries}
                      components={{ ValueContainer }}
                      styles={styles}
                      // defaultMenuIsOpen={true}
                    />
                    <label>
                      {" "}
                      City <i className="fa fa-map-marker" />
                    </label>
                    <Select
                      validations={[required]}
                      id="city"
                      name="city"
                      className="react-select-container iconSelectDropDown"
                      classNamePrefix="react-select"
                      placeholder="Select City"
                      value={this.state.selectedOptionCity}
                      options={cities}
                      onChange={this.setCity}
                      components={{ ValueContainer }}
                      styles={styles}
                    />
                    <label>
                      {" "}
                      Date of Birth{" "}
                      <i
                        className="fa fa-calendar-alt"
                        style={{ zIndex: "1" }}
                      />
                    </label>
                    <DatePicker
                      popperClassName={"profile-datePicker"}
                      placeholderText={"Date of Birth"}
                      selected={
                        this.state.dateOfBirth
                          ? new Date(this.state.dateOfBirth)
                          : new Date()
                      }
                      onChange={this.handleChange}
                      customInput={<Input style={this._style} />}
                      maxDate={
                        new Date(
                          moment(new Date())
                            .subtract(0, "years")
                            .format()
                        )
                      }
                      minDate={
                        new Date(
                          moment(new Date())
                            .subtract(100, "years")
                            .format()
                        )
                      }
                      peekNextMonth
                      showMonthDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={15}
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="MMMM d, yyyy"
                    />
                  </div>
                </Form>
              </div>

              <div className="profile-edit-container">
                <div className="custom-form">
                  <button
                    className="btn color2-bg  float-btn"
                    onClick={this.onSaveChanges}
                  >
                    Save Changes
                    <i className="fa fa-save" />
                  </button>
                  <button
                    className={
                      "btn btn-danger buttonDefault defaultBackground custom-cancel-button"
                    }
                    onClick={() => window.location.reload()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  render() {
    const breadCrumbs = [];
    const { userWallet } = this.props;
    const { availableBalance, currency } = userWallet;
    breadCrumbs.push(
      <BreadcrumbsItem key={0} glyph="home" to="/">
        Home
      </BreadcrumbsItem>
    );
    breadCrumbs.push(
      <BreadcrumbsItem key={1} to="/user/profile">
        User Profile
      </BreadcrumbsItem>
    );

    let walletBalance = `${formatCurrency(availableBalance || 0.0, currency)}`;

    const { ticketPagination = {} } = this.props;
    const { myTicketsCount = 0 } = ticketPagination;

    return (
      <AuthRoutes>
        <div id="wrapper">
          {this.pageTitle()}
          <UserPagesContainer
            page={"profile"}
            showUploadButton={true}
            breadcrumbs={breadCrumbs}
            walletBalance={walletBalance}
            userTickets={myTicketsCount}
          >
            {this.getProfile()}
          </UserPagesContainer>
        </div>
      </AuthRoutes>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.authenticated,
    user: state.user.user,
    profileImage: state.user.profileImage,
    error: state.user.error,
    profileData: state.user.profileData,
    userWallet: state.user.userWallet,
    ticketPagination: state.user.ticketPagination,
  };
};
const connectedComponent = connect(mapStateToProps, {
  resetRedux,
  saveFormData,
  updateUser,
  fetchUserProfile,
  saveBackUrl,
  getAllTickets,
})(UserProfile);
export default withRouter(connectedComponent);
