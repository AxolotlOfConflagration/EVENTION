import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
<<<<<<< HEAD
//import TestHome from "./TestHome";
=======

import Activate from "./Activate";

//import TestHome from "./TestHome";

>>>>>>> 8aaa603af17bf63b1c1cbd144104c668b8487a3e
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
<<<<<<< HEAD
      <Route path="/Login" component={Login} />
      <Route path="/OstatniaAktywnosc" component={Activate} />
=======

      <Route path="/OstatniaAktywnosc" component={Activate} />


>>>>>>> 8aaa603af17bf63b1c1cbd144104c668b8487a3e
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
