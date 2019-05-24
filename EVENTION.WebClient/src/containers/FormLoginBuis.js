import React from "react";
import { Form, Input } from "antd";
import { Row, Button } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

class FormLoginBuis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      validLogin: "true bure",
      validPassowrd: "true bure",
      loginError: "",
      passwordError: ""
    };
    this.setLogin = this.setLogin.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  validate = () => {
    if (!this.state.login) {
      this.setState({
        loginError: "Login jest wymagany!",
        validLogin: "false malse"
      });
    }
    if (!this.state.password) {
      this.setState({
        passwordError: "Hasło jest wymagane!",
        validPassowrd: "false malse"
      });
    }
    return true;
  };

  setLogin(event) {
    this.setState({ login: event.target.value, loginError: "" });
    console.log(`Login:  ${event.target.value}`);
  }

  setPassword(event) {
    this.setState({ password: event.target.value, passwordError: "" });
    console.log(`Password:  ${event.target.value}`);
  }

  onClick(event) {
    console.log("clicked");
    const isValid = this.validate();
    console.log(isValid);
    if (isValid) {
      if (
        this.state.validLogin === "true bure" &&
        this.state.validPassowrd === "true bure"
      ) {
        console.log(this.state.login);
        console.log(this.state.password);
        if (this.state.login === this.state.password) {
          axios
            .post(
              "http://localhost:9000/login/basic",
              {},
              {
                auth: {
                  username: "admin",
                  password: "admin"
                }
              }
            )
            .then(function(response) {
              console.log(response.data);
              console.log(response.status);
              console.log(response.data.userId);
              Cookies.set("USER_ID", response.data.userId);
              Cookies.set("BUSINESS", true);
            });
        }
      }
    }
  }

  WriteForm = ({ text, holder, type, w, value, error, fun, blur }) => (
    <Form>
      <div style={{ fontSize: 16 }}>
        <text>{text}</text>
      </div>
      <Input
        placeholder={holder}
        style={{ width: w }}
        onChange={fun}
        type={type}
        value={value}
        onBlur={blur}
      />
      <div style={{ fontSize: 14, color: "red" }}>{error}</div>
    </Form>
  );

  render() {
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <div style={{ fontSize: 20 }}>
            <text>Logowanie Biznesowe</text>
          </div>
        </Row>

        <Row type="flex" justify="space-around" align="middle">
          <this.WriteForm
            text="Login"
            holder="Wpisz login"
            type="text"
            w={500}
            value={this.state.login}
            error={this.state.loginError}
            fun={this.setLogin}
            blur={this.validateLogin}
          />
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <this.WriteForm
            text="Hasło"
            holder="Wpisz haslo"
            type="password"
            w={500}
            value={this.state.password}
            fun={this.setPassword}
            error={this.state.passwordError}
          />
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <br />
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Button onClick={this.onClick} type={"primary"}>
            Zaloguj się
          </Button>
        </Row>
      </div>
    );
  }
}

export default FormLoginBuis;
