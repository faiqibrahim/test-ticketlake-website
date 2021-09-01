import React from "react";
import ReactTooltip from "react-tooltip";

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

  const name =
    nomineeName.length > 21 ? (
      <>
        <div className="cardTitle" data-tip={nomineeName}>
          {nomineeName}
        </div>
        <ReactTooltip place="right" className={"tooltipStyle"} />
      </>
    ) : (
      <div className="cardTitle">{nomineeName}</div>
    );

  return (
    <div className="cardItemCol">
      <div className="cardItemContainer">
        <div className="imageContainer">
          <img src={imgSrc} alt="img" />
        </div>
        <div className="cardContent">
          {name}
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
