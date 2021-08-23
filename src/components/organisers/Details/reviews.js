import React, { Component } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Modal, ModalBody } from "reactstrap";
import classes from "./style.module.css";
import Ratings from "./ratings";
import AuthRotes from "../../../commonComponents/authRotes";

class Reviews extends Component {
  state = { isOpen: false, isReviewBtnHidden: false };

  toggle = () => {
    let { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }
  onScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target.scrollingElement;
    const currentScrollLevel = scrollTop + clientHeight;

    const footerElementHeightElement = document.querySelector("#main-footer");
    if (footerElementHeightElement) {
      this.setState({
        isReviewBtnHidden:
          currentScrollLevel >=
          scrollHeight - footerElementHeightElement.clientHeight,
      });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const { reviews, _id, fetchUpdatedData } = this.props;
    const { isOpen, isReviewBtnHidden } = this.state;

    return (
      <div className="container modalParent mb-5">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            {reviews.map((review) => {
              return (
                <div className="listViewCard mt-5 " key={review.id}>
                  <div className="card pt-0">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <img
                          src={
                            review.userImage
                              ? review.userImage
                              : "/images/default-dp.png"
                          }
                          className={classes.reviewerImage}
                          alt="Reviewerimage"
                        />
                      </div>
                      <div className="col">
                        <div className="card-block px-4">
                          <h4 className={classes.reviewerName}>
                            {review.name}
                          </h4>
                          <p className={classes.review}>
                            <ReactReadMoreReadLess
                              charLimit={100}
                              readMoreText={"read more"}
                              readLessText={"read less"}
                              readMoreStyle={{
                                color: "#EC1B23",
                                textDecoration: "underline",
                              }}
                              readLessStyle={{
                                color: "#EC1B23",
                                textDecoration: "underline",
                              }}
                            >
                              {review.review}
                            </ReactReadMoreReadLess>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {!isReviewBtnHidden && (
              <div
                className={classes.stickyReviewContainer}
                id="writeReviewBtn"
              >
                <hr className={classes.hr} />
                <button
                  onClick={() => {
                    this.setState({ isOpen: true });
                  }}
                  className={classes.writeReviewBtn}
                >
                  Write A Review
                </button>
              </div>
            )}
          </div>

          <div className={`col-lg-4 col-md-4 mt-5 ${classes.displayNone}`}>
            {" "}
            <Ratings
              _id={_id}
              fetchUpdatedData={fetchUpdatedData}
              {...this.toggle}
            />
          </div>
        </div>
        <Modal isOpen={isOpen} centered toggle={this.toggle}>
          <ModalBody>
            <AuthRotes>
              <Ratings
                _id={_id}
                fetchUpdatedData={fetchUpdatedData}
                handleToggle={this.toggle}
              />
            </AuthRotes>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Reviews;
