import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import MyLayout from "./containers/Layout";
import ShortRecommendationList from "./containers/ShortRecommendationList";

class Recommendation extends Component {
  render() {
    return (
      <div className="Recommendation">
        <MyLayout>
          <Col span={24}>
            <Row>
              <ShortRecommendationList />
            </Row>
          </Col>
        </MyLayout>
      </div>
    );
  }
}

export default Recommendation;
