import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";
import Cookies from "js-cookie";

class ShortEventList extends React.Component {
  state = {
    ShortEvents: [],
    SavedEvents: []
  };

  fetchData = (city, category) => {
    axios
      .post("http://localhost:9000/event", {
        beginning: 0,
        count: 100,
        ordered: "creationDate",
        ascending: false,
        categories: category,
        city: city
      })
      .then(res => {
        this.setState({
          ShortEvents: res.data
        });
      });
    axios
      .get(
        "http://localhost:9000/user/"
          .concat(Cookies.get("USER_ID"))
          .concat("/event")
      )
      .then(res => {
        this.setState({
          SavedEvents: res.data
        });
      });
  };

  contains = id => {
    let flag = false;
    this.state.SavedEvents.forEach(event => {
      if (event.id === id) {
        flag = true;
      }
    });
    return flag;
  };

  componentDidMount() {
    this.fetchData(this.props.city, this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.city !== this.props.city ||
      prevProps.category !== this.props.category
    ) {
      this.fetchData(this.props.city, this.props.category);
    }
  }

  render() {
    if (this.state.ShortEvents.length <= 0) {
      return (
        <div>
          <h2>Brak wydarzeń o wybranej kategorii.</h2>
        </div>
      );
    }
    return (
      <ShortEvent
        data={this.state.ShortEvents}
        setPage={this.props.setPage}
        contains={this.contains}
      />
    );
  }
}

export default ShortEventList;
