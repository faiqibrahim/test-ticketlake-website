import React, {Component} from 'react';
import {Button} from 'antd';

import '../../VotingModule.css';

class UnpaidModalContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            voteCastSuccess : false
        }
    }

    voteCastSuccessHandler = () => {
        this.setState({
            voteCastSuccess : true
        }) 
    }

    renderVoteCastScreen = () => {
        
        return(
            <>
                <div className="title">
                    <div className="upperTitle">
                        Are you sure for casting 
                    </div>
                    <div className="bottomTitle"> 
                        your vote to following nominee?
                    </div>
                </div>
                <div className="detailContent">
                    <div className="detailImg">
                        <img src={this.props.nomineeDetail.imgSrc} alt={'img'}/>
                    </div>
                    <div className="detailName">{this.props.nomineeDetail.nomineeName}</div>
                    <div className="detailVoteType">{this.props.nomineeDetail.votingType}</div>
                </div>
                <div className="castVote">
                    <Button 
                        className="active_method"
                        onClick = {this.voteCastSuccessHandler}>Yes, Cast Vote Now</Button>
                </div>
            </>
        )
    }


    renderVoteSuccessScreen = () => {
        
        return(
            <>
                <div className="title" style={{marginBottom : '20px'}}>
                    Thanks for voting. Your vote has been cast successfully.
                </div>
                <div className="subTitle">
                    <div className="text">You can cast another vote after</div>
                    <div className="timeLeft">09 hours, 20 mins</div>
                </div>
                <div className="detailContent">
                    <div className="detailImg">
                        <img src={this.props.nomineeDetail.imgSrc} alt={'img'}/>
                    </div>
                    <div className="detailName">{this.props.nomineeDetail.nomineeName}</div>
                    <div className="detailVoteType">{this.props.nomineeDetail.votingType}</div>
                </div>
                <div className="castVote" style={{paddingTop : '40px'}}>
                    <Button onClick={this.props.handleOk} className="active_method">Go Back To Nominees</Button>
                </div>
            </>
        )
    }

    render(){
        const {voteCastSuccess} = this.state;
    
        return( 
            <div className={`${voteCastSuccess ? "DetailBox" : "DetailBox unpaidPadding"}`}>
                {
                    !voteCastSuccess ? this.renderVoteCastScreen() : this.renderVoteSuccessScreen()
                }
            </div> 
        )
    }
}

export default UnpaidModalContent;