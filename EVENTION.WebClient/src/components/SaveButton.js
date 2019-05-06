import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "antd";

class SaveButton extends React.Component {
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
    console.log(
      "http://localhost:9000/user/"
        .concat(Cookies.get("USER_ID?userid"))
        .concat("/event/")
        .concat(id)
    );
    if (this.state.text === "Zapisano") {
      axios.delete(
        "http://localhost:9000/user/"
          .concat(Cookies.get("USER_ID?userid"))
          .concat("/event/")
          .concat(id)
      );
    } else {
      axios.put(
        "http://localhost:9000/user/"
          .concat(Cookies.get("USER_ID?userid"))
          .concat("/event/")
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
        type={type}
        icon={icon}
        onClick={() => {
          text === "Zapisz się"
            ? this.changeButton("Zapisano", "check", "primary")
            : this.changeButton("Zapisz się", "plus", "ghost");
          this.eventChangeHandler(id);
        }}
      >
        {text}
      </Button>
    );
  }
}

export default SaveButton;
