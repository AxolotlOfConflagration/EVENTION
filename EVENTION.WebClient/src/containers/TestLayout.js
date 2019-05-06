import React from "react";
import { Layout, Menu, Icon } from "antd";
import { createBrowserHistory } from "history";

const { Header, Content } = Layout;

class TestLayout extends React.Component {
  onNavigateMyEvents() {
    const history = createBrowserHistory();
    history.push("/MojeWydarzenia");
    window.location.assign("/MojeWydarzenia");
  }

  onNavigateActivate() {
    const history = createBrowserHistory();
    history.push("/Aktywnosc");
    window.location.assign("/Aktywnosc");
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
            <Menu.Item key="3" onClick={this.onNavigateActivate}>
              <Icon type="contacts" />
              <span>Aktywność</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.onNavigateRecommendation}>
              <Icon type="compass" />
              <span>Rekomendacje</span>
            </Menu.Item>
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

export default TestLayout;
