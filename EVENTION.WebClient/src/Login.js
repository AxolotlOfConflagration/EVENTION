import React from "react";
import { Button } from "antd";
import TestLayout from "./containers/TestLayout";
import Cookies from "js-cookie";

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
        <TestLayout>
          <div />
          <Button href="http://localhost:9000/login">Zaloguj się</Button>
        </TestLayout>
      </div>
    );
  }
}

export default Login;
