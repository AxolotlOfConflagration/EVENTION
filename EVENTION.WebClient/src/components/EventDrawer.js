import React from "react";
import { Row, Col } from "antd";
import axios from "axios";

class EventDrawer extends React.Component {
  state = {
    Event: {},
    loading: false
  };

  componentWillMount() {
    let url = "http://localhost:9000/event/".concat(this.props.data);
    console.log(url);
    this.setState({
      loading: true
    });
    console.log(this.props.data);
    axios.get(url).then(res => {
      this.setState({
        Event: res.data,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return <div>{this.state.Event.event.longDescription}</div>;
  }
}

export default EventDrawer;
