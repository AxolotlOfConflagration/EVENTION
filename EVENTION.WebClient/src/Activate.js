import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import MyLayout from "./containers/MyLayout";
import ShortActivateList from "./containers/ShortActivateList";
import UsersList from "./containers/UsersList";
import Login from "./Login";
import Cookies from "js-cookie";
import Home from "./Home";

class Activate extends Component {
  render() {
    if (Cookies.get("USER_ID") && Cookies.get("BUSINESS") === "false") {
      return (
        <div className="Recommendation">
          <MyLayout>
            <Col span={15}>
              <Row>
                <ShortActivateList />
              </Row>
            </Col>
            <Col span={1} />
            <Col span={8}>
              <UsersList />
            </Col>
          </MyLayout>
        </div>
      );
    } else if (Cookies.get("USER_ID") && Cookies.get("BUSINESS") === "true") {
      return <Home />;
    } else {
      return <Login />;
    }
  }
}

export default Activate;
