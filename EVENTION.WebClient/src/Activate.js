import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import ShortActivateList from "./containers/ShortActivateList";
import UsersList from "./containers/UsersList";

class Activate extends Component {
  render() {
    return (
      <div className="Recommendation">
        <TestLayout>
          <Col span={15}>
            <Row>
              <ShortActivateList />
            </Row>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <UsersList />
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default Activate;
