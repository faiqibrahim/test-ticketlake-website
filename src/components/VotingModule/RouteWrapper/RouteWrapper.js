import React from 'react';

import {Switch,Route,Redirect , withRouter} from 'react-router-dom';

import VotingEvents from '../index';
import VotingEventCategories from '../VotingEventCategories/EventCategories/EventCategories';
import VotingEventNominees from '../VotingEventNominees/EventNominees/EventNominees';
import VotingEventResults from '../VotingEventResults/EventResults/EventResults';

const PageWrapper = () =>{

        return (
            <Switch>
                <Route path="/voting/event-results/:id" component={VotingEventResults}/>
                <Route path="/voting/:id/categories/:categoryId" component={VotingEventNominees}/>
                <Route path="/voting/:id" component={VotingEventCategories}/>
                <Route path="/voting" exact component={VotingEvents}/>
                <Redirect to="/" />
            </Switch>
        )
         
}

export default withRouter(PageWrapper);