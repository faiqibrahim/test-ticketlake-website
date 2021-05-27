import React, {Component} from 'react';
import {Button} from 'antd';

import paymentMethods from '../../paymentMethod.json';
import '../../VotingModule.css';

class PaidModalContent extends Component {

    constructor(props){
        super(props);
        this.state = {
            paymentMethod : null,
            activeMethodId : null,
            voteCastSuccess : false
        }
    }

    selectPaymentHandler = (method) => {
        this.setState({
            paymentMethod : method,
            activeMethodId : method.id,
        })
    }

    voteCastSuccessHandler = () => {

        if(this.state.activeMethodId){
            this.setState({
                voteCastSuccess : true
            }) 
        }
    }

    renderVoteCastScreen = () => {
        const { paymentMethod ,activeMethodId } = this.state;

        return(
            <>
                <div className="title" style={{marginBottom : '20px'}}>
                        Vote for {this.props.nomineeDetail.nomineeName} 
                </div>
                <div className="subTitle">
                        <div className="text">GHS 4.00 per vote</div>
                </div>
                
                <div className="paymentDetail">
    
                    <div className="voteCount">
                        <div className="title">Number of Votes</div>
                        <div style={{position :'relative'}}>
                            <i className="voting_dropdown_arrow"></i>
                            <select name="number_of_votes">
                                <option value="02 Votes">02 Votes</option>
                            </select>
                        </div>
                    </div>
    
                    <div className="paymentMethod">
                        <div className="title">Payment Method</div>
                        <div className="row">
                            {
                                paymentMethods.paymentMethodsList.map((method) => {
                                    
                                    const isActive =  paymentMethod && paymentMethod.id === method.id;
                                    
                                    return(
                                        <div className="col4" key={method.id} onClick={() => this.selectPaymentHandler(method)}>
                                            <div className="paymentContent">
                                                <div className={`${"tickMark"} ${isActive ?"active_method" : ""}`}>
                                                    <img src={"/images/votingimages/tickmark.svg"} alt="img"/>
                                                </div>
                                                <div className="paymentCard">
                                                    <img src={method.imgSrc} alt={'img'}/>
                                                </div>
                                                <div className="paymentTitle">{method.cardTitle}</div>
                                                <div className="paymentCurrencey">{method.currency}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="castVote">
                    <Button 
                        className = {`${activeMethodId ? "active_method enabled" : "disabled"}`}
                        onClick = {this.voteCastSuccessHandler}>Pay GHS 8.00</Button>
                </div>
            </>
        )
    }

    renderVoteSuccessScreen = () => {
        return(
            <>
                <div className="title">
                    Thanks for voting. Your vote has been cast successfully.
                </div>
                <div className="detailContent">
                    <div className="detailImg">
                        <img src={this.props.nomineeDetail.imgSrc} alt={'img'}/>
                    </div>
                    <div className="detailName">{this.props.nomineeDetail.nomineeName}</div>
                    <div className="detailVoteType">{this.props.nomineeDetail.votingType}</div>
                </div>
                <div className="castVote" style={{paddingTop : '50px'}}>
                   <Button onClick={this.props.handleOk} className="active_method">Go Back To Nominees</Button>
                </div>
            </>
        )
    }

    render(){
        const { voteCastSuccess } = this.state;
    
        return( 
            <div className={`${voteCastSuccess ? "DetailBox paidPadding" : "DetailBox"}`}>
                {
                    !voteCastSuccess ? this.renderVoteCastScreen() : this.renderVoteSuccessScreen()
                }
            </div> 
        )
    }
}

export default PaidModalContent;