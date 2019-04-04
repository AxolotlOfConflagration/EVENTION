import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import MyLayout from "./containers/Layout";
import ShortEventList from "./containers/ShortEventList";
import EventFilters from "./containers/EventFilters";
import EventMap from "./components/EventsMap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyLayout>
          <Col span={15}>
            <Row>
              <EventFilters />
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <ShortEventList />
            </Row>
          </Col>
          <Col span={9}>
            <EventMap />
          </Col>
        </MyLayout>
      </div>
    );
  }
}

export default App;
