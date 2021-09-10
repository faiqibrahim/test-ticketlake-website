import React from "react";
import Confetti from "react-confetti";
import classes from "./styles.module.css";
import {withRouter} from 'react-router-dom';

const CheckoutSuccess = (props) => {

    return (
        <div className={classes.successMsgWrp}>
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
                    <h4 className="title">Oh Yaah, Let's get Going!</h4>
                </div>

                <div className={"col-md-12"}>
                    <img
                        src={"/images/checkout/success.svg"}
                        style={{width: "300px"}}
                        alt={"Success"}
                    />
                </div>

                <div className={"col-md-12"}>
                    <p className={classes.successContent}>
                        Congratulations, ticket(s) reserved! let
                        <br/>
                        the fun begin, can't wait to see you there.
                        <br/>
                        Remember to check your email.
                    </p>
                </div>

                <div className={"col-md-12"}>
                    <button className={`simpleBlueBtn ${classes.successBtn}`} onClick={() => props.history.push('/user/ticket')}>
                        View Ticket
                    </button>

                    <button className={`simpleBlueBtn ${classes.successBtn}`} onClick={()=>props.showInvoice()}>
                        View Receipt
                    </button>
                </div>

                <div className={"col-md-12 pl-40 pr-40"}  onClick={() => props.history.push('/')}>
                    <button className="fullWidthRedButton w-30">Shop more events</button>
                </div>
            </div>
        </div>

    );
};

export default withRouter(CheckoutSuccess);
