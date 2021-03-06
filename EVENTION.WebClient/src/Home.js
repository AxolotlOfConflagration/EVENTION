import React, { Component } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import Sticky from "react-sticky-el";
import MyLayout from "./containers/MyLayout";
import ShortEventList from "./containers/ShortEventList";
import EventFilters from "./containers/EventFilters";
import EventMap from "./components/EventsMap";
import Cookies from "js-cookie";
import Login from "./Login";

class Home extends Component {
  state = {
    categories: null, //wszystkie czyli puste
    city: null, //Wszystkie
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
    if (Cookies.get("USER_ID")) {
      return (
        <div className="Home">
          <MyLayout>
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
          </MyLayout>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default Home;
