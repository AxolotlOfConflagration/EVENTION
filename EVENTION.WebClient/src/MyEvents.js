import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row } from "antd";
import MyEventFilters from "./components/MyEventFilters";
import TestLayout from "./containers/TestLayout";
import MyEventList from "./containers/MyEventsList";

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
  }
}

export default MyEvents;
