import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrganiserDetails from "./OrganiserDetails";
import Organisers from "./Organisers";

const Rounting = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/organisers/details" component={OrganiserDetails} />
          <Route exact path="/organisers" component={Organisers} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Rounting;
