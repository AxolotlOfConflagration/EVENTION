import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import MyLayout from "./containers/Layout";
import ShortRecommendationList from "./containers/ShortRecommendationList";
import EventMap from "./components/EventsMap";

class Recommendation extends Component {
  render() {
    return (
      <div className="Recommendation">
      
        <MyLayout>
          <Col span={15}>
            <Row>
              <ShortRecommendationList />
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

export default Recommendation;
