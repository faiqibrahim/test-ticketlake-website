import React from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import VotingEvents from "../index";
import VotingEventCategories from "../VotingEventCategories/EventCategories/EventCategories";
import VotingEventNominees from "../VotingEventNominees/EventNominees/EventNominees";
import VotingEventResults from "../VotingEventResults/EventResults/EventResults";
import Authentication from "../../../components/authentication";

const PageWrapper = () => {
  return (
    <Switch>
      <Route
        path="/authentication"
        name={"SignIn"}
        component={Authentication}
      />
      <Route
        path="/voting/:id/event-results/:categoryId"
        component={VotingEventResults}
      />
      <Route
        path="/voting/:id/categories/:categoryId"
        component={VotingEventNominees}
      />
      <Route path="/voting/:id" component={VotingEventCategories} />
      <Route path="/voting" exact component={VotingEvents} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(PageWrapper);
