import React from "react";
import { Button } from "antd";
import TestLayout from "./containers/TestLayout";
import axios from "axios";

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <TestLayout>
          <Button onClick={() => {}}>LOGIN</Button>
        </TestLayout>
      </div>
    );
  }
}

export default Login;
