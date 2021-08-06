import React from "react";

import "./NomineeCard.css";

const NomineeCard = (props) => {
  const { voteCount, id, voteCountDetail } = props;

  let votingCount =
    voteCountDetail && id === voteCountDetail.data._id
      ? voteCountDetail.data.totalVotes
      : voteCount;

  return (
    <div className="cardItemCol">
      <div className="cardItemContainer">
        <div className="imageContainer">
          <img src={props.imgSrc} alt="img" />
        </div>
        <div className="cardContent">
          <div className="cardTitle">{props.nomineeName}</div>
          <div className="voteType">
            {props.balloting === true
              ? "secret balloting"
              : votingCount === 1
              ? votingCount + " vote"
              : votingCount + " votes"}
          </div>
          <div className="voteButton">
            <button value={props.nomineeVoteID} onClick={props.clicked}>
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
