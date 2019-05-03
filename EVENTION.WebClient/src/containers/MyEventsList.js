import React from "react";
import MyEvent from "../components/MyEvent";
import axios from "axios";

class MyEventList extends React.Component {
  state = {
    MyEvents: [],
    id: 1,
    loading: true
  };

  componentDidMount() {
    console.log(
      "http://localhost:9000/user/".concat(this.state.id).concat("/event")
    );
    axios
      .get("http://localhost:9000/user/".concat(this.state.id).concat("/event"))
      .then(res => {
        this.setState({
          MyEvents: res.data,
          loading: false
        });
        console.log(res.data);
      });
  }

  render() {
    if (this.state.MyEvents.length === 0) {
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
    return <MyEvent data={this.state.MyEvents} />;
  }
}

export default MyEventList;
