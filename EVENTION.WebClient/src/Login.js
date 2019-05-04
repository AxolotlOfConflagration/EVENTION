import React from "react";
import { Button } from "antd";
import TestLayout from "./containers/TestLayout";
// import axios from "axios";

class Login extends React.Component {
  render() {
    document.cookie = "USER_ID="+window.location.search+"; path=/"
    return (
      <div className="Login">
        <TestLayout>
          <b>{window.location.search}</b>
          <div></div>
          <Button href="http://localhost:9000/login">LOGIN</Button>
        </TestLayout>
      </div>
    );
  }
}

export default Login;
