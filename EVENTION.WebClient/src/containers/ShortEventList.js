import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    saved: true,
    likes: 13,
    title: `Event ${i}`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ipsum ullamcorper, mattis mauris vitae, imperdiet ipsum. Fusce non urna in orci molestie vulputate. Quisque quis tempus sapien. Nulla in."
  });
}

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
