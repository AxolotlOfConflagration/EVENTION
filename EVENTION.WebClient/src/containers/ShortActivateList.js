import React from "react";
import axios from "axios";
import ShortActive from "../components/ShortActive";

class ShortActivateList extends React.Component {
  state = {
    ShortActiv: [],
    id: 1,
    loading: true
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/recomendation/".concat(this.state.id))
      .then(res => {
        this.setState({
          ShortActiv: res.data,
          loading: false
        });
        console.log(res.data);
      });
  }

  render() {
    if (this.state.ShortActiv.length <= 0) {
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
    return <ShortActive data={this.state.ShortActiv} />;
  }
}

export default ShortActivateList;
