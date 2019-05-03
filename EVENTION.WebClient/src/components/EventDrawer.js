import React from "react";
import { Row, Col, Divider, Icon, Timeline } from "antd";
import axios from "axios";

class EventDrawer extends React.Component {
  state = {
    Event: {},
    loading: true
  };

  fetchData = eventID => {
    let url = "http://localhost:9000/event/".concat(eventID);
    console.log(url);
    this.setState({
      loading: true
    });
    console.log(eventID);
    axios.get(url).then(res => {
      this.setState({
        Event: res.data,
        loading: false
      });
    });
    console.log(typeof this.state.Event);
    console.log(Object.getOwnPropertyNames(this.state.Event));
    console.log(this.state.Event);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.fetchData(this.props.data);
    }
  }

  componentDidMount() {
    this.fetchData(this.props.data);
  }

  prepTime = time => {
    var splited = time.split("T");
    splited[1] = splited[1].slice(0, 5);
    return splited;
  };

  render() {
    if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return (
      <div>
        <Row>
          <Col span={16}>
            <br />
            <Timeline>
              <Timeline.Item
                dot={<Icon type="environment" style={{ fontSize: "16px" }} />}
              >
                {this.state.Event.event.address}
              </Timeline.Item>
              <Timeline.Item
                dot={<Icon type="calendar" style={{ fontSize: "16px" }} />}
              >
                {this.prepTime(this.state.Event.event.eventStart)[0]}
              </Timeline.Item>
              <Timeline.Item
                dot={
                  <Icon type="clock-circle-o" style={{ fontSize: "16px" }} />
                }
              >
                {this.prepTime(this.state.Event.event.eventStart)[1]}
              </Timeline.Item>
            </Timeline>
          </Col>
          <Col span={8}>
            <img
              height={150}
              alt="logo"
              src={this.state.Event.event.imageSource}
            />
          </Col>
        </Row>
        <Divider />
        <Row>{this.state.Event.event.longDescription}</Row>
      </div>
    );
  }
}

export default EventDrawer;
