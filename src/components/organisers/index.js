import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./../../components/layout";

import OrganiserDetails from "./Details";
import Organisers from "./View";

const Rounting = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/organisers/details" component={OrganiserDetails} />
          <Route path="/organisers" component={Organisers} />
          <Route exact path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Rounting;
