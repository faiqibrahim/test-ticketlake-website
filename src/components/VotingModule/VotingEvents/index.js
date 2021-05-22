import React, {Component, Fragment} from 'react'
import {getVotingEvents} from './../data-fetcher';
import VotingEventsContent from '../VotingPage/VotingEventsContent/VotingEventsContent';
import VotingHeader from '../Header/Layout/Layout';
import '../RouteWrapper/RouteWrapper.css';

class VotingEvents extends Component{
    state = {
        loading : true,
        events  :[]
    }

    componentDidMount(){
        getVotingEvents().then((events) =>{
            this.setState({
                loading:false,
                events,
                breadCrumbs : [
                    { path :"/", crumbTitle:"Home"},
                    { path : '/voting' ,crumbTitle : 'Votings'}
                ]
            })
        }).catch((error) =>{

        })
    }
    
    render(){

        if(this.state.loading) return <p>Component Loading!</p> 

        return(
            <Fragment>
                <div className="container">
                    <div className="votingContainer">
                        <div className="headerContainer">
                            <VotingHeader 
                                pageTitle = "Votings"
                                breadCrumbs = {this.state.breadCrumbs}
                            />
                        </div>
                    </div>
                </div>
                <hr style={{margin:'5px 0'}}/>
                <div className="container">
                    <div className="votingContainer">
                        <div className="contentBox">
                            <VotingEventsContent events = {this.state.events}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default VotingEvents;