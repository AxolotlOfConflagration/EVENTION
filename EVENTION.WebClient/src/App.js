import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col } from "antd";
import MyLayout from "./containers/Layout";
import ShortEventList from "./containers/ShortEventList";
import EventMap from "./components/EventsMap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyLayout>
          <Col span={14}>
            <ShortEventList />
          </Col>
          <Col span={10}>
            <EventMap />
          </Col>
        </MyLayout>
      </div>
    );
  }
}

export default App;
