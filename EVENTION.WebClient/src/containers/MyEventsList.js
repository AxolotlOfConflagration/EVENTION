import React from "react";
import MyEvent from "../components/MyEvent";
import axios from "axios";
import Cookies from "js-cookie";

class MyEventList extends React.Component {
  state = {
    MyEvents: [],
    SavedEvents: [],
    id: 1,
    loading: true
  };

  fetchData = type => {
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
    if (type === "Wszystkie") {
      axios
        .get(
          "http://localhost:9000/user/"
            .concat(Cookies.get("USER_ID"))
            .concat("/event")
        )
        .then(res => {
          this.setState({
            MyEvents: res.data,
            loading: false
          });
        });
    } else if (type === "Zakończone") {
      axios
        .get(
          "http://localhost:9000/user/"
            .concat(Cookies.get("USER_ID"))
            .concat("/event/past")
        )
        .then(res => {
          this.setState({
            MyEvents: res.data,
            loading: false
          });
        });
    } else {
      axios
        .get(
          "http://localhost:9000/user/"
            .concat(Cookies.get("USER_ID"))
            .concat("/event/future")
        )
        .then(res => {
          this.setState({
            MyEvents: res.data,
            loading: false
          });
        });
    }
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
    this.fetchData(this.props.type);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.fetchData(this.props.type);
    }
  }

  render() {
    if (this.state.MyEvents.length === 0) {
      return (
        <div>
          <h2>
            Uczęszczaj na eventy dalej, wkrótce będziemy mogli Ci coś polecić.
          </h2>
        </div>
      );
    } else if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return <MyEvent data={this.state.MyEvents} contains={this.contains} />;
  }
}

export default MyEventList;
