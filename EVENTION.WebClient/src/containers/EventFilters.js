import React from "react";
import { Row, Col } from "antd";
import CityButton from "../components/CityButton";
import CategortButton from "../components/CategoryButton";

class EventFilters extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <CityButton
              currentCity={this.props.city}
              chooseCity={this.props.chooseCity}
            />

            <br />
            <CategortButton
              currentCategory={this.props.category}
              chooseCategory={this.props.chooseCategory}
            />
          </Col>
          <br />
        </Row>
      </div>
    );
  }
}

export default EventFilters;
