import React from "react";
import Confetti from "react-confetti";
import classes from "./styles.module.css";
import {withRouter} from 'react-router-dom';

const CheckoutFailed = (props) => {

    return (
        <div className={"row"}>
            <Confetti
                width={300}
                height={650}
                numberOfPieces={80}
                gravity={0.1}
                opacity={1.5}
                colors={[
                    "#DC143C",
                    "#DB7093",
                    "#FFFF33",
                    "#1E4C55",
                    "#3A2737",
                    "#87CEEB",
                ]}
            />
            <div className={`col-md-12 ${classes.containerDiv}`}>
                <h4 className="title">Sorry!</h4>
            </div>

            <div className={"col-md-12"}>
                <img
                    src={"/images/checkout/success.svg"}
                    style={{width: "60%"}}
                    alt={"img"}
                />
            </div>

            <div className={"col-md-12"}>
                <p className={classes.successContent}>
                    Could not process payment.
                </p>
            </div>

            <div className={"col-md-12"}>
                <button className={`simpleBlueBtn ${classes.successBtn}`}
                        onClick={() => window.location.reload()}>
                    Close
                </button>
            </div>

            <div className={"col-md-12"}>
                <button className="fullWihdthRedButton"
                        onClick={() => props.history.push('/')}>
                    Shop other events
                </button>
            </div>
        </div>
    );
};

export default withRouter(CheckoutFailed);
