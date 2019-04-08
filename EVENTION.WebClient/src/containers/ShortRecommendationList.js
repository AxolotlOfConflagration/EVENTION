import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortRecommendationList extends React.Component {
  state = {
    EventId: [],
    ShortEvents: [],
    id: 1,
    loading: true
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/recomendation/".concat(this.state.id))
      .then(res => {
        this.setState({
          EventId: res.data,
          loading: true
        });
      });
    this.state.EventId.recommendation.forEach(rec => {
      axios.get(
        "http://localhost:9000/event".concat(rec).then(result => {
          this.setState({
            ShortEvents: this.state.ShortEvents.push(result),
            loading: false
          });
        })
      );
    });
  }

  render() {
    if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortRecommendationList;
