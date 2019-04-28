import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import ShortRecommendationList from "./containers/ShortRecommendationList";

class Recommendation extends Component {
  render() {
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
  }
}

export default Recommendation;