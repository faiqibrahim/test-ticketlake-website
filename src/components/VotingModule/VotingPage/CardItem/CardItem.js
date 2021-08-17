import React from "react";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { duration } from "../Duration/duration";
import "./CardItem.css";

const CardItem = (props) => {
  let closedVoting = null;
  if (props.status) {
    closedVoting = (
      <>
        <img src={"/images/votingimages/winner.svg"} alt="img" />
        <div className="cvContent">Voting Closed</div>
      </>
    );
  }

  let eventName =
    props.name.length > 20 ? (
      <>
        {" "}
        <div className="cardTitle" data-tip={props.name}>
          {props.name}
        </div>
        <ReactTooltip place="right" className={"tooltipStyle"} />
      </>
    ) : (
      <div className="cardTitle">{props.name}</div>
    );

  return (
    <div className="cardItemCol" onClick={props.clicked}>
      <div className="imageContainer">
        <div className={props.status ? "overlay" : ""}></div>
        <div className="closedVoting">{closedVoting}</div>
        <img src={props.images} alt={"img"} />
      </div>
      <div className="cardContent">
        {eventName}
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
