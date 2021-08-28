import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllTickets,
  logout,
  setProfilePic,
} from "../../redux/user/user-actions";
import { withRouter } from "react-router-dom";
import Loader from "../../commonComponents/loader";
import { NotificationManager } from "react-notifications";
import { NOTIFICATION_TIME } from "../../utils/common-utils";

class ProfileSidebar extends Component {
  componentDidMount() {
    this.props.getAllTickets("", "", "", 10, true);
  }

  state = {
    profilePictureProcessing: false,
    imageKey: "",
  };

  setProcessing = (processing, cb) => {
    if (processing) {
      this.setState({ profilePictureProcessing: processing }, cb);
    } else {
      setTimeout(() => {
        this.setState({ profilePictureProcessing: processing }, cb);
      }, 500);
    }
  };

  logoutUser = () => {
    this.props.logout(() => {
      this.props.history.push("/");
    });
  };

  onDrop = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];

      const MAX_FILE_SIZE = 50 * 1024 * 1024;

      if (file.size > MAX_FILE_SIZE) {
        let message = "Error occurred! File size exceeds the limit";
        NotificationManager.error(message, "", NOTIFICATION_TIME);
      } else {
        const formData = new FormData();
        formData.append("image", file);

        this.setProcessing(true);

        this.props.setProfilePic(formData, this.props.userToken);
      }
    }
  };

  convertNumberValue = (value) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(value)) >= 1.0e9
      ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(value));
  };

  getForm = () => {
    let { ticketPagination, wallet, profileImage } = this.props;
    const { currency, availableBalance } = wallet;
    let totalDocs;
    let filteredNumber = this.convertNumberValue(availableBalance);
    let walletBalance = availableBalance
      ? `${wallet.currency + filteredNumber}`
      : `${currency || ""} 0.00`;

    if (this.props.wishListInfo !== null) {
      totalDocs = this.props.wishListInfo.totalDocs;
    } else totalDocs = 0;

    const hrefLink = "#";
    return (
      <div className="dasboard-sidebar">
        <div className="dasboard-sidebar-content fl-wrap">
          <div className={"dashboard-info"}>
            <div className={"dashboard-avatar-wrp"}>
              <div className="dasboard-avatar">
                {this.props.profilePictureProcessing ? (
                  <Loader style={{ color: "white" }} />
                ) : (
                  <img
                    src={
                      profileImage && profileImage.imageUrl
                        ? profileImage.imageUrl
                        : "/images/default-dp.png"
                    }
                    alt="img"
                  />
                )}
              </div>
              <div className={"img-btn-wrp"}>
                <input
                  type={"file"}
                  ref={(uploadElement) => (this.uploadElement = uploadElement)}
                  accept={".jpg,.jpeg,.png"}
                  hidden
                  onChange={this.onDrop}
                  className={"upload-img"}
                />
                <a
                  href="dashboard-add-listing.html"
                  onClick={(e) => {
                    e.preventDefault();
                    this.uploadElement.click();
                  }}
                  className="ed-btn change-img-btn"
                >
                  Change image
                </a>
              </div>
            </div>
            <div className={"dashboard-info-wrp"}>
              <div className="dasboard-sidebar-item fl-wrap">
                <h3>
                  <span>Welcome </span>
                  {this.props.user ? this.props.user.name : "My Name"}
                </h3>
              </div>
            </div>
          </div>
          <div className="user-stats fl-wrap">
            <ul>
              <li>
                <span className={"user-stats-heading"}>Balance</span>
                <span className={"user-stats-value"}>{walletBalance}</span>
              </li>
              <li>
                <span className={"user-stats-heading"}>Tickets</span>
                <span className={"user-stats-value"}>
                  {ticketPagination && ticketPagination.totalDocs}
                </span>
              </li>
              <li>
                <span className={"user-stats-heading"}>Wishlist</span>
                <span className={"user-stats-value"}>{totalDocs}</span>
              </li>
            </ul>
          </div>
          <a
            href={hrefLink}
            className="log-out-btn"
            onClick={this.logoutUser}
            style={{ backgroundColor: "black", color: "#fff" }}
          >
            Log Out <i className="fa fa-sign-out-alt" />
          </a>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.getForm()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    allTickets: state.user.allTickets,
    user: state.user.user,
    profileImage: state.user.profileImage,
    userToken: state.user.token,
    processing: state.user.processing,
    wishListIds: state.wishlist.wishListIds,
    wishListInfo: state.wishlist.wishList,
    profilePictureProcessing: state.user.profilePictureProcessing,
    wallet: state.user.userWallet,
    ticketPagination: state.user.ticketPagination,
  };
};
const connectedComponent = connect(mapStateToProps, {
  setProfilePic,
  getAllTickets,
  logout,
})(ProfileSidebar);
export default withRouter(connectedComponent);
