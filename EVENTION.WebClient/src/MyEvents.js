import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import MyEventList from "./containers/MyEventsList";

class MyEvents extends Component {
  render() {
    return (
      <div className="Recommendation">
        <TestLayout>
          <Col span={24}>
            <Row>
              <MyEventList />
            </Row>
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default MyEvents;
