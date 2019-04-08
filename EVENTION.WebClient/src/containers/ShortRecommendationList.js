import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortRecommendationList extends React.Component {
  state = {
    EventId: [],
    ShortEvents: [],
    id: 1
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/recomendation/".concat(this.state.id))
      .then(res => {
        this.setState({
          EventId: res.data
        });
        console.log(res.data);
        console.log(this.state.EventId.recommendation);

        this.state.EventId.recommendation.forEach(rec => {
          axios.get(
            "http://localhost:9000/event".concat(rec).then(result => {
              ShortEvent.push(result);
              console.log(ShortEvent);
            })
          );
        });
      });
    // this.state.EventId.recommendation.forEach(rec => {
    //   console.log(rec);
    // });
  }

  render() {
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortRecommendationList;
