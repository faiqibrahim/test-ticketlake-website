import React from "react";
import ToolTips from "../../ToolTips/ToolTips";

import "./WinnerNominee.css";

const WinnerNominee = (props) => {
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

  const categoryNameTool = props.categoryName ? (
    <ToolTips
      text={props.categoryName}
      textLength={14}
      classes={{
        toolStyle: "tooltipStyle",
        textClasses: { title: "nomineeCategory" },
      }}
    />
  ) : null;

  return (
    <div className="col3 eventWinnerCol">
      <div className="nomineeImg">
        <img className="winner" src={props.nomineeDetail.imgSrc} alt="img" />
        <div className="winnerBadge">
          <img src={"/images/votingimages/winner.svg"} alt="img" />
        </div>
      </div>
      {nomineeName}
      {categoryNameTool}
      <div className="votesRecieved">
        Received {props.nomineeDetail.nomineeVotes} Votes
      </div>
    </div>
  );
};

export default WinnerNominee;
