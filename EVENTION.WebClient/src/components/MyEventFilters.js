import React from "react";
import { Button, Row, Col } from "antd";

class MyEventFilters extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Button
              type={this.props.type === "Wszystkie" ? "primary" : "ghost"}
              size="default"
              shape="round"
              onClick={() => {
                this.props.changeType("Wszystkie");
              }}
            >
              Wszystkie
            </Button>
            <Button
              type={this.props.type === "Zakończone" ? "primary" : "ghost"}
              size="default"
              shape="round"
              onClick={() => {
                this.props.changeType("Zakończone");
              }}
            >
              Zakończone
            </Button>
            <Button
              type={this.props.type === "Dostępne" ? "primary" : "ghost"}
              size="default"
              shape="round"
              onClick={() => {
                this.props.changeType("Dostępne");
              }}
            >
              Dostępne
            </Button>
          </Col>
          <br />
        </Row>
      </div>
    );
  }
}

export default MyEventFilters;
