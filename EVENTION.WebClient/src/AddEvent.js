import React, { Component } from "react";
import "antd/dist/antd.css";
//import { Col, Row } from "antd";
//import MyLayout from "./containers/Layout";
import EventForm from "./containers/EventForm";

class AddEvent extends Component {
  render() {
    return (
      <div className="AddEvent">
      <EventForm />
      </div>
    );
  }
}

export default AddEvent;
