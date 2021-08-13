import React from "react";

import "./NomineeCard.css";

const NomineeCard = (props) => {
  const {
    voteCount,
    id,
    voteCountDetail,
    balloting,
    nomineeName,
    imgSrc,
    nomineeVoteID,
    clicked,
  } = props;

  let votingCount =
    voteCountDetail && id === voteCountDetail.data._id
      ? voteCountDetail.data.totalVotes
      : voteCount;

  return (
    <div className="cardItemCol">
      <div className="cardItemContainer">
        <div className="imageContainer">
          <img src={imgSrc} alt="img" />
        </div>
        <div className="cardContent">
          <div className="cardTitle">{nomineeName}</div>
          <div className="voteType">
            {balloting
              ? "secret balloting"
              : votingCount === 1
              ? votingCount + " vote"
              : votingCount + " votes"}
          </div>
          <div className="voteButton">
            <button value={nomineeVoteID} onClick={clicked}>
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
