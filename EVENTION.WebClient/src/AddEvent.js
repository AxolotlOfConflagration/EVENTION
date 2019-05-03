import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import AddEventForms from "./containers/AddEventForms";
import TestLayout from "./containers/TestLayout";
import GoogleFontLoader from "react-google-font-loader";

class AddEvent extends Component {
  render() {
    return (
      <div className="AddEvent">
        <TestLayout>
          <GoogleFontLoader
            fonts={[
              {
                font: "Advent Pro",
                weights: [400, 700]
              }
            ]}
          />
          <Col span={9}>
            <div
              class="text"
              style={{
                fontFamily: "Advent Pro",
                fontSize: "35px"
              }}
            >
              Utwórz własne wydarzenie i udostępnij je innym użytkownikom!
            </div>
          </Col>
          <Col span={3} />
          <Col span={9}>
            <AddEventForms />
            <Col span={3} />
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default AddEvent;
