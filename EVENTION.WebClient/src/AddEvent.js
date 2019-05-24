import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import AddEventForms from "./containers/AddEventForms";
import MyLayout from "./containers/MyLayout";
import GoogleFontLoader from "react-google-font-loader";
import Login from "./Login";
import Cookies from "js-cookie";

class AddEvent extends Component {
  render() {
    if (Cookies.get("USER_ID") && Cookies.get("BUSINESS") === "true") {
      return (
        <div className="AddEvent">
          <MyLayout>
            <GoogleFontLoader
              fonts={[
                {
                  font: "Advent Pro",
                  weights: [400, 700]
                },
                {
                  font: "Arima Madurai",
                  weights: [400, 700]
                }
              ]}
            />

            <Row type="flex" justify="space-around" align="middle">
              <Col span={10}>
                <div
                  class="text"
                  style={{
                    fontFamily: "Arima Madurai",
                    fontSize: "45px"
                  }}
                >
                  Utwórz własne wydarzenie i udostępnij je innym użytkownikom!
                </div>
              </Col>

              <Col span={4} />
              <Col span={10}>
                <AddEventForms />
              </Col>
            </Row>
          </MyLayout>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default AddEvent;
