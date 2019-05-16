import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import MyLayout from "./containers/MyLayout";
import ShortRecommendationList from "./containers/ShortRecommendationList";
import Cookies from "js-cookie";
import Login from "./Login";

class Recommendation extends Component {
  render() {
    if (Cookies.get("USER_ID")) {
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
    } else {
      return <Login />;
    }
  }
}

export default Recommendation;
