import React from "react";
import ShortRecomEvent from "../components/ShortRecomEvent";
import axios from "axios";

class ShortRecommendationList extends React.Component {
  state = {
    ShortEvents: [],
    id: 1,
    loading: true
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/recomendation/".concat(this.state.id))
      .then(res => {
        this.setState({
          ShortEvents: res.data,
          loading: false
        });
        console.log(res.data);
      });
  }

  render() {
    if (this.state.ShortEvents.length <= 0) {
      return (
        <div>
          Uczęszczaj na eventy dalej, wkrótce będziemy mogli Ci coś polecić.
        </div>
      );
    } else if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return <ShortRecomEvent data={this.state.ShortEvents} />;
  }
}

export default ShortRecommendationList;
