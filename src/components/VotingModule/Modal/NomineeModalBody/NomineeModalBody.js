import React, {Component,Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import PaidModalContent from '../PaidModalContent/PaidModalContent';
import UnpaidModalContent from '../UnpaidModalContent/UnpaidModalContent';
import {getEventCategoryNomineeDetail } from '../../data-fetcher';

class NomineeModalBody extends Component{


    constructor(props){
        super(props);
        this.state = {
            voteCastSuccess : false,
            nomineeDetail : null
        }
    }

    componentDidMount(){

        getEventCategoryNomineeDetail(this.props.nomineeId).then( nominee => {
            this.setState({
                nomineeDetail : nominee,
                voteCastSuccess : false
                })
        }).catch(() =>{

        })
    }

    componentWillUnmount(){
        this.setState({
            voteCastSuccess : false
        })
    }

    voteCastSuccessHandler = () =>{
        this.setState({
            voteCastSuccess : true
        })
    } 

    render(){

        const { nomineeDetail} = this.state;
                
        if(!nomineeDetail) return null;
    
        return (<Fragment> 
                    {
                        nomineeDetail.status === "paid" &&
                            <PaidModalContent  
                                handleOk = {this.props.handleOk}
                                nomineeDetail = {nomineeDetail}
                            />
                    }
                    {
                        nomineeDetail.status === "unpaid" &&
                            <UnpaidModalContent
                                nomineeDetail = {nomineeDetail}
                                handleOk = {this.props.handleOk}
                        />
                    } 
                </Fragment>)
        }
}


export default withRouter(NomineeModalBody);

