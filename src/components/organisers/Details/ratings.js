import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Rate } from "antd";
import classes from "./style.module.css";
import { NotificationManager } from "react-notifications";
import { saveReviewInDB } from "./api-handler";
import { setRedirectTo } from "../../../redux/user/user-actions";

class Ratings extends Component {
  state = {
    errors: [],
    rating: 0,
    review: "",
    loader: true,
  };

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveReview = async () => {
    const { organisationId, handleToggle, fetchUpdatedData } = this.props;
    const { rating, review } = this.state;
    try {
      await saveReviewInDB(organisationId, review, rating);
      NotificationManager.success("Rating and Review Posted Successfully");
      this.setState({ review: "", rating: 0 });
      if (handleToggle) {
        handleToggle();
      }
      fetchUpdatedData();
    } catch (error) {
      NotificationManager.error("Rating and Review not posted. Try again");
    }
  };

  validateData = () => {
    const fields = [
      { name: "review", label: "Comment" },
      { name: "rating", label: "Rating" },
    ];

    let missingFields = [];
    fields.forEach((field) => {
      if (!this.state[field.name]) missingFields.push(field);
    });

    const errors = {};

    missingFields.forEach((field) => {
      errors[field.name] = `${field.label} is mandatory`;
    });

    if (missingFields.length === 0) {
      this.saveReview();
    }

    this.setState({ errors });
  };

  checkUser = () => {
    const { authState } = this.props;
    if (!authState) {
      sessionStorage.setItem(
        "redirectTo",
        this.props.history.location.pathname
      );
      sessionStorage.setItem("reviewsTab", true);
      sessionStorage.setItem("rating", this.state.rating);
      sessionStorage.setItem("review", this.state.review);
      this.props.setRedirectTo(this.props.history.location.pathname);
      this.props.history.push("/authentication");
    } else {
      this.validateData();
    }
  };

  componentDidMount() {
    const rating = sessionStorage.getItem("rating");
    const review = sessionStorage.getItem("review");
    if (rating || review) {
      this.setState({ rating, review });
      sessionStorage.removeItem("rating");
      sessionStorage.removeItem("review");
    }
  }

  render() {
    const { rating, review, errors } = this.state;

    return (
      <div className="container">
        <p className={classes.ratingheading}>Share your review and rating</p>
        <textarea
          placeholder="Add a comment…"
          rows="10"
          value={review}
          name="review"
          onChange={this.onInputChange}
          className={classes.customTextArea}
        />
        <span className="mb-2 red-color">{errors["review"]}</span>
        <label
          className={`d-flex justify-content-center ${classes.customlabel}`}
        >
          <Rate
            allowHalf
            onChange={(e) => this.setState({ rating: e })}
            value={rating}
            defaultValue={rating}
          />
        </label>
        <span className="red-color">{errors["rating"]}</span>
        <button onClick={this.checkUser} className={classes.postBtn}>
          Post
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.user.authenticated,
  };
};

const connectedComponent = connect(mapStateToProps, { setRedirectTo })(Ratings);

export default withRouter(connectedComponent);
