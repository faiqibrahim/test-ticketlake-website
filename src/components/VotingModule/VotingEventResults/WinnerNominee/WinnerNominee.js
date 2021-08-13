import React from "react";

import "./WinnerNominee.css";

const WinnerNominee = (props) => {
  return (
    <div className="col3 eventWinnerCol">
      <div className="nomineeImg">
        <img className="winner" src={props.nomineeDetail.imgSrc} alt="img" />
        <div className="winnerBadge">
          <img src={"/images/votingimages/winner.svg"} alt="img" />
        </div>
      </div>
      <div className="nomineeName">{props.nomineeDetail.nomineeName}</div>
      <div className="nomineeCategory">{props.categoryName}</div>
      <div className="votesRecieved">
        Received {props.nomineeDetail.nomineeVotes} Votes
      </div>
    </div>
  );
};

export default WinnerNominee;
