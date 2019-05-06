import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import ShortRecommendationList from "./containers/ShortRecommendationList";
import Cookies from "js-cookie";
import Login from "./Login";

class Recommendation extends Component {
  render() {
    if (Cookies.get("USER_ID?userid")) {
      return (
        <div className="Recommendation">
          <TestLayout>
            <Col span={24}>
              <Row>
                <ShortRecommendationList />
              </Row>
            </Col>
          </TestLayout>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default Recommendation;
