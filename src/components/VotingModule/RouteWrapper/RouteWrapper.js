import React from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import VotingEvents from "../index";
import Authentication from "../../../components/authentication";
import EventDetailContent from "../VotingEventDetail/EventDetailContent/EventDetailContent";
import CatalogueContent from "../VotingCategoryNomineeCatalogue/CatalogueContent/CatalogueContent";

const PageWrapper = () => {
  return (
    <Switch>
      <Route
        path="/authentication"
        name={"SignIn"}
        component={Authentication}
      />
      <Route
        path="/voting/:id/listing/:categoryId"
        component={CatalogueContent}
      />
      <Route path="/voting/:id" component={EventDetailContent} />
      <Route path="/voting" exact component={VotingEvents} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(PageWrapper);
