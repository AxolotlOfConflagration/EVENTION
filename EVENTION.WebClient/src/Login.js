import React from "react";
import { Button, Row } from "antd";
import MyLayout from "./containers/MyLayout";
import Cookies from "js-cookie";
import { Skeleton, Breadcrumb } from "antd";
import GoogleFontLoader from "react-google-font-loader";

class Login extends React.Component {
  // componentDidMount() {
  //   console.log(Cookies.get());
  //   console.log(String(window.location.search).replace("?userid=", ""));
  //   console.log(Cookies.get("USER_ID?userid"));
  // }

  render() {
    Cookies.set(
      "USER_ID",
      String(window.location.search).replace("?userid=", "")
    );
    return (
      <div className="Login">
        <MyLayout className="layout">
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
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Row>
              <div
                class="text"
                style={{
                  fontFamily: "Arima Madurai",
                  fontSize: "45px"
                }}
              >
                {Cookies.get("USER_ID") ? (
                  <Button href="http://localhost:3000">
                    Przejdź do strony głównej
                  </Button>
                ) : (
                  "Musisz być zalogowany żeby przeglądać zawartość tej strony!"
                )}
                <br />
              </div>
            </Row>
            <br />
            <Row>
              {Cookies.get("USER_ID") ? (
                <div />
              ) : (
                <div>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </div>
              )}
            </Row>
          </div>
        </MyLayout>
      </div>
    );
  }
}

export default Login;
