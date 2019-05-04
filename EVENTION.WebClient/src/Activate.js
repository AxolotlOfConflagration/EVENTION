import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import ShortActivateList from "./containers/ShortActivateList";

class Activate extends Component {
  render() {
    return (
      <div className="Recommendation">
        <TestLayout>
          <Col span={24}>
            <Row>
              <ShortActivateList />
            </Row>
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default Activate;
