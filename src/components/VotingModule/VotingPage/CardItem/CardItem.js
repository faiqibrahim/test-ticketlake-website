import React from "react";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { duration } from "../Duration/duration";
import "./CardItem.css";

const CardItem = (props) => {
  const { name, status, clicked, votingCounting, images } = props;

  let closedVoting = null;
  if (status) {
    closedVoting = (
      <>
        <img src={"/images/votingimages/winner.svg"} alt="img" />
        <div className="cvContent">Voting Closed</div>
      </>
    );
  }

  const eventName =
    name.length > 21 ? (
      <>
        {" "}
        <div className="cardTitle" data-tip={name}>
          {name}
        </div>
        <ReactTooltip place="right" className={"tooltipStyle"} />
      </>
    ) : (
      <div className="cardTitle">{name}</div>
    );

  return (
    <div className="cardItemCol" onClick={clicked}>
      <div className="imageContainer">
        <div className={status ? "overlay" : ""}></div>
        <div className="closedVoting">{closedVoting}</div>
        <img src={images} alt={"img"} />
      </div>
      <div className="cardContent">
        {eventName}
        <div className="cardMetaBox">
          <div className="timeLeft">
            {duration({ ...props }).eventEnd
              ? duration({ ...props }).durationString
              : duration({ ...props })}
          </div>
          <div className="voteCount">{votingCounting} Votes</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CardItem);
