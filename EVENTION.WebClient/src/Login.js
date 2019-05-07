import React from "react";
import { Button, Row, Col, Alert } from "antd";
import LoginLayout from "./containers/LoginLayout";
import Cookies from "js-cookie";
import {  Font, Skeleton, Icon, Layout, Menu, Breadcrumb } from 'antd';
import GoogleFontLoader from "react-google-font-loader";

class Login extends React.Component {
  componentDidMount() {
    console.log(Cookies.get());
    console.log(window.location.search);
    console.log(Cookies.get("USER_ID?userid"));
  }

  render() {
    document.cookie = "USER_ID" + window.location.search + "; path=/";
    return (
      <div className="Login">
        <LoginLayout className="layout">
        {/* <Alert message="Musisz być zalogowany żeby przeglądać zawartość tej strony!" type="error" banner="true" showIcon /> */}
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
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Row>
          <div
                class="text"
                style={{
                  fontFamily: "Arima Madurai",
                  fontSize: "45px"
                }}
              >
                Musisz być zalogowany żeby przeglądać zawartość tej strony!
              <br></br>
           </div>
          </Row>
          <br></br>
          <Row>
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </Row>
          </div>
        </LoginLayout>
      </div>
    );
  }
}

export default Login;
