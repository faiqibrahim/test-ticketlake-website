import React from 'react'


import './EventResultCard.css'

const EventResultCard = (props) => {
    let winnerBadge = null;
    if(props.maxVotes === props.nomineeDetail.nomineeVotes){
        winnerBadge = (
            <img src={"/images/votingimages/winner.svg"} alt="img"/>
        )
    }
    return (
        <div className="col3">
            <div className="eventResultItemContainer">
                <div className="nomineeImg">
                    <img src={props.nomineeDetail.imgSrc} alt="img"/>
                    <div className="winnerBadge">
                        {winnerBadge}
                    </div>
                </div>
                <div className="nomineeName">
                    {props.nomineeDetail.nomineeName}
                </div>
                <div className="votesRecieved">
                    {props.nomineeDetail.nomineeVotes} votes
                </div>
            </div>
        </div>
    )
}

export default EventResultCard;