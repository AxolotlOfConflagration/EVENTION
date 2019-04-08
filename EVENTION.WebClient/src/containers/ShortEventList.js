import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortEventList extends React.Component {
  state = {
    ShortEvents: []
  };

  fetchData = (city, category) => {
    axios
      .post("http://localhost:9000/event", {
        beginning: 0,
        count: 4,
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
  };

  componentDidMount() {
    this.fetchData();
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
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortEventList;
