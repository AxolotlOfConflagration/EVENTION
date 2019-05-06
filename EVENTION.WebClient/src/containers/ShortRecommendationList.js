import React from "react";
import ShortRecomEvent from "../components/ShortRecomEvent";
import axios from "axios";
import Cookies from "js-cookie";
class ShortRecommendationList extends React.Component {
  state = {
    ShortEvents: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:9000/recomendation/".concat(
          Cookies.get("USER_ID?userid")
        )
      )
      .then(res => {
        this.setState({
          ShortEvents: res.data,
          loading: false
        });
        console.log(res.data);
      });
  }

  render() {
    if (this.state.ShortEvents.length === 0) {
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
    return <ShortRecomEvent data={this.state.ShortEvents} />;
  }
}

export default ShortRecommendationList;
