import React from "react";
import ToolTips from "../../ToolTips/ToolTips";

import "./EventResultCard.css";

const EventResultCard = (props) => {
  let winnerBadge = null;
  if (props.maxVotes === props.nomineeDetail.nomineeVotes) {
    winnerBadge = <img src={"/images/votingimages/winner.svg"} alt="img" />;
  }

  const nomineeName = (
    <ToolTips
      text={props.nomineeDetail.nomineeName}
      textLength={14}
      classes={{
        toolStyle: "tooltipStyle",
        textClasses: { title: "nomineeName" },
      }}
    />
  );

  return (
    <div className="col-md-6 resultItemCol">
      <div className="eventResultItemContainer">
        <div className="nomineeImg">
          <img src={props.nomineeDetail.imgSrc} alt="img" />
          <div className="winnerBadge">{winnerBadge}</div>
        </div>
        {nomineeName}
        <div className="votesRecieved">
          {props.nomineeDetail.nomineeVotes} votes
        </div>
      </div>
    </div>
  );
};

export default EventResultCard;
