import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row } from "antd";
import MyEventFilters from "./components/MyEventFilters";
import MyLayout from "./containers/MyLayout";
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
    if (Cookies.get("USER_ID")) {
      return (
        <div className="Recommendation">
          <MyLayout>
            <Row>
              <MyEventFilters type={type} changeType={this.changeType} />
            </Row>
            <Row>
              <MyEventList type={type} />
            </Row>
          </MyLayout>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default MyEvents;
