import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import Sticky from "react-sticky-el";
import TestLayout from "./containers/TestLayout";
import ShortEventList from "./containers/ShortEventList";
import EventFilters from "./containers/EventFilters";
import EventMap from "./components/EventsMap";

class Home extends Component {
  state = {
    categories: null, //wszytskie czyli puste
    //1.Sport, 2.Koncert, 3.Targi, 4.Inne, 5.Hackathon
    city: "Poznan", //Wszystkie
    page: 0
  };

  chooseCategory = category => {
    this.setState({ categories: category });
    console.log(category);
  };

  chooseCity = city => {
    this.setState({ city: city });
    console.log(city);
    console.log(this.state.city);
  };

  setPage = page => {
    this.setState({
      page: page
    });
    console.log("Chosen page " + page);
  };

  render() {
    return (
      <div className="Home">
        <TestLayout>
          <Col span={15}>
            <Row style={{ zIndex: 3 }}>
              <EventFilters
                category={this.state.categories}
                chooseCategory={this.chooseCategory}
                city={this.state.city}
                chooseCity={this.chooseCity}
              />
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <ShortEventList
                category={this.state.categories}
                city={this.state.city}
                setPage={this.setPage}
              />
            </Row>
          </Col>
          <Col span={9}>
            <Sticky>
              <EventMap
                mapPos={this.state.city}
                city={this.state.city}
                categories={this.state.categories}
                page={this.state.page}
              />
            </Sticky>
          </Col>
        </TestLayout>
      </div>
    );
  }
}

export default Home;
