import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "antd";

class FollowButton extends React.Component {
  state = {
    text: null,
    type: null,
    icon: null
  };

  componentDidMount() {
    this.setState({
      text: this.props.text,
      type: this.props.type,
      icon: this.props.icon
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        text: this.props.text,
        type: this.props.type,
        icon: this.props.icon
      });
    }
  }

  changeButton = (text, icon, type) => {
    this.setState({ text, icon, type });
  };

  eventChangeHandler = id => {
    if (this.state.text === "Dodaj") {
      axios.post(
        "http://localhost:9000/followers/"
          .concat(Cookies.get("USER_ID?userid"))
          .concat("/")
          .concat(id)
      );
    } else {
      axios.delete(
        "http://localhost:9000/followers/"
          .concat(Cookies.get("USER_ID?userid"))
          .concat("/")
          .concat(id)
      );
    }
  };

  render() {
    const { text, type, icon } = this.state;
    const { id } = this.props;
    return (
      <Button
        size="small"
        style={{ float: "right" }}
        type={type}
        icon={icon}
        onClick={() => {
          text === "Dodaj"
            ? this.changeButton("Usuń", "minus", "primary")
            : this.changeButton("Dodaj", "plus", "ghost");
          this.eventChangeHandler(id);
        }}
      >
        {text}
      </Button>
    );
  }
}

export default FollowButton;
