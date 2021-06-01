import React, {Component, Fragment} from 'react'

import {getEventDetail} from '../../data-fetcher';

import VotingHeader from '../../Header/Layout/Layout';
import WinnerNominee from '../WinnerNominee/WinnerNominee';
import EventResultCard from '../EventResultCard/EventResultCard';
import './EventResults.css';

import nominees from '../../nominees.json'

class EventResults extends Component {
    
    state = {
        loading : true,
        event  : null,
        maxVotes : null,
    }
    
    componentDidMount(){
        getEventDetail(this.props.match.params.id).then((event) =>{
            this.setState({
                loading:false,
                event,
                breadCrumbs : [
                    { path :"/", crumbTitle:"Home"},
                    { path : '/voting' ,crumbTitle : 'Votings'},
                    { path : `/voting/${event.id}`, crumbTitle:event.eventTitle},
                    { path : `/voting/${event.id}/categories/8`, crumbTitle:'Best Baker in the Town'}
                ]
            })
        }).catch((error) =>{
        })
        this.getMaxNomineeVote()
    }

    getMaxNomineeVote = () => {
        const nomineeVotess = [];
        nomineeVotess.push(nominees.nomineesList.map((nominee) => {
                return nominee.nomineeVotes;
        }))
        const max = Math.max(...nomineeVotess[0])
        this.setState({
            maxVotes : max
        })
    }

    getWinnerNominees = () => {
        
        const {maxVotes} = this.state;
        
        return nominees.nomineesList.filter(nomineeItem => nomineeItem.nomineeVotes === maxVotes)

    }

    render(){
        
        if(this.state.loading) return <p>Component Loading!</p> 

        const {maxVotes} = this.state;
        const nomineeWinners = this.getWinnerNominees();

        return (<Fragment>
                <div className="container">
                    <div>
                        <VotingHeader 
                            pageTitle = {this.state.event.eventTitle} 
                            breadCrumbs = {this.state.breadCrumbs}
                        />
                    </div>
                </div>   
                <hr style={{margin:'5px 0'}}/>
                <div className="container eventResultContainer">
                    <div className="contentBox">
                        <div className="winnerBox">
                            {
                                nomineeWinners.map((nominee) => <WinnerNominee key={nominee.id} nomineeDetail = {nominee} />)
                            }
                        </div>

                        <hr style={{margin:'5px 0'}}/>

                        <div className="Header">
                            <div className="nomineeHeaderCol">
                                <div className="heading">Nominees for "Best Baker in the Town"</div>
                                <div className="subHeading">Standings for the participants for this position are as follows.</div>
                            </div>
                            <div className="nomineeHeaderCol">
                                <div className="sortContent">
                                    <div className="nomineeBoxRow" style={{justifyContent:"flex-end"}}>
                                        <div className="col2">
                                            <div className="sortBox">
                                                <label>Sort by: &nbsp;</label>
                                                <i className="sortArrow"></i>
                                                <div class="dropdown" name="nomineeSort" id="nomineeSort">
                                                    <span>Most Votes</span>
                                                    <div class="dropdown-content">
                                                    <p>Most Votes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nomineeBoxRow">
                            {   
                                nominees.nomineesList.map(nominee => { 
                                    return ( <EventResultCard 
                                        key={nominee.id} 
                                        nomineeDetail = {nominee}
                                        maxVotes = {maxVotes}
                                    />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
        </Fragment>
        )}
}

export default EventResults;