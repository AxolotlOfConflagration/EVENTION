import React from "react";
import axios from "axios";
import ShortActive from "../components/ShortActive";
import Cookies from "js-cookie";
class ShortActivateList extends React.Component {
  state = {
    ShortActiv: [],

    loading: true
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/feed/".concat(Cookies.get("USER_ID")))
      .then(res => {
        this.setState({
          ShortActiv: res.data,
          loading: false
        });
      });
  }

  render() {
    if (this.state.ShortActiv.length <= 0) {
      return (
        <div>
          <h2>Jeszcze nie obserwujesz nikogo.</h2>
        </div>
      );
    } else if (this.state.loading) {
      return <div>LOADING</div>;
    }
    return <ShortActive data={this.state.ShortActiv} />;
  }
}

export default ShortActivateList;
