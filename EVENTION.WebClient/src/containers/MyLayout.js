import React from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import axios from "axios";
const { Header, Content } = Layout;

class MyLayout extends React.Component {
  state = {
    nick: ""
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/user/".concat(Cookies.get("USER_ID")))
      .then(res => {
        this.setState({
          nick: res.data.nick
        });
        console.log(res.data);
      });
  }
  onNavigateMyEvents() {
    const history = createBrowserHistory();
    history.push("/MojeWydarzenia");
    window.location.assign("/MojeWydarzenia");
  }

  onNavigateActivate() {
    const history = createBrowserHistory();
    history.push("/OstatniaAktywnosc");
    window.location.assign("/OstatniaAktywnosc");
  }
  onNavigateAddEvent() {
    const history = createBrowserHistory();
    history.push("/DodajWydarzenie");
    window.location.assign("/DodajWydarzenie");
  }
  onNavigateHome() {
    const history = createBrowserHistory();
    history.push("/");
    window.location.assign("/");
  }

  onNavigateRecommendation() {
    const history = createBrowserHistory();
    history.push("/Rekomendacje");
    window.location.assign("/Rekomendacje");
  }

  render() {
    return (
      <Layout>
        <Header style={{ zIndex: 5, width: "100%", position: "fixed" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1" onClick={this.onNavigateHome}>
              <Icon type="home" />
              <span>Strona domowa</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.onNavigateMyEvents}>
              <Icon type="calendar" />
              <span>Moje wydarzenia</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={this.onNavigateActivate}>
              <Icon type="team" />
              <span>Ostatnia aktywność</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.onNavigateRecommendation}>
              <Icon type="compass" />
              <span>Rekomendacje</span>
            </Menu.Item>
            {Cookies.get("Bussines") ? (
              <Menu.Item key="3" onClick={this.onNavigateAddEvent}>
                <Icon type="contacts" />
                <span>Dodaj wydarzenie</span>
              </Menu.Item>
            ) : null}
            {!Cookies.get("USER_ID") ? (
              <Button
                type="default"
                // style={{ zIndex: 10, width: "52%" }}
                size="large"
                href="http://localhost:9000/login"
              >
                {" "}
                Zaloguj się{" "}
              </Button>
            ) : (
              <Menu.Item key="6" style={{ float: "right" }}>
                <Icon type="user" />
                <span>{this.state.nick}</span>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            marginTop: 64,
            padding: 24,
            background: "#fff",
            minHeight: 280
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default MyLayout;
