import React from "react";
import { Layout, Menu, Icon } from "antd";
import { createBrowserHistory } from "history"; 
const { Sider, Content } = Layout;

class MyLayout extends React.Component {
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

onNavigateMyEvents(){
    const history = createBrowserHistory();
    history.push("/MojeWydarzenia"); 
    window.location.assign('/MojeWydarzenia'); 
}
onNavigateActivate(){
  const history = createBrowserHistory();
  history.push("/Aktywnosc"); 
  window.location.assign('/Aktywnosc'); 
}
onNavigateHome(){
  const history = createBrowserHistory();
  history.push("/"); 
  window.location.assign('/'); 
}
onNavigateRecommendation(){
  const history = createBrowserHistory();
  history.push("/Rekomendacje"); 
  window.location.assign('/Rekomendacje'); 
}


  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={this.onNavigateHome}>
              <Icon type="home" />
              <span>Strona domowa</span>
            </Menu.Item>
            <Menu.Item key="2" onClick ={this.onNavigateMyEvents}>
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
            <Menu.Item key="0" onClick={this.toggle}>
              <Icon type={this.state.collapsed ? "right" : "left"} />
              <span>{this.state.collapsed ? "Rozwiń" : "Zwiń"}</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
