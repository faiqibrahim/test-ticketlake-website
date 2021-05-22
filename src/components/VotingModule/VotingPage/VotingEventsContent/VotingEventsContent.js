import React from 'react';
import {withRouter} from 'react-router-dom';

import CardItem from '../CardItem/CardItem';
import './VotingEventsContent.css';


const eventSelectedHandler = (id,props) => {
    props.history.push({
            pathname : "/voting/" + id
        }
    );
}

const eventClosedVotingHandler = (id,props) => {
       props.history.push({
            pathname : "/voting/event-results/" + id
        }
    );
}

const VotingEvents = (props) => {
    return(   
        <div className="cardItemRow votingEvents">
            {   props.events.map(event => { 
                    return ( <CardItem 
                        key={event.id} 
                        {...event}
                        clicked={() => event.status === "open" ? eventSelectedHandler(event.id , props) : eventClosedVotingHandler(event.id , props)}
                    />
                    )
                })
            }
        </div>
    )
}

export default withRouter(VotingEvents);

