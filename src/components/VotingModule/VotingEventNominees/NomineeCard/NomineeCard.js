import React from 'react';

import './NomineeCard.css';

const NomineeCard = (props) => {
    return (
        <div className="cardItemCol">
            <div className="cardItemContainer">
                <div className="imageContainer">
                    <img src={props.imgSrc} alt='img'/>
                </div>
                <div className="cardContent">
                    <div className="cardTitle">
                        {props.nomineeName}
                    </div>
                    <div className="voteType">
                        {props.votingType}
                    </div>
                    <div className="voteButton">
                        <button 
                            value={props.nomineeVoteID}
                            onClick={props.clicked}>Vote</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NomineeCard;