import React from "react";
import { Row, Col } from "antd";
import CitySelect from "../components/CitySelect";
import DateSelect from "../components/DateSelect";

class EventFilters extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <CitySelect />
          </Col>
          <Col>
            <DateSelect />
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventFilters;
