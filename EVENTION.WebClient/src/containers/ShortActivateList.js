import React from "react";
import axios from "axios";
import ShortActive from "../components/ShortActive";

class ShortActivateList extends React.Component {
  state = {
    ShortActiv: [],
    id: 2,
    loading: true
  };

  componentDidMount() {
    axios.get("http://localhost:9000/feed/".concat(this.state.id)).then(res => {
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
