import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
//import TestHome from "./TestHome";
import AddEvent from "./AddEvent";
import Recommendation from "./Recommendation";
import Login from "./Login";
import Activate from "./Activate";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/DodajWydarzenie" component={AddEvent} />
      <Route path="/Rekomendacje" component={Recommendation} />
      <Route path="/Login" component={Login} />
      <Route path="/OstatniaAktywnosc" component={Activate} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
