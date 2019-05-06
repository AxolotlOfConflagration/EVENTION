import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import TestLayout from "./containers/TestLayout";
import ShortActivateList from "./containers/ShortActivateList";
import { Input } from "antd";

const Search = Input.Search;

class Activate extends Component {
  render() {
    return (
      <div className="Recommendation">
        <TestLayout>
          <Col span={7}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
          </Col>
          <Col span={1} />
          <Col span={16}>
            <Row>
              <ShortActivateList />
            </Row>
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default Activate;
