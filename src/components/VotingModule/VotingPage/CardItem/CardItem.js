import React from "react";
import { withRouter } from "react-router-dom";

import Duration from "../Duration/Duration";
import "./CardItem.css";

const CardItem = (props) => {
  let closedVoting = null;

  if (props.status === "closed") {
    closedVoting = (
      <>
        <img src={"/images/votingimages/winner.svg"} alt="img" />
        <div className="cvContent">Voting Closed</div>
      </>
    );
  }
  const duration = <Duration {...props} />;

  return (
    <div className="cardItemCol" onClick={props.clicked}>
      <div className="imageContainer">
        <div className={`${props.status}` === "closed" ? "overlay" : ""}></div>
        <div className="closedVoting">{closedVoting}</div>
        <img src={props.images} alt={"img"} />
      </div>
      <div className="cardContent">
        <div className="cardTitle">{props.name}</div>
        <div className="cardMetaBox">
          <div className="timeLeft">{duration}</div>
          <div className="voteCount">{props.votingCounting} Votes</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CardItem);
