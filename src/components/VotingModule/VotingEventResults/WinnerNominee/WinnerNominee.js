import React from 'react'

import './WinnerNominee.css';

const WinnerNominee = (props) => {
    return (
        <div className="row winnerRow">
            <div className="col3 eventWinnerCol">
                <div className="nomineeImg">
                    <img src={"/images/votingimages/rn1.png"} alt="img"/>
                    <div className="winnerBadge">
                        <img src={"/images/votingimages/winner.svg"} alt="img"/>
                    </div>
                </div>
                <div className="nomineeName">
                    {props.nomineeDetail.nomineeName}
                </div>
                <div className="nomineeCategory">
                     Best Baker in the Town
                </div>
                <div className="votesRecieved">
                    Received {props.nomineeDetail.nomineeVotes} Votes
                </div>
            </div>
        </div>
    )
}

export default WinnerNominee;