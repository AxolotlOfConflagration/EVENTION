import React from "react";
import { Button } from "antd";
import TestLayout from "./containers/TestLayout";
// import axios from "axios";
import Home from "./Home";

class Login extends React.Component {
  render() {
    document.cookie = "USER_ID=" + window.location.search + "; path=/";
    if (document.cookie) return <Home />;
    return (
      <div className="Login">
        <TestLayout>
          <b>{window.location.search}</b>
          <div />
          <Button href="http://localhost:9000/login">LOGIN</Button>
        </TestLayout>
      </div>
    );
  }
}

export default Login;
