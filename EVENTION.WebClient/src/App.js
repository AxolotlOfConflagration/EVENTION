import React, { Component } from "react";
import "antd/dist/antd.css";
import MyLayout from "./containers/Layout";
import ShortEventList from "./containers/ShortEventList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyLayout>
          <ShortEventList />
        </MyLayout>
      </div>
    );
  }
}

export default App;
