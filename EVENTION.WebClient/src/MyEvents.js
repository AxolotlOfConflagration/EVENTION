import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row } from "antd";
import MyEventFilters from "./components/MyEventFilters";
import TestLayout from "./containers/TestLayout";
import MyEventList from "./containers/MyEventsList";
import Cookies from "js-cookie";
import Login from "./Login";

class MyEvents extends Component {
  state = {
    type: "Wszystkie"
  };

  changeType = t => {
    this.setState({
      type: t
    });
  };

  render() {
    const { type } = this.state;
    if (Cookies.get("USER_ID?userid")) {
      return (
        <div className="Recommendation">
          <TestLayout>
            <Row>
              <MyEventFilters type={type} changeType={this.changeType} />
            </Row>
            <Row>
              <MyEventList type={type} />
            </Row>
          </TestLayout>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default MyEvents;
