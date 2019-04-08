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
        console.log(res.data);
        console.log(this.props.category);
        console.log(this.props.city);
      });
  };

  componentDidMount() {
    this.fetchData();
    console.log("SEL mount");
    console.log(this.props.city);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.fetchData(this.props.city, this.props.category);
      console.log("update sel");
    }
  }

  render() {
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortEventList;
