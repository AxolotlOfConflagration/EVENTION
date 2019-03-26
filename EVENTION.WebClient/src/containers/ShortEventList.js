import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortEventList extends React.Component {
  state = {
    ShortEvents: []
  };

  componentDidMount() {
    axios.get("http://localhost:9000/event").then(res => {
      this.setState({
        ShortEvents: res.data
      });
      console.log(res.data);
    });
  }

  render() {
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortEventList;
