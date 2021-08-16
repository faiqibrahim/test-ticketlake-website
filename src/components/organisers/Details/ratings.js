import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Rate } from "antd";
import classes from "./style.module.css";
import { NotificationManager } from "react-notifications";
import { saveReviewInDB } from "./api-handler";
import { setRedirectTo } from "../../../redux/user/user-actions";
class Ratings extends Component {
  state = {};

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveReview = async () => {
    const { _id, handleToggle } = this.props;
    const { rating, review } = this.state;
    try {
      await saveReviewInDB(_id, review, rating);
      NotificationManager.success("Rating and Review Posted Successfully");
      this.setState({ name: "", review: "", rating: "" });
      if (handleToggle) {
        handleToggle();
      }
    } catch (error) {
      NotificationManager.error("Rating and Review not posted. Try again");
    }
  };

  validateData = () => {
    const { rating, review, name } = this.state;
    if (!name) {
      NotificationManager.error("Name is Mandatory!");
    } else if (!review) {
      NotificationManager.error("Comment is Mandatory!");
    } else if (!rating) {
      NotificationManager.error("Rating is Mandatory!");
    } else {
      this.saveReview();
    }
  };

  checkUser = () => {
    const { authState } = this.props;
    if (!authState) {
      console.log(this.props.history.location.pathname);
      sessionStorage.setItem(
        "redirectTo",
        this.props.history.location.pathname
      );
      this.props.setRedirectTo(this.props.history.location.pathname);
      this.props.history.push("/authentication");
    } else {
      this.validateData();
    }
  };

  render() {
    const { rating, name, review } = this.state;
    console.log("state in review=,", this.state);
    return (
      <div className="container">
        <p className={classes.ratingheading}>Share your review and rating</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={this.onInputChange}
          name="name"
          className={classes.customInputname}
        />
        <textarea
          placeholder="Add a comment…"
          rows="10"
          value={review}
          name="review"
          onChange={this.onInputChange}
          className={classes.customTextArea}
        />
        <label
          className={`d-flex justify-content-center ${classes.customlabel}`}
        >
          <Rate
            allowHalf
            onChange={(e) => this.setState({ rating: e })}
            value={rating}
            defaultValue={rating}
          />
        </label>{" "}
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
