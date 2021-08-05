import React from "react";
import { withRouter } from "react-router-dom";

import { duration } from "../Duration/duration";
import "./CardItem.css";

const CardItem = (props) => {
  let closedVoting = null;
  console.log("props.status", props.status);
  if (props.status) {
    closedVoting = (
      <>
        <img src={"/images/votingimages/winner.svg"} alt="img" />
        <div className="cvContent">Voting Closed</div>
      </>
    );
  }

  return (
    <div className="cardItemCol" onClick={props.clicked}>
      <div className="imageContainer">
        <div className={props.status ? "overlay" : ""}></div>
        <div className="closedVoting">{closedVoting}</div>
        <img src={props.images} alt={"img"} />
      </div>
      <div className="cardContent">
        <div className="cardTitle">{props.name}</div>
        <div className="cardMetaBox">
          <div className="timeLeft">
            {duration({ ...props }).eventEnd
              ? duration({ ...props }).durationString
              : duration({ ...props })}
          </div>
          <div className="voteCount">{props.votingCounting} Votes</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CardItem);
