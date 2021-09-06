import React from "react";
import Confetti from "react-confetti";
import classes from "./styles.module.css";
import { withRouter } from "react-router-dom";

const CheckoutFailed = (props) => {
  return (
    <div className={classes.successMsgWrp}>
      <div className={"row"}>
        <div className={`col-md-12 ${classes.containerDiv}`}>
          <h4 className="title">Sorry!</h4>
        </div>

        <div className={"col-md-12"}>
          <img
            src={"/images/checkout/error.svg"}
            style={{ width: "300px" }}
            alt={"img"}
          />
        </div>

        <div className={"col-md-12"}>
          <p className={classes.successContent}>Could not process payment.</p>
        </div>

        <div className={"col-md-12"}>
          <button
            className={`simpleBlueBtn ${classes.successBtn}`}
            onClick={() => window.location.reload()}
          >
            Close
          </button>
        </div>

        <div className={"col-md-12"}>
          <button
            className="fullWidthRedButton w-30"
            onClick={() => props.history.push("/")}
          >
            Shop other events
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CheckoutFailed);
