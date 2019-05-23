import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import MyEvents from "./MyEvents";
import AddEvent from "./AddEvent";
import Recommendation from "./Recommendation";
import Login from "./Login";
import Activate from "./Activate";
import BuisnessLogin from "./BuisnessLogin";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/MojeWydarzenia" component={MyEvents} />
      <Route path="/Aktywnosc" component={AddEvent} />
      <Route path="/Rekomendacje" component={Recommendation} />
      <Route path="/Login" component={Login} />
      <Route path="/DodajWydarzenie" component={AddEvent} />
      <Route path="/OstatniaAktywnosc" component={Activate} />
      <Route path="/BiznesoweLogowanie" component={BuisnessLogin} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
