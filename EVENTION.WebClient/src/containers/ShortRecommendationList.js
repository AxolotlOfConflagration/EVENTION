import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortRecommendationList extends React.Component {
  state = {
    ShortEvents: [],
    id: 1
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/recomendation/".concat(this.state.id))
      .then(res => {
        this.setState({
          ShortEvent: res.data
        });
      });
  }

  render() {
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortRecommendationList;
