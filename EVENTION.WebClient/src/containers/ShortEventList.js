import React from "react";
import ShortEvent from "../components/ShortEvent";
import axios from "axios";

class ShortEventList extends React.Component {
  state = {
    ShortEvents: []
  };

  fetchData =()=> {
    axios.post("http://localhost:9000/event", {
      "beginning": 0,
      "count": 4,
      "ordered": "creationDate",
      "ascending": false,
      "categories": this.props.category, 
      "city": this.props.city, 
    }).then(res => {
      this.setState({
        ShortEvents: res.data
      });
      console.log(res.data);
      console.log(this.props.category);
      console.log(this.props.city);
    });
  };


  // componentDidMount() {
  //   axios.get("http://localhost:9000/event").then(res => {
  //     this.setState({
  //       ShortEvents: res.data
  //     });
  //     console.log(res.data);
  //   });
  // }
  componentDidMount() {
    this.fetchData(this.props.categories, this.props.city)
    console.log("SEL")
    console.log(this.props.city)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.fetchData(this.props.categories, this.props.city);
      console.log('update sel')
    }
  
  }


  render() {
    return <ShortEvent data={this.state.ShortEvents} />;
  }
}

export default ShortEventList;
