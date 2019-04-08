import React from "react";
import { Row, Col } from "antd";
//import CitySelect from "../components/CitySelect";
import CityButton from "../components/CityButton";
import CategortButton from "../components/CategoryButton";
import DateSelect from "../components/DateSelect";


class EventFilters extends React.Component {

  componentDidMount() {
    console.log("EF")
    console.log(this.props.city)
  }
  componentDidUpdate() {
    console.log("EF Update");
    console.log(this.props.city);
    console.log(this.props.category)
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <CityButton chooseCity={this.props.chooseCity}/>

            <br />
            <CategortButton chooseCategory = {this.props.chooseCategory}/>
          </Col>
          <br />
          <Col>
            <DateSelect />
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventFilters;
