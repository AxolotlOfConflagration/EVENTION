import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import MyEvents from "./MyEvents";
import AddEvent from "./AddEvent";
import Recommendation from "./Recommendation";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/MojeWydarzenia" component={MyEvents} />
      <Route path="/Aktywnosc" component={AddEvent} />
      <Route path="/Rekomendacje" component={Recommendation} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
